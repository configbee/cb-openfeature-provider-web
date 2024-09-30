# ConfigBee OpenFeature Provider (Web)

The **ConfigBee OpenFeature Provider (Web)** enables you to use [ConfigBee](https://configbee.com/) as the backend for managing feature flags in a web environment, utilizing the [OpenFeature](https://openfeature.dev/) specification. This provider integrates seamlessly with your application, offering dynamic configuration and feature flagging capabilities with the flexibility of ConfigBee.

## Features
- **Real-time feature flagging** using ConfigBee's backend.
- **Dynamic configuration** capabilities for contextual and targeted feature delivery.
- **Contextual targeting** support using OpenFeature’s context API.
- **Seamless integration** with OpenFeature-compliant systems.
- **Supports web applications** built with JavaScript/TypeScript.

## Installation
You can install the configbee-openfeature-provider-web via npm or yarn:

### Using npm:
```bash
npm install configbee-openfeature-provider-web
```
### Using yarn:
```bash
yarn add configbee-openfeature-provider-web
```

## Getting Started
### Prerequisites
- You need a ConfigBee account. [Sign up here](https://platform.configbee.com/).
- You need **OpenFeature Web SDK** installed in your project. If you haven't already set it up, follow the [offical documention here](https://openfeature.dev/docs/reference/technologies/client/web)

### Usage
Here’s a simple example of how to use the ConfigBee provider with OpenFeature in a web application:
```typescript
import { OpenFeature } from '@openfeature/js-sdk';
import { ConfigbeeWebProvider } from 'configbee-openfeature-provider-web';

// Initialize the provider with your ConfigBee account, project, and environment information
const configBeeProvider = new ConfigbeeWebProvider({
  accountId: 'your-account-id',
  projectId: 'your-project-id',
  environmentId: 'your-environment-id',
});

// Set the ConfigBee provider for OpenFeature
OpenFeature.setProvider(configBeeProvider);

// Set context for contextual targeting
await OpenFeature.setContext({ key: 'my-key' });

// Example: Fetching a feature flag based on the context
(async () => {
  const flagValue = await OpenFeature.getClient().getBooleanValue('new_feature', false);
  console.log(`New Feature Flag: ${flagValue}`);
})();
```

### Contextual Targeting
ConfigBee supports contextual targeting, which allows you to deliver personalized feature configurations based on custom context data. You can use OpenFeature's context API to provide this data:
```typescript
await OpenFeature.setContext({ userId: 'your-user-id' });
```
The context can include various properties (e.g., user identifiers) to ensure targeted delivery of features and configurations based on the current application state.


## Building

Run `nx package` to build the library.

## Running unit tests

Run `nx test` to execute the unit tests via [Jest](https://jestjs.io).

## Resources
- [NOTICE](https://github.com/configbee/cb-openfeature-provider-web/blob/main/NOTICE)
- [LICENSE](https://github.com/configbee/cb-openfeature-provider-web/blob/main/LICENSE)
