import {Box, Button, FormControl, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({setLoggedIn,getDeadlines}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        // console.log('submit');
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json())
            .then(data => {
                // console.log('login',data);
                if (data.token.statusCode == 200) {
                    localStorage.setItem('token', data.token.token);
                    navigate('/');
                    getDeadlines(username);
                    setLoggedIn(true);
                } else {
                    console.log('Auth Failed');
                }
                // console.log(decodeToken(data.token).user.email);
            }).catch(err => {
            console.error(err);
        }).catch(err => {
            console.error(err)
        });
    }

    const handleGuest = () => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                localStorage.setItem('token', data.token.token);
                navigate('/');
                // console.log(decodeToken(data.token).user.email);
            }).catch(err => {
            console.error(err);
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <FormControl>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant={"h4"} marginTop={"24px"} marginBottom={"24px"}>Bejelentkezés</Typography>
                    <Box>
                        <TextField label={"Email"} variant={"outlined"} sx={{mr: 3, mb: 3}}
                                   onChange={handleUsernameChange}/>
                        <TextField label={"Jelszó"} type={"password"} variant={"outlined"} sx={{mb: 3}}
                                   onChange={handlePasswordChange}/>

                    </Box>
                    <Grid>
                        <Button variant={"contained"} sx={{maxWidth: '200px', width: 'min-content'}}
                                onClick={handleSubmit}>Bejelentkezés</Button>
                    </Grid>
                    {/*<Button variant={"contained"} onClick={verifyTest}>Verify</Button>*/}
                    <Grid marginTop={2}>
                        <Button variant={"contained"} sx={{maxWidth: '200px', width: 'min-content'}}
                                onClick={handleGuest}>Vendég</Button>
                    </Grid>
                </div>
            </FormControl>
        </div>
    )
}