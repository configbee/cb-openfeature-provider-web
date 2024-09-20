import { EvaluationContext, Provider, JsonValue, ResolutionDetails } from '@openfeature/web-sdk';

export class ConfigbeeWebProvider implements Provider {
  metadata = {
    name: ConfigbeeWebProvider.name,
  };

  readonly runsOn = 'client';

  hooks = [];

  resolveBooleanEvaluation(flagKey: string, defaultValue: boolean): ResolutionDetails<boolean> {
    throw new Error('Method not implemented.');
  }

  resolveStringEvaluation(flagKey: string, defaultValue: string): ResolutionDetails<string> {
    throw new Error('Method not implemented.');
  }

  resolveNumberEvaluation(flagKey: string, defaultValue: number): ResolutionDetails<number> {
    throw new Error('Method not implemented.');
  }

  resolveObjectEvaluation<U extends JsonValue>(flagKey: string, defaultValue: U): ResolutionDetails<U> {
    throw new Error('Method not implemented.');
  }
}
