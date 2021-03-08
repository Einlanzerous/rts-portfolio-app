import { useState } from 'react';
import { bundleEsbuild } from '../bundler';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';

export const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundleEsbuild(input);

    setCode(output);
  };

  return (
    <div className='editor-wrapper'>
      <CodeEditor
        initialValue='const canWriteCodeHere = true;'
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
