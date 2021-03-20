import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const ESBUILD_WASM_VER = 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm';

interface BuildCodeOrError {
  code: string;
  error: string;
}

let service: esbuild.Service;

export const bundleEsbuild = async (
  rawCode: string
): Promise<BuildCodeOrError> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: ESBUILD_WASM_VER
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });
    return {
      code: result.outputFiles[0].text,
      error: ''
    };
  } catch (error) {
    return {
      code: '',
      error: error.message
    };
  }
};
