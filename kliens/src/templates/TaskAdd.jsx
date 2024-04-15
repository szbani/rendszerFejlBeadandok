import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

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
    const [taskManager, setManager] = useState("");
    const [deadline, setDeadline] = useState(null);

    const handleSubmit = () => {
        console.log("submit");
        const formData = {
            name: taskName,
            description: taskDesc,
            manager: taskManager,
            deadline: deadline
        }
        console.log(formData);
    }

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handleManagerChange = (event) => {
        setManager(event.target.value);
    };

    const handleDeadlineChange = (date) => {
        setDeadline(date);
    };
    return (
        <Dialog fullWidth maxWidth={"md"} open={open} onClose={onClose}>
            <FormControl>
                <DialogTitle>Feladat hozzáadása</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Test szoveg!
                    </DialogContentText>
                    <TextField label={"Feladat neve"} value={taskName} onChange={handleTaskNameChange} fullWidth/>
                    <DialogContentText>
                        Test szoveg!
                    </DialogContentText>
                    <TextField label={"Feladat leírása"} value={taskDesc} onChange={handleTaskDescriptionChange} fullWidth/>
                    <DialogContentText>
                        Test szoveg!
                    </DialogContentText>
                    <Select

                        label="Manager"
                        value={taskManager}
                        onChange={handleManagerChange}
                        fullWidth
                    >
                        <MenuItem value={'man1'}>man1</MenuItem>
                        <MenuItem value={'man2'}>man2</MenuItem>
                    </Select>
                    <DialogContentText>
                        Test szoveg!
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker label={"Határidő"} value={deadline} onChange={handleDeadlineChange}/>
                    </LocalizationProvider>
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