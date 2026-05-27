import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            "/api": {
                target: "http://localhost:8081",
                changeOrigin: true,
            },
            "^/[A-Za-z0-9_-]+$": {
                target: "http://localhost:8081",
                changeOrigin: true,

                rewrite: (path) => {
                    console.log(path, "<<<");
                    return `/api/v1/link${path}`;
                },
            },
        },
    },
});
