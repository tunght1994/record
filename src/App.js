import React, { useEffect, useRef, useState } from 'react';
import video from './images/video/cccd.mp4'

function VideoCallRecorder() {
  const [recording, setRecording] = useState(false);
  const localVideoRef = useRef(null);
  // const remoteVideoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);


  const startRecording = () => {
    if (!recording) {
      const stream = localVideoRef.current.captureStream();
      if (stream) {
        mediaRecorder.current = new MediaRecorder(stream);
  
        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const recordedBlob = new Blob(recordedChunks.current, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(recordedBlob);
          
          localVideoRef.current.src = videoUrl;
          setRecording(false);
        };
  
        mediaRecorder.current.start();
        setRecording(true);
      }
    }
  };
  

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
    }
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay={false} controls muted src={video} />
      </div>
      {/* <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div> */}
      <button onClick={startRecording} disabled={recording}>
        Bắt đầu ghi lại
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Dừng ghi lại
      </button>
    </div>
  );
}

export default VideoCallRecorder;
