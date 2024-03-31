import logo from './logo.svg';
import './App.css';
//const WebSocket = require('ws');

function App() {
  const ws = wsConnect();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

function wsConnect() {

  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = async function () {
    console.log('Connected');
    // ws.send('Hello Server');
    ws.send(JSON.stringify(
        {
            action: 'AUTH',
            email: 'hujeno@gmail.com',
            password: 'password'
        }
    ));

    setTimeout(() => {
        // ws.send(JSON.stringify(
        //     {
        //         action: 'UPLOAD',
        //         type: 'addTask',
        //         name: 'task test',
        //         project_id: '65f3b74b77df5262b3453221',
        //         user_id: '65f3acb946a8a82e961b3fb9',
        //         deadline: '2025-06-25',
        //     }));
        // ws.send(JSON.stringify(
        //     {
        //         _id: '65fb4f8762c10f7c88f40f9c',
        //         action: 'UPDATE',
        //         type: 'updateTask',
        //         name: 'task test updatedasd',
        //         project_id: '65f3b74b77df5262b3453221',
        //         user_id: '65f3acb946a8a82e961b3fb9',
        //         deadline: '2025-07-25',
        //     }));
        // ws.send(JSON.stringify(
        //     {
        //         action: 'DELETE',
        //         type: 'deleteTask',
        //         _id: '65fb4f8762c10f7c88f40f9c'
        //     }));
          ws.send(JSON.stringify(
             {
                 action: 'GET',
                 type: 'getProjects',
             }));
    //     ws.send(JSON.stringify(
    //         {
    //             action: 'UPLOAD',
    //             type: 'addManager',
    //             name: 'B.Ödön',
    //             email: 'bodon@gmail.com',
    //             password: 'password'
    //         }));
    },5000);

}

ws.onmessage = function (e) {
    console.log('Received: ' + e.data);
}

ws.onclose = function () {
    console.log('Disconnected');
}

ws.onerror = function (e) {
    console.log('Error: ' + e.data);
}


  return ws;
}

export default App;
