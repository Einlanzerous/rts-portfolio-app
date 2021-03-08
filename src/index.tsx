import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { CodeEditor } from './components/code-editor';

const ESBUILD_WASM_VER = 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm';

const App = () => {
  const ref = useRef<esbuild.Service>();
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: ESBUILD_WASM_VER
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    if (iframe !== null && iframe.current !== null) {
      iframe.current.srcdoc = html;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    iframe?.current?.contentWindow?.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div className='editor-wrapper'>
      <CodeEditor
        initialValue='const canWriteCodeHere = true;'
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        title="Code iFrame Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
