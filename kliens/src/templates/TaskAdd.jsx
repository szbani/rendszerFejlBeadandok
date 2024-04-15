import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid,  MenuItem,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useParams} from "react-router-dom";

export default function TaskAddButton() {
    const [open, setOpen] = useState(false);
    const handleclose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button variant={"outlined"} onClick={handleOpen}>Feladat hozzáadása</Button>
            <TaskAddDialog open={open} onClose={handleclose}/>
        </div>
    )

}

function TaskAddDialog({open, onClose}) {

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDescription] = useState("");
    const [taskManager, setTaskManager] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [managers, setManagers] = useState([]);

    const params = useParams();

    const getManagers = () => {
        fetch('http://localhost:8080/api/managers')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setManagers(data);
            }).catch(data => {
            setManagers([]);
        });
    }

    useEffect(() => {
        getManagers();
    },[]);

    const handleSubmit = () => {
        const projectID = params.projectID;
        console.log("submit");
        const formData = {
            name: taskName,
            description: taskDesc,
            user_id: taskManager,
            deadline: deadline
        }
        fetch('http://localhost:8080/api/project/' + projectID + '/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            }).catch(data => {
            console.log(data);

        })
        console.log(formData);
    }

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handleManagerChange = (event) => {
        setTaskManager(event.target.value);
    };

    const handleDeadlineChange = (date) => {
        setDeadline(date);
    };
    return (
        <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
            <FormControl>
                <DialogTitle>Feladat hozzáadása</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginTop:"12px"}} label={"Feladat neve"} value={taskName} onChange={handleTaskNameChange} fullWidth/>
                    <TextField sx={{marginY:"12px"}} label={"Feladat leírása"} value={taskDesc} onChange={handleTaskDescriptionChange}
                               fullWidth/>
                    <Grid   container spacing={2}>
                        <Grid item xs={7}>
                            <TextField
                                label={"Manager"}
                                value={taskManager}
                                onChange={handleManagerChange}
                                select
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Válassz Managert
                                </MenuItem>
                                {managers.map((manager) => {
                                    return <MenuItem key={manager._id} value={manager._id}>{manager.name}</MenuItem>
                                })}

                            </TextField>
                        </Grid>
                        <Grid item xs={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={"Határidő"} value={deadline} onChange={handleDeadlineChange}/>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
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