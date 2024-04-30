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
import {decodeToken} from "react-jwt";

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

export function checkLoggedIn(){
    const token = localStorage.getItem('token');
    if(token == undefined || decodeToken(token).user.email == 'Guest'){
        return false;
    }
    return true;
}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        CheckToken();
        // console.log(decodeToken(token).user.email);
        setLoggedIn(checkLoggedIn());
    }, []);

    const CheckToken = () =>{
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/verify', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data.statusCode);
                // console.log(response);
                // console.log(data);
                // console.log(data.statusCode);
                if (data.statusCode != 200) {
                    router.navigate('/login');
                    localStorage.removeItem('token');
                }
            }).catch(err => {
                console.error(err);
        });
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Projects loggedIn={loggedIn}/>
        },
        {
            path: '/project/:projectID',
            element: <div><Tasks loggedIn={loggedIn}/><Developers loggedIn={loggedIn}/></div>
        },
        {
            path: '/login',
            element: <Login setLoggedIn={setLoggedIn}/>
        }

    ]);

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
                        {!loggedIn ?
                        <Button color={"inherit"} sx={{ml: 'auto'}} onClick={() => router.navigate('/login')}>Login</Button>
                            :
                            <Button color={"inherit"} sx={{ml: 'auto'}} onClick={() => {
                                localStorage.removeItem('token');
                                setLoggedIn(false);
                                router.navigate('/login');
                            }}>Logout</Button>
                        }
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
