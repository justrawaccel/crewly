import { configParser } from './instant';

const config = {
  features<T = unknown>(context: string): NonNullable<T> {
    return configParser.getValue<T>('config/features.yml', context);
  },

  channels<T = unknown>(context: string): NonNullable<T> {
    return configParser.getValue<T>('config/channels.yml', context);
  },

  roles<T = unknown>(context: string): NonNullable<T> {
    return configParser.getValue<T>('config/roles.yml', context);
  }
};

export { config };
