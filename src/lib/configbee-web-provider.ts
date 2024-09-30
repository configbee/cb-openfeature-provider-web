import { EvaluationContext, Provider, JsonValue, ResolutionDetails, ProviderStatus, OpenFeatureEventEmitter, ProviderEvents, GeneralError, InvalidContextError, ResolutionReason } from '@openfeature/web-sdk';

import Configbee from "configbee-client-core"

export class ConfigbeeWebProvider implements Provider {
  metadata = {
    name: ConfigbeeWebProvider.name,
  };

  private _client: Configbee.Client;

  private _status: ProviderStatus = ProviderStatus.NOT_READY;

  set status(status: ProviderStatus) {
    this._status = status;
  }

  get status() {
    return this._status;
  }

  readonly runsOn = 'client';

  public events = new OpenFeatureEventEmitter();

  hooks = [];

  constructor(
    private readonly params: Configbee.ClientParams,
  ) {
    this.status = ProviderStatus.NOT_READY;
    const clientParams:Configbee.ClientParams = {...this.params,
      onReady: ()=>{this.handleUpdatesFromCb()},
      onUpdate: ()=>{this.handleUpdatesFromCb()}
    }
    this._client = new Configbee.Client(clientParams)
  }

  private static getCbContext(context:EvaluationContext|undefined){
    if(!context || Object.keys(context).length === 0){
      return null
    }
    const cbContext:{[key: string]:string} = {}
    for(let k in context){
      let v = context[k]
      if(typeof k !== "string"){
        throw new InvalidContextError("unsupport type of context key: "+k)
      }
      if(typeof v !== "string"){
        throw new InvalidContextError("unsupport type of context key: "+v)
      }
      cbContext[k] = v || ""
    }
    return cbContext
  }

  private handleUpdatesFromCb(){
    switch(this._client!.status){
      case 'INITIALIZING':
        this.status = ProviderStatus.NOT_READY;
        break
      case 'ACTIVE':
        this.status = ProviderStatus.READY;
        break
      case 'DEACTIVE':
        this.status = ProviderStatus.STALE;
        break
      case 'ERROR':
        this.status = ProviderStatus.ERROR;
        break
      default:
        this.status = ProviderStatus.ERROR;
        break
    }
    
    this.events.emit(ProviderEvents.ConfigurationChanged,
      {
      }
    )
  }

  async initialize(context?: EvaluationContext): Promise<void> {
    this._client.setTargetProperties(
      ConfigbeeWebProvider.getCbContext(context)
    )
    this._client.init()
    try {
      await this._client.waitToLoad()
      await this._client.waitToLoadTargeting()
    } catch {

    }
  }
  /*
  onClose(): Promise<void> {
    return this.client.close();
  }
  */

  async onContextChange(oldContext: EvaluationContext, newContext: EvaluationContext): Promise<void> {
    const cbContext = ConfigbeeWebProvider.getCbContext(newContext)
    this._client.setTargetProperties(
      cbContext
    )
    await this._client.waitToLoad()
    await this._client.waitToLoadTargeting()
  }

  private getResolutionDetailsFromCbValue<T>(v:T|null|undefined,defaultValue:T):ResolutionDetails<T>{
    let resolutionValue:T
    let reason: ResolutionReason
    if(v === undefined || v === null){
      resolutionValue = defaultValue
      reason = "DEFAULT"
    }
    else{
      resolutionValue = v
      if(this._client.targetingStatus == "ACTIVE"){
        reason = "TARGETING_MATCH"
      }
      else{
        reason = "STATIC"
      }
    }
    return {value:resolutionValue, reason: reason}
  }


  resolveBooleanEvaluation(flagKey: string, defaultValue: boolean): ResolutionDetails<boolean> {
    const value = this._client.getFlag(flagKey)
    return this.getResolutionDetailsFromCbValue<boolean>(value, defaultValue)
  }

  resolveStringEvaluation(flagKey: string, defaultValue: string): ResolutionDetails<string> {
    const value = this._client.getText(flagKey)
    return this.getResolutionDetailsFromCbValue<string>(value, defaultValue)
  }

  resolveNumberEvaluation(flagKey: string, defaultValue: number): ResolutionDetails<number> {
    const value = this._client.getNumber(flagKey)
    return this.getResolutionDetailsFromCbValue<number>(value, defaultValue)
  }

  resolveObjectEvaluation<U extends JsonValue>(flagKey: string, defaultValue: U): ResolutionDetails<U> {
    const value = this._client.getJson(flagKey) as U
    return this.getResolutionDetailsFromCbValue<U>(value, defaultValue)
  }
}
