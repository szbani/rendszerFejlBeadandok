import React, {useEffect, useState} from 'react';
// import ws from '../ws/ws';
import {Button, Grid, IconButton, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import TaskAddButton from "./TaskAdd";
import {useNavigate} from "react-router-dom";

function Tasks({loggedIn, user, _filter}) {
    const [tasks, setTasks] = React.useState([]);
    const params = useParams();
    const [projectName, setProjectName] = React.useState('');
    const navigate = useNavigate();

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const [filterModel, setFilterModel] = useState({
        items: [{ field: 'deadline', operator: 'onOrBefore', value: addDays(new Date(), 7) }],
    });

    let id;
    if (user !== undefined) {
        id = user._id;
    }
    const TaskRefreshButton = () => {
        return (
            <div>
                <Button variant={"outlined"} onClick={GetTasks} sx={{mb: 3}}>Frissítés</Button>
            </div>
        )
    }

    const BackToProjectsButton = () => {
        return (
            <IconButton aria-label={'Vissza a projektekhez'}
                        onClick={() => {
                            try {
                                navigate('/');
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                        sx={{mb: 3}}>
                <ArrowBack/>
            </IconButton>
        )
    };

    const DeleteTask = (taskID) => {
        console.log(taskID);
        fetch('http://localhost:8080/api/project/' + params.projectID + '/task/' + taskID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                GetTasks();
            }).catch(data => {
            GetTasks();
        });
    }

    const GetTasks = () => {
        console.log(id)
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID + '/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    data = data.map((task) => {
                        task.deadline = new Date(task.deadline);
                        // console.log(date,tasks.d)
                        return task;
                    });
                    setTasks(data);
                }).catch(data => {
                setTasks([]);
            });
        } else if (id != undefined) {
            fetch('http://localhost:8080/api/manager/' + id + '/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data = data.map((task) => {
                        task.user = user.name;
                        task.deadline = new Date(task.deadline);
                        // console.log(date,tasks.d)
                        return task;
                    });
                    setTasks(data);
                }).catch(data => {
                setTasks([]);
            });
        }
    }

    const GetProjectName = () => {
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setProjectName(data.name);
                }).catch(data => {
                setProjectName('');
            });

        }

    }

    useEffect(() => {
        GetTasks();
        GetProjectName();
        if (_filter) {
            //setFilter();
            setFilterModel({
                items: [{ field: 'deadline', operator: 'onOrBefore', value: addDays(new Date(), 7) }],
            });
        } else {
            //setFilter(undefined);
            setFilterModel(undefined);
        }
    }, [id, _filter]);

    return (
        <div>
            {id == undefined ?
                <Typography align={"left"} variant={"h4"}>{projectName}</Typography>
                :
                null
            }
            <Grid container spacing={2}>
                <Grid display={"flex"} justifyContent={"flex-start"} item xs={6}>
                    <BackToProjectsButton/>
                    <Typography variant={"h5"}>Feladatok</Typography>
                </Grid>
                <Grid display={"flex"} justifyContent={"flex-end"} item xs={6}>
                    {loggedIn && id == undefined ? <TaskAddButton GetTasks={GetTasks}/> : null}
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
                            {field: 'description', headerName: 'Leírás', flex: 0.5},
                            {field: 'user', headerName: 'Manager', flex: 0.4},
                            {field: 'deadline', headerName: 'Határidő', flex: 0.3, type: 'date'},
                            {
                                field: 'delete',
                                headerName: 'Törlés',
                                sortable: false,
                                flex: 0.3,
                                renderCell: (params) => {
                                    return <Button variant={"outlined"}
                                                   onClick={() => DeleteTask(params.row._id)}>Törlés</Button>
                                }
                            }
                        ]}
                        columnVisibilityModel={{delete: loggedIn}}
                        getRowId={(row) => row._id}
                        filterModel={filterModel}
                        //onFilterModelChange={(newModel) => setFilterModel(newModel)}

                    ></DataGrid>
                    : <p>'No tasks'</p>
            }
        </div>
    )

}

export default Tasks;