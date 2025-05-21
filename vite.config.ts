import { defineConfig } from 'vite';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: path.resolve(__dirname, 'src/index.ts'),
        frame: path.resolve(__dirname, 'src/frame.ts'),
      },
      name: 'H5PStandalone', // UMD build name
      fileName: (format, entryName) => {
        if (format === 'umd') {
          return `${entryName}.umd.js`;
        }
        return `${entryName}.es.js`;
      },
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      // into your library
      external: [], // Add external dependencies here if any
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {}, // Add globals here if any
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    cssInjectedByJs(), // CSS will be injected by JS
    viteStaticCopy({
      targets: [
        {
          src: 'vendor/h5p/styles/font-open-sans.css',
          dest: 'styles',
        },
        {
          src: 'vendor/h5p/fonts',
          dest: 'fonts',
        },
        {
          src: 'vendor/h5p/images',
          dest: 'images',
        },
        {
          src: 'src/**/*.d.ts',
          dest: '.', // Copy .d.ts files to the root of dist
          // Vite typically handles .d.ts generation if using tsc for build,
          // but this ensures any manually created .d.ts files are copied.
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // If you have path aliases in tsconfig.json, replicate them here
      // Example: '@': path.resolve(__dirname, 'src'),
    },
  },
});
