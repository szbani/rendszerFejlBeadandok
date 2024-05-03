import {io} from "socket.io-client";
import React, {createContext, useEffect, useState} from "react";


const Socketcontext = createContext();

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [isInitialized, setInitialized] = useState(false);
    const [deadlines, setDeadlines] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const initSocket = async () => {
            const newSocket = io('http://localhost:8888', {
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 10,
                transports: ['websocket'],
            });

            newSocket.on('connect', () => {
                console.log('A socket.io kapcsolat létrejött');
                setConnected(true);
            });

            newSocket.on('message', (data) => {
                console.log('Bejövő üzenet:', data);
            });

            newSocket.on('disconnect', () => {
                console.log('A socket.io kapcsolat lezárult');
                setConnected(false);
            });

            newSocket.on('error', (error) => {
                console.error('Hiba történt a socket.io kapcsolat során:', error);
            });

            newSocket.on('deadlines', (data) => {
                console.log('Deadlines:', data);
                setDeadlines(data);
            });

            setSocket(newSocket);
        }

        initSocket().then(() => setInitialized(true));

        return () => {
            if (socket) socket.disconnect();
        }
    }, []);

    const getDeadLines = (data) => {
        if (socket) socket.emit('getdeadlines', data);
    }

    const handleOpen = () => {
        // console.log(socket);
        if (socket && !socket.connected) socket.connect();
    }

    const handleClose = () => {
        if (socket && socket.connected) socket.disconnect();
    }


    return (
        <Socketcontext.Provider value={{socket, connected, deadlines, getDeadLines, handleClose, handleOpen}}>
            {isInitialized && children}
        </Socketcontext.Provider>
    );
}

export {SocketProvider, Socketcontext};