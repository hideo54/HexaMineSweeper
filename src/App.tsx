import React from 'react';
import { range } from 'lodash';
import './App.css';

type Status = 'unknown' | 'flagged' | 'revealed';

const Hexagon = (props: {
  width: number;
  position: [number, number];
  status: Status;
}) => {
  const a = props.position[0];
  const b = props.position[1];
  const topVw = 50 + (b - a) * 0.5 * props.width;
  const leftVw = (a + b) * 0.866 * props.width;
  let fill = 'gray';
  if (props.status === 'flagged') {
    fill = 'blue';
  }
  return (
    <div style={{
      width: `${props.width}vw`,
      position: 'absolute',
      top: `${topVw}vw`,
      left: `${leftVw}vw`,
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6">
        <polygon points="25.29 86.1 0.58 43.3 25.29 0.5 74.71 0.5 99.42 43.3 74.71 86.1 25.29 86.1" fill={fill} />
      </svg>
    </div>
  );
};

function App() {
  const L = 8;
  const masu = range(L ** 2).map(i =>
    <Hexagon
      width={10}
      position={[
        Math.floor(i/L),
        i % L,
      ]}
      status='unknown'
    />
  );
  return (
    <>
      <h1>HexaMineSweeper</h1>
      {masu}
    </>
  );
}

export default App;
