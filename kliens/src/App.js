import './App.css';
import React from 'react';
import {Container, AppBar, Toolbar, Typography, ThemeProvider, createTheme} from '@mui/material';
import {huHU as hu} from '@mui/material/locale';
import {huHU as hu2} from '@mui/x-data-grid/locales';
import {huHU as hu3} from '@mui/x-date-pickers/locales';
// import ws from "./ws/ws";
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Projects from './templates/Projects';
import Tasks from './templates/Tasks';
// const HandleNavigate = (props) => {
//     const navigate = useNavigate();
//     // console.log(props);
//     const handleClick = () => {
//         navigate(props.path);
//     }
//     return (
//         <Button variant={"outlined"} onClick={handleClick} sx={{mb: 3}}>{props.text}</Button>
//     )
//
// }

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#271c1c',
            },
        },
    },
    hu,
    hu2,
    hu3,
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskName: '',
            newTaskDescription: '',
            selectedDeveloper: '',
        }

    }

    render() {
        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <AppBar sx={{mb: 5}} position={"sticky"}>
                        <Toolbar>
                            <Typography variant={"h6"} component={"div"}>Redmine</Typography>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <BrowserRouter basename={'/'}>
                            {/*<HandleNavigate path={'/'} text={'Projects'}></HandleNavigate>*/}
                            <Routes>
                                <Route path='/project/:projectID/tasks'
                                       element={<Tasks/>}/>
                                <Route path='/'
                                       element={<Projects/>}/>
                            </Routes>
                        </BrowserRouter>

                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;
