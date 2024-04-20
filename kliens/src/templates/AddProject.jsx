import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Grid, MenuItem,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";

export default function AddProjectButton(getProjects) {
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
            <AddProjectDialog open={open} onClose={handleclose} getProjects={getProjects}/>
        </div>
    )

}

function AddProjectDialog({open, onClose, getProjects}) {

    const [projectName, setProjectName] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [project_types, setTypeArray] = useState([]);

    const getProjectTypes = () => {
        fetch('http://localhost:8080/api/projecttypes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTypeArray(data);
            }).catch(data => {
                console.log("types received");
            setTypeArray([]);
        });
    }

    useEffect(() => {
        getProjectTypes();
    },[]);

    const handleSubmit = () => {
        console.log("submit");
        const formData = {
            name: projectName,
            type_id: projectType,
            description: projectDesc
        }
        fetch('http://localhost:8080/api/project/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                onClose();
                getProjects();
            }).catch(data => {
            console.log(data);

        })
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
        <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
            <FormControl>
                <DialogTitle>Projekt hozzáadása</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginTop:"12px"}} label={"Projekt neve"} value={projectName} onChange={handleProjectNameChange} fullWidth/>
                    <TextField sx={{marginY:"12px"}} label={"Projekt leírása"} value={projectDesc} onChange={handleProjectDescriptionChange}
                               fullWidth/>
                    <Grid   container spacing={2}>
                        <Grid item xs={7}>
                <TextField
                    id="ProjectType"
                    value={projectType}
                    label="Type"
                    onChange={handleProjectTypeChange}
                    select
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        Válassz Projekt típust
                    </MenuItem>
                    {project_types.map((projectType) => {
                        return <MenuItem key={projectType._id} value={projectType._id}>{projectType.name}</MenuItem>
                        }
                    )}
                </TextField>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Mégse</Button>
                    <Button onClick={handleSubmit}>Hozzáadás</Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    )
}

//export default AddProject;