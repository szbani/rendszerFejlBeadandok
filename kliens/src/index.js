import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Tasks from "./templates/Tasks";
import Projects from "./templates/Projects";
import App from "./App";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {createBrowserHistory} from "history";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path='/' element={<App/>}>
//             <Route path='tasks' element={<Tasks/>}/>
//         </Route>
//     )
// );

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<RouterProvider router={router}></RouterProvider>*/}
        <App history={history}></App>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
