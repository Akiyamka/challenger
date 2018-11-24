import React, { useState } from 'react';
import { render } from 'react-dom';
import Dixie from "dexie";
import Player from './core';

import StartGameStep from './components/StartGameStep';
import GameScreen from './components/GameScreen';
import NewTaskForm from './components/NewTaskForm';

import style from './style.css';

const db = new Dixie("tasks_db");
db.version(1).stores({
  tasks: 'content,type'
});

function App() {
  const [ players, addPlayer ] = useState([]);
  const [ moveCount, changeMoveCount ] = useState(0);

  const createPlayer = name => addPlayer(
    [
      ...players,
      new Player({ name })
    ]);

  const move = () => changeMoveCount(moveCount + 1)

  return (
    <div>
      <StartGameStep create={createPlayer} />
      { players.map(pl => (
        <div key={pl.name}>
          {pl.name}: [bank: {pl.bank} factor: {pl.factor}]
        </div>
      ))}
      <hr/>
      <GameScreen players={players} update={move} db={db}/>
      <NewTaskForm db={db} />
    </div>
  )
}

render(<App />, document.getElementById('app'));
