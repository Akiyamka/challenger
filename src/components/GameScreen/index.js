import React, { Component, useState } from 'react';
import style from './style.styl';

export default function({ players = [], update, db }) {
  const [ activePlayer, switchActivePlayer ] = useState(null);
  const [ currentTask, switchCurrentTask ] = useState(null);

  const start = players => switchActivePlayer(players[0]);

  const getNextPlayer = () => {
    const nextIndex = players.indexOf(activePlayer) + 1;
    return nextIndex > players.length - 1 ? players[0] : players[nextIndex]
  };

  const updateAndNext = newState => update(newState)
    || switchActivePlayer(getNextPlayer())
    || switchCurrentTask(null) ;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getTask = () => {
    db.tasks.toCollection().toArray()
      .then(all => switchCurrentTask(
        all[getRandomInt(0, all.length)]
      )).catch(e => console.error(e))
  }

  const SaveChoiseFragment = () => (
    <div className={style.buttonDock}>
      <p>Сохраним накопленное или выполним задание?</p>
      <button onClick={() => updateAndNext(activePlayer.savePoints())}>Сохранится</button>
      <button onClick={getTask}>Выполнить задание</button>
    </div>
  );

  const TaskFragment = ({ task }) => (
    <div className={style.buttonDock}>
      <h4>Название задания</h4>
      <p>{task.content}</p>
      <button onClick={() => updateAndNext(activePlayer.taskComplete()) }>Осилил</button>
      <button onClick={() => updateAndNext(activePlayer.taskIncomplete()) }>Не осилил</button>
    </div>
  );

  const StartFragment = ({ players }) => (
    <div style={{'text-align': 'center'}}>
      { players.length > 1
        ? <button onClick={() => start(players)}> Начать игру </button>
        : <span>Надо создать хотябы двух игроков для начала игры</span>}
    </div>
  )


  return (
    <div className={style.root}>
      { activePlayer === null
        ? <StartFragment players={players} />
        : (
          <div>
            <h2>Ход игрока {activePlayer.name}</h2>
            { currentTask === null
              ? <SaveChoiseFragment />
              : <TaskFragment task={currentTask} />}
          </div>
          )
       }
    </div>
  )
}