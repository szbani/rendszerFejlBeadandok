import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    ThemeProvider,
    createTheme,
    Button,
    IconButton,
    Box
} from '@mui/material';
import {huHU as hu} from '@mui/material/locale';
import {huHU as hu2} from '@mui/x-data-grid/locales';
import {huHU as hu3} from '@mui/x-date-pickers/locales';
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
    const {connected, getDeadLines, deadlines} = useContext(Socketcontext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({'email': ''});

    useEffect(() => {
        // console.log('asd2');
        CheckToken().then(data => {
            console.log(data);
            if (data != false) {
                setUser(data.user);
                if (data.user.email === 'Guest') {
                    setLoggedIn(false);
                    // handleClose();
                } else {
                    setLoggedIn(true);
                    // handleOpen();
                    getDeadLines(data.user.email);
                }
            } else {
                localStorage.removeItem('token');
                // router.navigate('/login');
            }
        })
        if (connected && user.email != undefined && loggedIn) {
            getDeadLines(user.email);
        }
    }, []);

    useEffect(() => {
        console.log(user.email, loggedIn);
        // if (location !== '/login') {
        if (user.email != 'Guest' && !loggedIn) {
            router.navigate('/login');
        } else {
            console.log('asd');
            router.navigate('/');
        }
    }, [user.email, loggedIn]);

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
            element: <Login setLoggedIn={setLoggedIn} getDeadlines={getDeadLines}/>
        }

    ]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar position={"sticky"} sx={{marginBottom: '24px'}}>
                <Toolbar>
                    {user.email !== undefined ?
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            aria-label={"Projects"}
                            color={"inherit"}
                            onClick={() => router.navigate('/')}
                        ><HouseIcon/>
                        </IconButton> : null
                    }
                    {user.email !== undefined ?
                        <Typography variant={"h6"} component={'div'}>{user.name}</Typography>
                        :
                        <Typography variant={"h6"} component={'div'}>Redmine</Typography>
                    }
                    {loggedIn ?
                        <Button color={"inherit"} variant={"h6"} sx={{ml: 'auto'}} >Saját feladatok</Button>
                        :
                        null
                    }
                    {!loggedIn ?
                        <Button color={"inherit"} sx={{ml: 'auto'}}
                                onClick={() => {
                                    router.navigate('/login');
                                    localStorage.removeItem('token');
                                    setUser({});
                                }}>Login</Button>
                        :
                        <Button color={"inherit"} sx={{ml: 'auto'}} onClick={() => {
                            localStorage.removeItem('token');
                            setLoggedIn(false);
                            setUser({});
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
