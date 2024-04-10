import React, {component} from 'react';
import ws from './ws/ws';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            developers: []
        }
        this.setProjects = this.setProjects.bind(this);
        this.setDevelopers = this.setDevelopers.bind(this);
    }

    setProjects() {
        ws.onmessage = (e) =>{
            console.log('Received: ' + e.data);
            this.setState({projects: JSON.parse(e.data)});
        }
        ws.send(JSON.stringify(
            {
                action: 'GET',
                type: 'getProjects',
            })
        );
    }

    setDevelopers() {
        ws.onmessage =  (e) =>{
            console.log('Received: ' + e.data);
            this.setState({developers: JSON.parse(e.data)});
        }
        ws.send(JSON.stringify(
            {
                action: 'GET',
                type: 'getDevelopers',
            })
        );
    }

    render() {
        return (
            <div>
                <button onClick={this.setProjects}>Get Projects</button>
                <button onClick={this.setDevelopers}>Get Developers</button>
                <ul>
                    {this.state.projects.map((project) => <li>{project.name}</li>)}
                </ul>
                <ul>
                    {this.state.developers.map((developer) => <li>{developer.name}</li>)}
                </ul>
            </div>
        );
    }

}

export default Test;