import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({ forceVisible, prevCellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-primary is-small'
          onClick={() => insertCellAfter(prevCellId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-primary is-small'
          onClick={() => insertCellAfter(prevCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};
