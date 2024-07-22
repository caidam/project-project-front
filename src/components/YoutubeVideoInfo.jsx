import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export const isValidYouTubeUrl = (url) => {
  const pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return pattern.test(url);
};

const YouTubeVideoInfo = ({ url, onValidUrlChange }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [errorShown, setErrorShown] = useState(false); // State to track if an error toast has been shown

  const videoId = url.split('v=')[1];
  const isValidUrl = isValidYouTubeUrl(url);

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('URL:', url);
    console.log('isValidUrl:', isValidUrl);

    const handleError = (message) => {
      if (!errorShown) { // Check if an error toast has already been shown
        onValidUrlChange(false);
        toast.error(message);
        setErrorShown(true); // Set errorShown to true after showing the toast
        console.log('Error shown:', message);
      }
    };

    if (isValidUrl) {
      fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Invalid YouTube URL');
          }
        })
        .then(data => {
          if (data && data.title && data.author_name) {
            setVideoInfo(data);
            onValidUrlChange(true);
            setErrorShown(false); // Reset errorShown when a valid response is received
            console.log('Valid video info received:', data);
          } else {
            throw new Error('Invalid YouTube video');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          handleError('Invalid YouTube URL or video');
        });
    } else {
      handleError('The entered URL is not a valid YouTube URL');
    }
  }, [url]); // Simplified dependencies

  if (!videoInfo) {
    return null;
  }

  return (
    <div className='m-8 flex justify-center items-center flex-col w-full'>
        <iframe 
            width="335" 
            height="190" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            title={videoInfo.title} 
            style={{border: "0"}} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
        ></iframe>
    </div>
  );
};

export default YouTubeVideoInfo;
