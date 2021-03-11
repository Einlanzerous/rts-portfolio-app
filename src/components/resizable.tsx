import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // debounce some of the resize events
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.8 < width) {
          setWidth(window.innerWidth * 0.8);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.8, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, innerHeight * 0.1],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
