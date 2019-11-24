import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const url = window.location.hostname + ':8080';

// Note the url parameter used below needs to point to the address of the express server.
let socket = require('socket.io-client')(url);

function App(){
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState(['Messages']);
  const [message, setMessage] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('outgoing alert', message);
    let alert = "Your last message: " + message;
  }
  socket.on('new message inc', (data) => {
    setGreeting(old => [...old, data]);
    console.log(greeting);
  })
  useEffect(() => {

  });


  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your messsage: </label>
            <input
              id="name"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {greeting.map((k) => (
              <li key={k}>{greeting[k]}</li>
            )) }
          </ul>
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
