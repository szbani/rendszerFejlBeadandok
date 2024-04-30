import React, {useEffect, useState} from 'react';
// import ws from '../ws/ws';
import {Box, Button, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useNavigate} from "react-router-dom";
import AddProjectButton from "./AddProject";

function Projects({loggedIn}) {
    const [projects, setProjects] = useState([]);
    const getProjects = () => {
        fetch('http://localhost:8080/api/projects',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setProjects(data);
            }).catch(data => {
            setProjects([]);
        });

    }
    const navigate = useNavigate();

    const DeleteProject = (ProjectID) => {
        fetch('http://localhost:8080/api/project/' + ProjectID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                getProjects();
            }).catch(data => {
            getProjects();
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <Typography align={"left"} variant={"h4"}>Projektek</Typography>
            <Box justifyContent={"flex-end"} display={"flex"}>
                {loggedIn ? <AddProjectButton getProjects={getProjects}/> : null}
                <Button variant={"outlined"} onClick={getProjects} sx={{mb: 1}}>Frissítés</Button>
            </Box>
            <Typography>Kattints duplán a projektre a feladatokért</Typography>
            {projects.length > 0 ?
                <DataGrid
                    rows={projects}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{pagination: { paginationModel: {pageSize: 5, page: 0}}}}
                    autoHeight={true}
                    columns={[
                        // {field: '_id', minWidth: 150, flex: 0.5},
                        {field: 'name', headerName: "Projekt", minWidth: 150, flex: 0.5},
                        {field: 'type', headerName: "Típus", minWidth: 150, flex: 0.5},
                        {field: 'description', headerName: "Leírás", minWidth: 150, flex: 0.5},
                        {field: 'sumTasks', headerName: "Feladatok Száma", minWidth: 150, flex: 0.5},
                        {
                            field: 'delete',
                            headerName: 'Törlés',
                            sortable: false,
                            flex: 0.4,
                            renderCell: (params) => {
                                return <Button variant={"outlined"}
                                               onClick={() => DeleteProject(params.row._id)}>Törlés</Button>
                            }
                        }
                    ]}
                    columnVisibilityModel={{delete: loggedIn}}
                    getRowId={(row) => row._id}
                    onRowDoubleClick={(row) => {
                        // console.log(row);
                        navigate('/project/' + row.row._id);
                    }}
                ></DataGrid>
                : <p>'No projects'</p>
            }
        </div>
    )
}

export default Projects;
