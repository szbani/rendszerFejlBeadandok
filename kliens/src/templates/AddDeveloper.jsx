import {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, MenuItem,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";

export default function DeveloperAddButton({GetDevelopers}){
    const [open, setOpen] = useState(false);
    const handleclose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button variant={"outlined"} onClick={handleOpen} sx={{mb: 3}}>Feladat hozzáadása</Button>
            <DeveloperAddDialog open={open} onClose={handleclose} GetDevelopers={GetDevelopers}/>

        </div>
    )
}

function DeveloperAddDialog({open, onClose, GetDevelopers}) {
    const [dev,setDev] = useState('');
    const [devs,setDevs] = useState([]);
    const params = useParams();

    const getDevs = () => {
        fetch('http://localhost:8080/api/project/' + params.projectID + '/availableDevelopers',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setDevs(data);
            }).catch(data => {
            setDevs([]);
        });
    }

    useEffect(() => {
        getDevs();
    }, []);

    const handleSubmit = () => {
        const projectID = params.projectID;
        console.log("submit");
        const formData = {
            dev_id: dev
        }
        fetch('http://localhost:8080/api/project/' + projectID + '/developer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                onClose();
                GetDevelopers();
            }).catch(data => {
            // console.log(data);
        })
        // console.log(formData);
    }

    const handleDeveloperChange = (e) =>{
        setDev(e.target.value);
    }

    return (
        <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
            <FormControl>
                <DialogTitle>Fejlesztő hozzáadása</DialogTitle>
                <DialogContent>
                    <TextField
                        label={"Fejlesztő"}
                        value={dev}
                        onChange={handleDeveloperChange}
                        select
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Válassz fejlesztőt!
                        </MenuItem>
                        {devs.map((developer) => {
                            return <MenuItem key={developer._id} value={developer._id}>{developer.name}</MenuItem>
                        })}

                    </TextField>
                    {/*65fb2362534102d005ce0dcf*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Mégse</Button>
                    <Button onClick={handleSubmit}>Hozzáad</Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    )

}