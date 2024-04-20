import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
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

function TaskAddDialog({open, onClose, GetTasks}) {
    const [developerName, setDeveloperName] = useState("");
    const [developerEmail, setDeveloperEmail] = useState("");

    const params = useParams();

    const handleSubmit = () => {
        const projectID = params.projectID;
        console.log("submit");
        const formData = {
            name: developerName,
            email: developerEmail
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

    const handleDeveloperNameChange = (event) => {
        setDeveloperName(event.target.value);
    };

    const handleDeveloperEmailChange = (event) => {
        setDeveloperEmail(event.target.value);
    };

    return (
        <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
            <FormControl>
                <DialogTitle>Fejlesztő hozzáadása</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginTop: "12px"}} label={"Fejlesztő neve"} value={developerName}
                               onChange={handleDeveloperNameChange} fullWidth/>
                    <TextField sx={{marginY: "12px"}} label={"Fejlesztő email címe"} value={developerEmail}
                               onChange={handleDeveloperEmailChange}
                               fullWidth/>
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