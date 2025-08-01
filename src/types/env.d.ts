declare namespace NodeJS {
  interface ProcessEnv {
    WEATHER_API_KEY: string;
  }
}

// Ensure fetch is available globally
declare global {
  var fetch: typeof globalThis.fetch;
}
