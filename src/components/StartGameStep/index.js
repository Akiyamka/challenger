import React, { useState } from 'react';
import style from './style.styl';
import routes from './../../routes';

export default function ({ create, players, setRoute }) {
  const [ newName, setNewName ] = useState('');

  const PlayersListFramgent = ({players}) => players.map((pl, i) => (
    <div key={pl.name} className={[style.row, pl.name === name ? style.active : ''].join(' ')}>
      <div className={[style.col, style.firstcol].join(' ')}>
        {i+1}. {pl.name}
      </div>
    </div>
  ))

  const StartFragment = ({ players }) => (
    <div style={{textAlign: 'center'}}>
      { players.length > 1
        ? <button onClick={() => setRoute(routes.game)}> Начать игру </button>
        : <span>Надо создать хотябы двух игроков для начала игры</span>}
    </div>
  )

  return (
    <div className={[style.startScreen, 'column'].join(' ')}>
      <StartFragment players={players} />
      <PlayersListFramgent players={players} />
      <div className={['row', style.dock].join(' ')}>
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={() => create(newName) || setNewName('')}>add</button>
      </div>
    </div>
  )
}

