import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react(), svgr()],
    server: {
      port: parseInt(process.env.VITE_PORT),
      open: true
    }
  });
}
