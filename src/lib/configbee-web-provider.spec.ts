import { ConfigbeeWebProvider } from './configbee-web-provider';

describe('ConfigbeeWebProvider', () => {
  it('should be and instance of ConfigbeeWebProvider', () => {
    expect(new ConfigbeeWebProvider()).toBeInstanceOf(ConfigbeeWebProvider);
  });
});
