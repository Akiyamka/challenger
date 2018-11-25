import React, { useState } from 'react';
import style from './style.styl';
import ScoreTable from './../ScoreTable';

export default function({
  players,
  setRoute,
  currentPlayer,
  setCurrentPlayer,
  currentTask,
  nextMove
}) {
  const [ isShowTask, switchTaskShow ] = useState(false);

  /* Game start */
  if (currentPlayer === null) {
    setCurrentPlayer(players[0])
  }

  const SaveChoiseFragment = () => (
    <div style={{flex: 1}}>
      <p>Сохраним накопленное или выполним задание?</p>
      <div className={style.buttonDock}>
        <button onClick={() => switchTaskShow(true)}>Выполнить задание</button>
        <button onClick={() => currentPlayer.savePoints() && nextMove() }>Сохраниться</button>
      </div>
    </div>
  );

  const TaskFragment = ({ task }) => (
    task ? <div style={{flex: 1}}>
      <h4>Название задания</h4>
      <p>{task.content}</p>
      <div className={style.buttonDock}>
        <button onClick={() => currentPlayer.taskComplete() && nextMove() || switchTaskShow(false)}>Осилил</button>
        <button onClick={() => currentPlayer.taskIncomplete() && nextMove() || switchTaskShow(false)}>Не осилил</button>
      </div>
    </div> : <div> Загружаю задание... </div>
  );

  return (
    <div className={style.root}>
      { currentPlayer &&
        <div className={style.taskContainer}>
          <h2>Ход игрока {currentPlayer.name}</h2>
          { currentPlayer.factor === 0 || isShowTask
            ? <TaskFragment task={currentTask} />
            : <SaveChoiseFragment />
          }
        </div>
      }

      { currentPlayer && <ScoreTable name={currentPlayer.name} players={players} /> }
    </div>
  )
}