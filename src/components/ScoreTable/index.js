import React, { useState } from 'react';
import style from './style.styl';;

export default function ({ name, players }) {
  return (
    <div>
      <h2>Текущий счет: </h2>
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
    </div>
  )
}

