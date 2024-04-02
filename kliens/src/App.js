import logo from './logo.svg';
import './App.css';
//const WebSocket = require('ws');
import { Container, Grid, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
//import * as mui from '@material-ui/core';

function App() {
  const ws = wsConnect();
  return (
    <div className="App">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <header className="App-header">
        <h1>Redmine</h1>
      </header>
      <body>
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom
          sx={{ mt: 2 }}
          >
            Elérhető projektek
          </Typography>

        </Grid>
        <Grid item xs={12}>
        
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Új feladat felvétele
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            label="Feladat neve"
            variant="outlined"
            fullWidth
            //value={newTaskName}
            //onChange={(e) => setNewTaskName(e.target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Feladat leírása"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            //value={newTaskDescription}
            //onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <Select
            sx={{ mb: 2 }}
            //value={selectedDeveloper}
            //onChange={(e) => setSelectedDeveloper(e.target.value)}
            fullWidth
            displayEmpty
            defaultValue=""
          >
            <MenuItem value="" disabled>
              Válassz fejlesztőt
            </MenuItem>
           
          </Select>
          <Button variant="contained" color="primary">
            Feladat hozzáadása
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Menedzser által létrehozott feladatok
          </Typography>
          {/* Menedzser által létrehozott feladatok listázása */}
        </Grid>
      </Grid>
    </Container>
      </body>
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
