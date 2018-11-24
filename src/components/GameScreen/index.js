import React, { Component, useState } from 'react';

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
    <div>
      <button onClick={() => updateAndNext(activePlayer.savePoints())}> Save to Bank </button>
      <button onClick={getTask}> Do task </button>
    </div>
  );

  const TaskFragment = ({task}) => (
    <div>
      <p>{task.content}</p>
      <button onClick={() => updateAndNext(activePlayer.taskComplete()) }>Complete</button>
      <button onClick={() => updateAndNext(activePlayer.taskIncomplete()) }>Not complete</button>
    </div>
  );


  return (
    <div>
      { activePlayer === null
        ? <button onClick={() => players.length > 1 && start(players)}> Start game </button>
        : (
          <div>
            <h3>Now move {activePlayer.name}</h3>
            { currentTask === null
              ? <SaveChoiseFragment />
              : <TaskFragment task={currentTask} />}
          </div>
          )
       }
    </div>
  )
}