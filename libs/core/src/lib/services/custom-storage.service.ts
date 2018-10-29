import { StorageEngine } from '@ngxs/storage-plugin';

export class CustomStorage implements StorageEngine {
  static Storage: any = {};

  get length() {
    return Object.keys(CustomStorage.Storage).length;
  }

  getItem(key: string) {
    return CustomStorage.Storage[key];
  }

  setItem(key: string, val: any) {
    CustomStorage.Storage[key] = val;
  }

  removeItem(key: string) {
    delete CustomStorage.Storage[key];
  }

  clear() {
    CustomStorage.Storage = {};
  }

  key(index: number) {
    return Object.keys(CustomStorage.Storage)[index];
  }
}
