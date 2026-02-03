import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

class YamlConfigParser {
  private cache = new Map<string, Record<string, unknown>>();

  private load(filePath: string): Record<string, unknown> {
    if (!this.cache.has(filePath)) {
      const absolutePath = resolve(filePath);
      const fileContent = readFileSync(absolutePath, 'utf-8');
      const parsed = yaml.load(fileContent) as Record<string, unknown>;

      this.cache.set(filePath, parsed);
    }

    return this.cache.get(filePath)!;
  }

  public getValue<T = unknown>(filePath: string, context: string): NonNullable<T> {
    const config = this.load(filePath);
    const keys = context.split('.');
    let value: unknown = config;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        throw new Error(`сonfig line "${context}" not found`);
      }
    }

    if (value === null || value === undefined) {
      throw new Error(`сonfig value in line "${context}" is nil`);
    }

    return value as NonNullable<T>;
  }
}

export const configParser = new YamlConfigParser();
