// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface Platform {
      env: {
        CLASH_SUBS: KVNamespace;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      },
      caches: CacheStorage & { default: Cache }
    }
  }
}

export { };
