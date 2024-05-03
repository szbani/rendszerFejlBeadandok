import Alert from '@mui/material/Alert';
import {useEffect} from "react";

const BasicAlert = ({ message }) => {

    useEffect(() => {

    }, []);
    return (
        <Alert variant="filled" severity="info">{message}</Alert>
    );
};

export default BasicAlert;