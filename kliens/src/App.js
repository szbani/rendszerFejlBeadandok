import './App.css';
import React, {useEffect,useState} from 'react';
import {Container, AppBar, Toolbar, Typography, ThemeProvider, createTheme, Button, IconButton} from '@mui/material';
import {huHU as hu} from '@mui/material/locale';
import {huHU as hu2} from '@mui/x-data-grid/locales';
import {huHU as hu3} from '@mui/x-date-pickers/locales';
// import ws from "./ws/ws";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';

import Projects from './templates/Projects';
import Tasks from './templates/Tasks';
import Developers from './templates/Developers';
import Login from "./templates/Login";

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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Projects/>
    },
    {
        path: '/project/:projectID',
        element: <div><Tasks/><Developers/></div>
    },
    {
        path: '/login',
        element: <Login/>
    }

]);

export const checkToken = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/verify', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(response => response.json())
        .then(data => {
            // console.log(response);
            console.log(data);
            console.log(data.statusCode);
            if (data.statusCode != 200) {
                router.navigate('/login');
            }
        }).catch(err => {
        console.error(err);
    });

}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppBar position={"sticky"} sx={{marginBottom:'24px'}}>
                    <Toolbar>
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            aria-label={"Projects"}
                            color={"inherit"}
                            onClick={() => router.navigate('/')}
                        >
                            <HouseIcon/>
                        </IconButton>
                        <Typography variant={"h6"} component={'div'}>Redmine</Typography>
                        <Button color={"inherit"} sx={{ml: 'auto'}} onClick={() => router.navigate('/login')}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <RouterProvider router={router} />
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
