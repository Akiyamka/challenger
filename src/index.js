import React, { useState } from 'react';
import { render } from 'react-dom';
import Player from './core';
import TasksDB from './db';
import StartGameStep from './components/StartGameStep';
import GameScreen from './components/GameScreen';
import NewTaskForm from './components/NewTaskForm';
import routes from './routes';

import style from './style.styl';

const db = new TasksDB('content,type');

function App() {
  const [ route, setRoute ] = useState('start');
  const [ tasks, setTasks ] = useState([]);
  const [ currentTask, setCurrentTask] = useState(null);
  const [ players, addPlayer ] = useState([]);
  const [ currentPlayer, setCurrentPlayer ] = useState(null);

  const createPlayer = name => {
    if (players.map(p => p.name).includes(name)) return;
    addPlayer([ ...players, new Player({ name })]);
  }

  const checkWin = () => {
    return false;
  }

  const stopGame = reason => {
    // TODO
  };

  const nextPlayer = () => {
    const nextIndex = players.indexOf(currentPlayer) + 1;
    const player = nextIndex > players.length - 1 ? players[0] : players[nextIndex];
    setCurrentPlayer(player);
  }

  const nextTask = () => {
    db.next().then(task => setCurrentTask(task));
  }

  const nextMove = () => {
    checkWin()
    ? stopGame({reason: 'maxPoints'})
    : ( nextPlayer() || nextTask() ) || stopGame({reason: 'tasksEnded'})
  }

  if (currentTask === null) {
    nextTask();
  }

  return (
    <div className="game-screen view">
      { route === routes.start && <StartGameStep create={createPlayer} setRoute={setRoute} players={players} /> }
      { route === routes.tasks && <NewTaskForm tasks={tasks} setTasks={setTasks} setRoute={setRoute} /> }
      { route === routes.game  && <GameScreen
                                players={players}
                                setRoute={setRoute}
                                currentPlayer={currentPlayer}
                                setCurrentPlayer={setCurrentPlayer}
                                currentTask={currentTask}
                                nextMove={nextMove}
      /> }
    </div>
  )
}

render(<App />, document.getElementById('app'));
