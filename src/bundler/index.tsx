import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const ESBUILD_WASM_VER = 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm';

let service: esbuild.Service;

export const bundleEsbuild = async (rawCode: string): Promise<string> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: ESBUILD_WASM_VER
    });
  }

  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  });

  return result.outputFiles[0].text;
};
