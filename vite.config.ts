import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        storeHome: resolve(__dirname, "src/pages/store/home/home.html"),
        storeCart: resolve(__dirname, "src/pages/store/cart/cart.html"),
      },
    },
  },
  base: "./",
});
