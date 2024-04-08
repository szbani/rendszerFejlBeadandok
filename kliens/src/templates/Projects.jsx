import React from 'react';
// import ws from '../ws/ws';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import {useNavigate} from 'react-router-dom';



class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
        this.getProjects = this.getProjects.bind(this);
        // this.setProjects = this.setProjects.bind(this);
    }

    render() {
        return (
            <div>
                <Button variant={"outlined"} onClick={this.getProjects} sx={{mb: 3}}>Refresh projects</Button>
                {this.state.projects.length > 0 ?
                    <DataGrid
                        rows={this.state.projects.map((project) => project)}
                        columns={[{field: '_id', minWidth: 150, flex: 0.5}, {field: 'name', minWidth: 150, flex: 0.5}, {field: 'type_id', minWidth: 150, flex: 0.5}, {field: 'description', minWidth: 150, flex: 0.5}]}
                        getRowId={(row) => row._id}
                    ></DataGrid>
                    : <p>'No projects'</p>
                }
            </div>
        )
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        fetch('http://localhost:8080/api/projects')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({projects: data});
            }).catch(data => {
                this.setState({projects: []});   
            });

    }
}

export default Projects;
