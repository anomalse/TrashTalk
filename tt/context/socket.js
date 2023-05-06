
import React, { createContext, useState, useEffect } from "react";
import socketio from "socket.io-client";
// const SOCKET_URL  = "http://10.115.137.175:5000";
// //let SOCKET_URL =  'http://se.local:5000';

// create context
const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [socket, setSocket] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);


    const setSocketOnRequest= (ipAddress) =>{
    
        console.log("trying to connect");
        console.log(ipAddress)
        const SOCKET_URL  = `http://${ipAddress}:5000`;
        const t_socket = socketio.connect(SOCKET_URL, {
            reconnection: false
        });
        
        // client-side
        t_socket.on("connect_error", (err) => {
       console.log(err.message); // prints the message associated with the error
      
    });
    t_socket.on("connect", ()=>{
        setSocket( t_socket );
        setServerAddress(SOCKET_URL);

    })


    }

  return (
    // the Provider gives access to the context to its children
    <SocketContext.Provider value={[socket,setSocketOnRequest,serverAddress]}>
    {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider};