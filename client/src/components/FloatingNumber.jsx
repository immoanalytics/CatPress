import { memo } from 'react';
import './FloatingNumber.css';

function FloatingNumber({ value, x, y, isLucky, id }) {
  return (
    <div
      className={`floating-number ${isLucky ? 'lucky' : ''}`}
      style={{ left: x, top: y }}
      key={id}
    >
      +{value}{isLucky ? '!' : ''}
    </div>
  );
}

export default memo(FloatingNumber);
