import React from 'react';
// import ws from '../ws/ws';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this.getTasks = this.getTasks.bind(this);
        // this.setProjects = this.setProjects.bind(this);
    }

    render(){
        return(
            <div>
                {
                    this.state.tasks.length > 0 ?
                    <DataGrid
                        rows={this.state.tasks.map((task) => task)}
                        columns={[{field: '_id', minWidth: 150, flex: 0.5}, {field: 'name', minWidth: 150, flex: 0.5}, {field: 'project_id', minWidth: 150, flex: 0.5}, {field: 'user_id', flex: 0.5}, {field: 'deadline', flex: 0.5}]}
                        getRowId={(row) => row._id}
                    ></DataGrid>
                    : <p>'No tasks'</p>
                }
            </div>
        )

    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        fetch('http://localhost:8080/api/tasks')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({tasks: data});
            }).catch(data => {
                this.setState({tasks: []});   
            });

    }
}

export default Tasks;