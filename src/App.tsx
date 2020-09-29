import React, { useState } from 'react';
import { range, sampleSize } from 'lodash';
import './App.css';

const L = 8;

type Status = 'unknown' | 'flagged' | 'revealed';

const Hexagon = (props: {
  width: number;
  i: number;
  status: Status;
  mines: number[];
}) => {
  const { i } = props;
  const a = Math.floor(props.i / L);
  const b = props.i % L;
  const topVw = 50 + (b - a) * 0.5 * props.width;
  const leftVw = (a + b) * 0.866 * props.width;
  let fill = 'gray';
  if (props.status === 'flagged') {
    fill = 'blue';
  }
  let num = 0;
  if (props.status === 'revealed') {
    if (props.mines.includes(props.i)) {
      fill = 'red';
      alert('GAME OVER!');
    } else {
      const neighbors = [
        i + L,
        i % L === 0 ? -1 : i + L - 1,
        i % L === (L - 1) ? -1 : i + 1,
        i % L === 0 ? -1 : i - 1,
        i - L,
        i % L === (L - 1) ? -1 : i - L + 1,
      ];
      num = neighbors.filter(nei => props.mines.includes(nei)).length;
      fill = 'white';
    }
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
        {num >= 1 &&
          <text x="50" y="50" fontSize="32">{num}</text>
        }
      </svg>
    </div>
  );
};

const Hexa = (props: {
  i: number;
  mines: number[];
}) => {
  const [status, setStatus] = useState<Status>('unknown');
  const reveal = (e: any) => {
    e.preventDefault();
    setStatus('revealed');
  };
  const setFlag = (e: any) => {
    e.preventDefault();
    if (status === 'flagged') {
      setStatus('unknown');
    } else {
      setStatus('flagged');
    }
  };
  return (
    <div onClick={reveal} onContextMenu={setFlag}>
      <Hexagon
        width={10}
        i={props.i}
        status={status}
        mines={props.mines}
      />
    </div>
  );
};

function App() {
  const mines = sampleSize(range(L ** 2), L);
  console.log(mines);
  const masu = range(L ** 2).map(i =>
    <Hexa i={i} mines={mines} />
  );
  return (
    <>
      <h1>HexaMineSweeper</h1>
      {masu}
    </>
  );
}

export default App;
