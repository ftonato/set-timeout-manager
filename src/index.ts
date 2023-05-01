import { TimeoutFn, TimeoutIds } from './types';

/**
 * A utility class for managing timeouts created by `setTimeout`.
 */
class SetTimeout {
  /** An object to store timeout IDs keyed by string identifiers. */
  private timeoutIds: TimeoutIds = {};

  /**
   * Starts a new timeout that calls the specified function after the specified delay.
   * @param fn The function to call.
   * @param delay The delay (in milliseconds) after which to call the function.
   * @param key A unique string identifier for the timeout.
   */
  public start(fn: TimeoutFn, delay: number, key: string): void {
    if (!this.timeoutIds[key]) {
      this.timeoutIds[key] = setTimeout(fn, delay);
    }
  }

  /**
   * Stops the timeout with the specified key.
   * @param key The string identifier for the timeout to stop.
   */
  public clear(key: string): void {
    const timeoutId = this.timeoutIds[key];
    if (timeoutId) {
      clearTimeout(timeoutId);
      delete this.timeoutIds[key];
    }
  }

  /**
   * Stops all timeouts managed by this utility.
   */
  public clearAll(): void {
    this.listAll().forEach(timeoutId => {
      this.clear(timeoutId);
    });
  }

  /**
   * Gets an array of all keys currently being used to manage timeouts.
   * @returns An array of string keys.
   */
  public listAll(): string[] {
    return Object.keys(this.timeoutIds);
  }
}

export default new SetTimeout();
