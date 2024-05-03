import './App.css';
import React, {useContext, useEffect, useState} from 'react';
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
import {Socketcontext} from "./ws/ws";

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

const App = () => {
    const {connected, getDeadLines, deadlines, handleClose, handleOpen} = useContext(Socketcontext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        if (user.email === undefined || user.email === '') {
            console.log('asd2');
            CheckToken().then(data => {
                // console.log(data);
                if (data.msg === 'Token is valid') {
                    setUser(data.user);
                    if (data.user.email === 'Guest') {
                        setLoggedIn(false);
                        handleClose();
                    } else {
                        setLoggedIn(true);
                        handleOpen();
                        getDeadLines(data.user.email);
                    }
                } else {
                    localStorage.removeItem('token');
                    router.navigate('/login');
                }
            })
        }
        // socket.connect();
        // console.log(localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        // if (deadlines > 0) console.log('valtozott');
        if (connected && user.email != undefined) {
            getDeadLines(user.email);
        }
    }, [connected]);

    const CheckToken = async () => {
        try {
            const token = localStorage.getItem('token');
            return await fetch('http://localhost:8080/api/verify', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }).then(response => {

                if (!response.ok) {
                    return false;
                }
                const data = response.json();
                return data;
            })
        } catch (err) {
            console.error(err);
            return false;
        }
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
            element: <Login setLoggedIn={setLoggedIn} handleOpen={handleOpen} handleClose={handleClose}/>
        }

    ]);

    // const websocketDisconnect = () => {
    //     if (ws.readyState === WebSocket.CLOSED) {
    //         console.log('Nincs kapcsolat a szerverrel.');
    //         return;
    //     }
    //     ws.close();
    // }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position={"sticky"} sx={{marginBottom: '24px'}}>
                <Toolbar>
                    {loggedIn ?
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            aria-label={"Projects"}
                            color={"inherit"}
                            onClick={() => router.navigate('/')}
                        ><HouseIcon/>
                        </IconButton> : null
                    }
                    <Typography variant={"h6"} component={'div'}>Redmine</Typography>
                    {!loggedIn ?
                        <Button color={"inherit"} sx={{ml: 'auto'}}
                                onClick={() => router.navigate('/login')}>Login</Button>
                        :
                        <Button color={"inherit"} sx={{ml: 'auto'}} onClick={() => {
                            localStorage.removeItem('token');
                            setLoggedIn(false);
                            setUser({});
                            handleClose();
                            router.navigate('/login');
                        }}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
            <Container>
                <RouterProvider router={router}/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
