import { AsyncLocalStorage } from "node:async_hooks";


export class ContextProvider<T> {
  private static instance: ContextProvider<unknown>;
  private readonly storage = new AsyncLocalStorage<T>();

  static getInstance<T>(): ContextProvider<T> {
    if (!ContextProvider.instance) {
      ContextProvider.instance = new ContextProvider<T>();
    }

    return ContextProvider.instance as ContextProvider<T>;
  }

  enterWith(context: T): void {
    this.storage.enterWith(context);
  }

  get(): T {
    return this.storage.getStore() as T;
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    const store = this.get();
    store[key] = value;
  }

  delete<K extends keyof T>(key: K): void {
    const store = this.get();
    delete store[key];
  }
}
