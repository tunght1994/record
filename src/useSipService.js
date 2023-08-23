// // useSipService.js
// import { useEffect, useRef, useState } from 'react';
// import { UserAgent, Inviter, SessionState } from 'sip.js';


// function useSipService(config) {
//   const [sipStatus, setSipStatus] = useState('Disconnected');
//   const [mediaElement, setMediaElement] = useState(null);
//   const [currentSession, setCurrentSession] = useState(null);
//   const remoteStream = useRef(new MediaStream());

//   const userAgent = useRef(new UserAgent(config));


//   const bindEventListeners = () => {
//     // Handle registration status changes
//     userAgent.current.stateChange.addListener((state) => {
//       if (state === userAgent.current.Started) {
//         setSipStatus('Registered');
//       } else if (state === userAgent.current.Stopped) {
//         setSipStatus('Unregistered');
//       }
//     });

//     // Handle WebSocket disconnections
//     userAgent.current.transport.onDisconnect = (error) => {
//       console.error('WebSocket disconnected:', error);
//       // You can add custom handling here, e.g., attempt to reconnect
//     };
//   };

//   useEffect(() => {
//     bindEventListeners();
//     userAgent.current.start();

//     return () => {
//       userAgent.current.stop();
//     };
//   }, []);

//   const setMedia = (element) => {
//     setMediaElement(element);
//   };

//   const setupRemoteMedia = (session) => {
//     session.sessionDescriptionHandler.peerConnection.getReceivers().forEach((receiver) => {
//       if (receiver.track) {
//         remoteStream.current.addTrack(receiver.track);
//       }
//     });

//     if (mediaElement) {
//       mediaElement.srcObject = remoteStream.current;
//       mediaElement.play();
//     }
//   };

//   const cleanupMedia = () => {
//     if (mediaElement) {
//       mediaElement.srcObject = null;
//       mediaElement.pause();
//     }
//   };

//   const makeOutgoingCall = (destinationUri) => {
//     const inviter = new Inviter(destinationUri, userAgent.current);

//     inviter.invite().then((session) => {
//       setCurrentSession(session);

//       session.stateChange.on((state) => {
//         if (state === SessionState.Established) {
//           // Call is established; set up remote media
//           setupRemoteMedia(session);
//         } else if (state === SessionState.Terminated) {
//           // Call is terminated; clean up media
//           cleanupMedia();
//         }
//       });
//     });
//   };

//   return {
//     sipStatus,
//     setMedia,
//     makeOutgoingCall,
//   };
// }

// export default useSipService;
