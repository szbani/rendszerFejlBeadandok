import React, {useEffect, useState} from 'react';
// import ws from '../ws/ws';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useNavigate} from "react-router-dom";


function Projects() {
    const [projects, setProjects] = useState([]);
    const getProjects = () => {
        fetch('http://localhost:8080/api/projects')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProjects(data);
            }).catch(data => {
            setProjects([]);
        });

    }
    const navigate = useNavigate();

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <Button variant={"outlined"} onClick={getProjects} sx={{mb: 3}}>Refresh projects</Button>
            {projects.length > 0 ?
                <DataGrid
                    rows={projects}
                    columns={[
                        {field: '_id', minWidth: 150, flex: 0.5},
                        {field: 'name', minWidth: 150, flex: 0.5},
                        {field: 'type', minWidth: 150, flex: 0.5},
                        {field: 'description', minWidth: 150, flex: 0.5},
                        {field: 'sumTasks', minWidth: 150, flex: 0.5}
                    ]}
                    getRowId={(row) => row._id}
                    onRowClick={(row) => {
                        // console.log(row);
                        navigate('/project/' + row.row._id + '/tasks');
                    }}
                ></DataGrid>
                : <p>'No projects'</p>
            }
        </div>
    )
}

export default Projects;
