import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import TaskAddButton from "./TaskAdd";
import {DataGrid} from "@mui/x-data-grid";
import DeveloperAddButton from "./AddDeveloper";

function Developers({loggedIn}) {
    const [developers, setDevelopers] = React.useState([]);
    const params = useParams();
    const [projectName, setProjectName] = React.useState('');
    const [devs, setDevs] = useState([]);
    const navigate = useNavigate();

    const DeveloperRefreshButton = () => {
        return (
            <div>
                <Button variant={"outlined"} onClick={GetDevelopers} sx={{mb: 3}}>Frissítés</Button>
            </div>
        )
    }

    const DeleteDeveloper = (developerID) => {
        // console.log(developerID);
        fetch('http://localhost:8080/api/project/' + params.projectID + '/developer/' +developerID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                GetDevelopers();
                getDevs();
            }).catch(data => {
            GetDevelopers();
        });
    }

    const getDevs = () => {
        fetch('http://localhost:8080/api/project/' + params.projectID + '/availableDevelopers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setDevs(data);
            }).catch(data => {
            setDevs([]);
        });
    }

    const GetDevelopers = () =>{
        const projectID = params.projectID;
        if (projectID != undefined) {
            fetch('http://localhost:8080/api/project/' + projectID + '/developers',{
                Method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDevelopers(data);
                    // setProjectName(data[0].project);
                }).catch(data => {
                setDevelopers([]);
            });

        }
    }

    useEffect(() => {
        GetDevelopers();
    }, []);

    return (
        <div>
            <Grid marginTop={"30px"} container spacing={2}>
                <Grid display={"flex"} justifyContent={"flex-start"} item xs={6}>
                    <Typography  variant={"h5"} align={"left"}>Fejlesztők</Typography>
                </Grid>
                <Grid display={"flex"} justifyContent={"flex-end"} item xs={6}>
                    {loggedIn ? <DeveloperAddButton GetDevelopers={GetDevelopers} devs={devs} getDevs={getDevs}/>: null}
                    <DeveloperRefreshButton />
                </Grid>
            </Grid>
            {
                developers.length > 0 ?
                    <DataGrid
                        rows={developers.map((developers) => developers)}
                        pageSizeOptions={[5, 10]}
                        initialState={{pagination: {paginationModel: {pageSize: 5, page: 0}}}}
                        autoHeight={true}
                        columns={[
                            // {field: '_id', minWidth: 150, flex: 0.5},
                            {
                                field: 'name',
                                headerName: 'Fejlesztő',
                                minWidth: 150,
                                flex: 0.5
                            },
                            {field: 'email', headerName: 'Email', flex: 0.5},
                            {
                                field: 'delete',
                                headerName: 'Törlés',
                                sortable: false,
                                flex: 0.3,
                                renderCell: (params) => {
                                    return <Button variant={"outlined"}
                                                   onClick={() => DeleteDeveloper(params.row._id)}>Törlés</Button>
                                }
                            }
                        ]}
                        columnVisibilityModel={{delete: loggedIn}}
                        getRowId={(row) => row._id}

                    ></DataGrid>
                    : <p>'Nincsenek fejlesztők'</p>
            }
        </div>
    )
}

export default Developers;