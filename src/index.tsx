import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const ref = useRef<esbuild.Service>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2017'
    });

    setCode(result.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
