import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCellList = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root');

        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;

    const showFuncNoop = 'var show = () => {}';

    const cumulativeCode = [];
    for (let cellItem of orderedCellList) {
      if (cellItem.type === 'code') {
        if (cellItem.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(cellItem.content);
      }
      if (cellItem.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  }).join('\n');
};