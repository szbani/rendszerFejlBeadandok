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

export default function AddProjectButton() {
    const [open, setOpen] = useState(false);
    const handleclose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button variant={"outlined"} onClick={handleOpen}>Projekt hozzáadása</Button>
            <AddProjectDialog open={open} onClose={handleclose}/>
        </div>
    )

}

function AddProjectDialog({open, onClose}) {

    const [projectName, setProjectName] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectDesc, setProjectDesc] = useState("");

    const handleSubmit = () => {
        console.log("submit");
        const formData = {
            name: projectName,
            type: projectType,
            description: projectDesc
        }
        console.log(formData);
    }

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleProjectTypeChange = (event) => {
        setProjectType(event.target.value);
    };

    const handleProjectDescriptionChange = (event) => {
        setProjectDesc(event.target.value);
    };

    return (
        <div>
            <FormControl marginNormal>
                <DialogTitle>Projekt hozzáadása</DialogTitle>
                <DialogContent>
                <TextField id="project-name" label="Name" variant="outlined" value={projectName} onChange={handleProjectNameChange}/>
                <Select
                    id="ProjectType"
                    value={projectType}
                    label="Type"
                    onChange={handleProjectTypeChange}
                >
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                </Select>
                <TextField id="project-desc" label="Description" variant="outlined" value={projectDesc} onHandle={handleProjectDescriptionChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Mégse</Button>
                    <Button onClick={handleSubmit}>Hozzáadás</Button>
                </DialogActions>
            </FormControl>

        </div>
    )
}

//export default AddProject;