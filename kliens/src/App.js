import './App.css';
import React from 'react';
import {Container, Grid, Typography, TextField, Button, Select, MenuItem} from '@mui/material';
// import ws from "./ws/ws";
import {Routes, Route, BrowserRouter, Link, useNavigate, Navigate} from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
// import Test from './Test.js';
import Projects from './templates/Projects';
import Tasks from './templates/Tasks';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskName: '',
            newTaskDescription: '',
            selectedDeveloper: '',
        }
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </head>
                <header className="App-header">
                    <h1>Redmine</h1>
                </header>
                <body>

                <Container>
                    <Grid >
                       <BrowserRouter basename={'/'}>
                           <ul>
                               <li>
                                   <Link to={'/'}>Home</Link>
                               </li>
                               <li>
                                   <Link to={'/project/65f3b74b77df5262b3453221/tasks'}>Tasks</Link>
                               </li>
                           </ul>
                           <Routes>
                               <Route path='/' element={<Projects />} />
                               <Route path='/project/:projectID/tasks' loader={({params})=>{
                                     console.log( params);
                               }}
                               element={<Tasks/>}/>
                           </Routes>

                        </BrowserRouter>
                        {/* <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom sx={{mt: 2}}>
                                Elérhető projektek
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Tasks></Tasks>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Új feladat felvétele
                            </Typography>
                            <TextField
                                sx={{mb: 2}}
                                label="Feladat neve"
                                variant="outlined"
                                fullWidth
                                //value={newTaskName}
                                //onChange={(e) => setNewTaskName(e.target.value)}
                            />
                            <TextField
                                sx={{mb: 2}}
                                label="Feladat leírása"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                //value={newTaskDescription}
                                //onChange={(e) => setNewTaskDescription(e.target.value)}
                            />
                            <Select
                                sx={{mb: 2}}
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
                        </Grid> */}
                       
                    </Grid>
                </Container>
                <div className="App-header"></div>
                </body>
            </div>
        )
            ;
    }
}

export default App;
