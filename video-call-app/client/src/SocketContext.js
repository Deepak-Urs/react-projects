// all the socket logic below

import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io("https://v-c-a-be.onrender.com/");

const ContextProvider = ({ children }) => {
    // all fns needed to make the videochat work
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})

    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')


    const myVideo = useRef()
    const userVideo = useRef()
    const connctionRef = useRef()

    
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
        setCallAccepted(true)

        // helps with the video call connection and works like socket
        const peer = new Peer({ initiator: false , trickle: false, stream })
        
        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to: call.from})
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        peer.signal(call.signal)

        connctionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true , trickle: false, stream })
        
        peer.on('signal', (data) => {
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name})
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true)

            peer.signal(signal)     
        })

        connctionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true);
        connctionRef.current.destroy();
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext}