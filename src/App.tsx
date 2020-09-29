import React, { useState } from 'react';
import { range, sampleSize } from 'lodash';
import './App.css';

const L = 10;

type Status = 'unknown' | 'flagged' | 'revealed';

const Hexagon = (props: {
  width: number;
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
  const { width, i, mines } = props;
  const a = Math.floor(i / L);
  const b = i % L;
  const topVw = (L * 0.5 * width) + (b - a) * 0.5 * width;
  const leftVw = (a + b) * 0.866 * width;
  let fill = 'gray';
  if (status === 'flagged') fill = 'blue';
  let num = 0;
  if (status === 'revealed') {
    if (mines.includes(props.i)) {
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
    }} onClick={reveal} onContextMenu={setFlag}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6">
        <polygon
          points='25.29 86.1 0.58 43.3 25.29 0.5 74.71 0.5 99.42 43.3 74.71 86.1 25.29 86.1'
          fill={fill}
          stroke='gray'
        />
        {num >= 1 &&
          <text x="50" y="50" fontSize="32">{num}</text>
        }
      </svg>
    </div>
  );
};

const App = () => {
  const [mines, setMines] = useState<number[]>(sampleSize(range(L ** 2), L * 3));
  const masu = range(L ** 2).map(i =>
    <Hexagon key={i} width={5} i={i} mines={mines} />
  );
  return (
    <>
      <h1>HexaMineSweeper</h1>
      <p>マスが六角形になったマインスイーパです。</p>
      <ul>
        <li>クリックでそのマスをめくります。 (運が悪いといきなりゲームオーバーになります。未改善。)</li>
        <li>右クリックでフラグを立てます (青色になります)。</li>
        <li>地雷 (赤色) をめくってしまったらゲームオーバーです。</li>
        <li>ゲームクリアしても特に何も出ません。ごめんね。未改善。</li>
        <li>このゲームは
          <a href='https://www.youtube.com/watch?v=TkzetQiRsts' target='_blank' rel='noopener'>
            TSG LIVE! 5 企画「ライブゲームプログラミング Day 2」
          </a>
          にて作成されました。
        </li>
      </ul>
      <div style={{ position: 'relative' }}>{masu}</div>
    </>
  );
};

export default App;
