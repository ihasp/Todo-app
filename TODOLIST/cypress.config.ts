import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("after:run", (results) => {
        console.log(`Wynik testu: ${results}`);
      });

      return config;
    },
  },
});
