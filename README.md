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

// Optionally set context for contextual targeting
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

## Framework Support
The **ConfigBee OpenFeature Provider (Web)** is compatible with any framework based on the **OpenFeature Web SDK**, including 
**React** and **Angular**. As OpenFeature continues to expand, additional frameworks will be supported in the future.

For more information:
- React SDK: [OpenFeature React SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/react)
- Angular SDK: [OpenFeature Angular SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/angular)
- All Available SDKs in Ecosystem: [OpenFeature Ecosystem - JS Client SDKs](https://openfeature.dev/ecosystem?instant_search%5BrefinementList%5D%5Btype%5D%5B0%5D=SDK&instant_search%5BrefinementList%5D%5Bcategory%5D%5B0%5D=Client&instant_search%5BrefinementList%5D%5Btechnology%5D%5B0%5D=JavaScript)

## Contributing
We welcome contributions to the **ConfigBee OpenFeature Provider (Web)!** Whether you're fixing bugs, adding new features, improving documentation, or enhancing test coverage, your input is valuable.

### How to Contribute
1. **Fork the repository:** Start by forking the ConfigBee OpenFeature Provider (Web) repository to your GitHub account.
2. **(Optional) Create a branch:** You can create a new branch for your feature or bug fix, though it's not mandatory.
3. **Make your changes:** Develop and test your changes locally.
4. **Run tests:** Ensure that all existing and new tests pass before submitting.
5. **Submit a pull request:** Once your changes are ready and tested, submit a pull request to the main repository.

### Building
To build the project locally, run:
```bash
nx package
```
This will generate the distributable package for the library.

### Running unit tests
Unit tests ensure that your changes don't break existing functionality. To execute the tests, run:
```bash
nx test
```
We use [Jest](https://jestjs.io) for testing. Make sure your new code is covered by unit tests and that all tests pass before submitting your pull request.

### Guidelines
- Ensure that your code adheres to the repository's coding style and guidelines.
- Write clear and concise commit messages.
- Provide detailed information in your pull request description, including what changes were made and why.

## Resources
- [NOTICE](https://github.com/configbee/cb-openfeature-provider-web/blob/main/NOTICE)
- [LICENSE](https://github.com/configbee/cb-openfeature-provider-web/blob/main/LICENSE)
