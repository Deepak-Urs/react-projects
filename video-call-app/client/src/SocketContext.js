// all the socket logic below

import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
    // all fns needed to make the videochat work
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})


    const myVideo = useRef()

    
    useEffect(() => {

        // used for get permission from users camera and mic
        navigator.mediaDevices.getUserMedia({ video: true, audio: true}) // a promise returned
        .then((currentStream) => {
            // set the currentStream
            setStream(currentStream)
            // the above setStream is not enough, we need to immediately populate our source stream to the iframe
            // and thus we use refs

            myVideo.current.srcObject = currentStream
        })

        // to get the id from the index.js
        socket.on('me', (id) => {
            setMe(id)
        })

        // details for the calluser socket at index.js 
        socket.on('calluser', ({from, name: callerName, signal}) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal})
        })
    }, [])

    const answerCall = () => {

    }

    const callUser = () => {

    }

    const leaverCall = () => {

    }
}