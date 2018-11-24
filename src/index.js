import React, { useState } from 'react';
import { render } from 'react-dom';
import Dixie from "dexie";
import Player from './core';

import StartGameStep from './components/StartGameStep';
import GameScreen from './components/GameScreen';
import NewTaskForm from './components/NewTaskForm';

import style from './style.styl';

const db = new Dixie("tasks_db");
db.version(1).stores({
  tasks: 'content,type'
});

function App() {
  const [ players, addPlayer ] = useState([]);
  const [ moveCount, changeMoveCount ] = useState(0);
  const [ currentPlayer, changeCurrentPlayer ] = useState({})

  const createPlayer = name => addPlayer(
    [
      ...players,
      new Player({ name })
    ]);

  const move = currentState => {
    changeMoveCount(moveCount + 1);
    changeCurrentPlayer(currentState.name);
  }

  const ScoreTableFragment = ({ name }) => (
    <div className={style.score}>
    { players.map(pl => (
      <div key={pl.name} className={[style.row, pl.name === name ? style.active : ''].join(' ')}>
        <div className={[style.col, style.firstcol].join(' ')}>
          {pl.name}:
        </div>
        <div className={style.col}>
          bank: {pl.bank}
        </div>
        <div className={style.col}>
          factor: {pl.factor}
        </div>
      </div>
    ))}
  </div>
  )

  return (
    <div className="game-screen view">
      <GameScreen players={players} update={move} db={db}/>
      <h2>Текущий счет: </h2>
      <ScoreTableFragment name={currentPlayer}/>
      <StartGameStep create={createPlayer} />
      {/* <NewTaskForm db={db} /> */}
    </div>
  )
}

render(<App />, document.getElementById('app'));
