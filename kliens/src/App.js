import './App.css';
import React from 'react';
import {Container, Grid, Typography, TextField, Button, Select, MenuItem} from '@mui/material';
// import ws from "./ws/ws";
import {Routes, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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
            isLoaded: true
        }
        
    }

    componentDidMount() {

    }
    
    handleNavigateToTasks = () => {
        this.props.history.push('tasks');
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
                    <Grid container spacing={2}>
                       
                            <Button onClick={this.handleNavigateToTasks} >
                            Task
                            </Button>
                            <Routes>
                                <Route path='/' element={Projects} />
                                <Route path='/tasks' render={(props)=><Tasks {...props} projectID="65f3b74b77df5262b3453221"/>} />
                            </Routes> 
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
                </body>
            </div>
        )
            ;
    }
}

export default App;
