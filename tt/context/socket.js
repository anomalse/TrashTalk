import * as React from 'react';
import{createContext} from 'react';
import socketio from "socket.io-client";
const SOCKET_URL  = "http://10.115.137.175:5000";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();