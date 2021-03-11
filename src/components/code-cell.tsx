import { useEffect, useState } from 'react';
import { bundleEsbuild } from '../bundler';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';

const CODE_ENTRY_WAITING_PERIOD = 750;
const EXAMPLE_CODE = `const canWriteCodeHere = true;\nconst root = document.querySelector('#root');\nroot.innerHTML = 'Welcome, write some code.';`;

export const CodeCell = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleEsbuild(input);

      setCode(output.code);
      setError(output.error);
    }, CODE_ENTRY_WAITING_PERIOD);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={EXAMPLE_CODE}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};
