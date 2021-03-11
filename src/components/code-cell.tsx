import { useEffect, useState } from 'react';
import { bundleEsbuild } from '../bundler';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';

const CODE_ENTRY_WAITING_PERIOD = 750;

export const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleEsbuild(input);

      setCode(output);
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
            initialValue="const canWriteCodeHere = true;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
