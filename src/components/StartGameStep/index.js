import React, { Component, useState } from 'react';

export default function ({ create }) {
  const [ newName, setNewName ] = useState('');

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <button onClick={() => create(newName) || setNewName('')}>add</button>
    </div>
  )
}

