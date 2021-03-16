import { useEffect, useState } from 'react';
import { bundleEsbuild } from '../bundler';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';

const CODE_ENTRY_WAITING_PERIOD = 750;

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleEsbuild(cell.content);

      setCode(output.code);
      setError(output.error);
    }, CODE_ENTRY_WAITING_PERIOD);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};
