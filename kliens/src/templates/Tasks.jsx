import React, {useEffect} from 'react';
// import ws from '../ws/ws';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useParams} from "react-router-dom";

function Tasks() {
    const [tasks, setTasks] = React.useState([]);
    const params = useParams();

    useEffect(() => {
        GetTasks();
    }, []);

    const GetTasks = () => {
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID + '/tasks')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTasks(data);
                }).catch(data => {
                setTasks([]);
            });
        } else {
            fetch('http://localhost:8080/api/tasks')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTasks(data);
                }).catch(data => {
                setTasks([]);
            });

        }
    }

    return (
        <div>
            {
                tasks.length > 0 ?
                    <DataGrid
                        rows={tasks.map((task) => task)}
                        columns={[
                            // {field: '_id', minWidth: 150, flex: 0.5},
                            {
                                field: 'name',
                                minWidth: 150,
                                flex: 0.5
                            },
                            {field: 'project_id', minWidth: 150, flex: 0.5},
                            {field: 'user_id', flex: 0.5},
                            {field: 'deadline', flex: 0.5}
                        ]}
                        getRowId={(row) => row._id}
                    ></DataGrid>
                    : <p>'No tasks'</p>
            }
        </div>
    )

}

export default Tasks;