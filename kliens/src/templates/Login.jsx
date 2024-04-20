import {Box, Button, TextField, Typography} from "@mui/material";

export default function Login() {
    return (
        <div>
            <Typography variant={"h4"} marginBottom={"12px"}>Bejelentkezés</Typography>
            <Box>
                <TextField label={"Username"} variant={"outlined"} sx={{mb: 3}}/>
                <TextField label={"Password"} variant={"outlined"} sx={{mb: 3}}/>
            </Box>
            <Button variant={"contained"}>Bejelentkezés</Button>
        </div>
    )
}