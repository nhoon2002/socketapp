import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
let socket = require('socket.io-client')('http://127.0.0.1:8080');

function App(){
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('incoming data',
  'hey');
    fetch(`/api/ping?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(greeting => setGreeting(greeting.greeting));

  }


  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );

}

export default App;
