import React, {useEffect} from 'react';
// import ws from '../ws/ws';
import {Button, Grid, IconButton, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import TaskAddButton from "./TaskAdd";


function Tasks() {
    const [tasks, setTasks] = React.useState([]);
    const params = useParams();
    const [projectName,setProjectName] = React.useState('');

    const TaskRefreshButton = () => {
        return (
            <div>
                <Button variant={"outlined"} onClick={GetTasks} sx={{mb: 3}}>Frissítés</Button>
            </div>
        )
    }

    const BackToProjectsButton = () => {
        return (
            <IconButton aria-label={'back to projects'} sx={{mb: 3}}><ArrowBack/></IconButton>
        )
    }

    const DeleteTaskButton = () => {
        return (
            <Button variant={"outlined"}>Feladat Törlése</Button>
        )
    }

    const DeleteTask = (taskID) => {
        fetch('http://localhost:8080/api/project/' + params.projectID + '/task/' + taskID, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                GetTasks();
            }).catch(data => {
            GetTasks();
        });
    }

    const GetTasks = () => {
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID + '/tasks')
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setTasks(data);
                    // setProjectName(data[0].project);
                }).catch(data => {
                setTasks([]);
            });

        }
    }

    const GetProjectName = () => {
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setProjectName(data.name);
                }).catch(data => {
                setProjectName('');
            });

        }

    }

    useEffect(() => {
        GetTasks();
        GetProjectName();
    }, []);

    return (
        <div>
            <Typography align={"left"} variant={"h4"}>{projectName}</Typography>
            <Grid container spacing={2}>
                <Grid display={"flex"} justifyContent={"flex-start"} item xs={6}>
                    <BackToProjectsButton/>
                </Grid>
                <Grid display={"flex"} justifyContent={"flex-end"} item xs={6}>
                    <TaskAddButton GetTasks={GetTasks}/>
                    <TaskRefreshButton/>
                </Grid>
            </Grid>
            {
                tasks.length > 0 ?
                    <DataGrid
                        rows={tasks.map((task) => task)}
                        pageSizeOptions={[5, 10]}
                        initialState={{pagination: {paginationModel: {pageSize: 5, page: 0}}}}
                        autoHeight={true}
                        columns={[
                            // {field: '_id', minWidth: 150, flex: 0.5},
                            {
                                field: 'name',
                                headerName: 'Feladat',
                                minWidth: 150,
                                flex: 0.5
                            },
                            {field: 'project', headerName: 'Projekt', minWidth: 150, flex: 0.5},
                            {field: 'user', headerName: 'Manager', flex: 0.5},
                            {field: 'deadline', headerName: 'Határidő', flex: 0.5},
                            {
                                field: 'delete',
                                headerName: 'Törlés',
                                flex: 0.4,
                                renderCell: (params) => {
                                    return <DeleteTaskButton
                                        onClick={() => DeleteTask(params.row._id)}></DeleteTaskButton>
                                }
                            }
                        ]}
                        getRowId={(row) => row._id}

                    ></DataGrid>
                    : <p>'No tasks'</p>
            }
        </div>
    )

}

export default Tasks;