import React, { useState, useEffect } from 'react';

// This function checks if a given URL is a valid YouTube URL
export const isValidYouTubeUrl = (url) => {
  const pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return pattern.test(url);
};

const YouTubeVideoInfo = ({ url, onValidUrlChange }) => {
  // videoInfo state is used to store the information about the YouTube video
  const [videoInfo, setVideoInfo] = useState(null);

  // Extract the video ID from the URL
  const videoId = url.split('v=')[1];

  // Check if the URL is a valid YouTube URL
  const isValidUrl = isValidYouTubeUrl(url);

  // This useEffect hook runs whenever the URL, videoId, onValidUrlChange, or isValidUrl changes
  useEffect(() => {
    // If the URL is valid, fetch the video information
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
          // If the video information is valid, update the videoInfo state and call the callback function with true
          if (data && data.title && data.author_name) {
            setVideoInfo(data);
            onValidUrlChange(true);
          } else {
            throw new Error('Invalid YouTube video');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // If there's an error, call the callback function with false
          onValidUrlChange(false);
        });
    } else {
      // If the URL is not valid, call the callback function with false
      onValidUrlChange(false);
    }
  }, [url, videoId, onValidUrlChange, isValidUrl]);

  // If the URL is not valid, display a message
  if (!isValidUrl) {
    return <div>The entered URL is not a valid YouTube URL or does not point to a valid YouTube video.</div>;
  }

  // If the video information is not yet loaded, display a loading message
  if (!videoInfo) {
    return <div>Loading...</div>;
  }

  // If the video information is loaded, display the video title, an iframe with the video, and the author name
  return (
    <div>
      {/* <h2>{videoInfo.title}</h2> */}
      <iframe 
          width="560" 
          height="315" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title={videoInfo.title} 
          style={{border: "0"}} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
      ></iframe>
      {/* <p>{videoInfo.author_name}</p> */}
    </div>
  );
};

export default YouTubeVideoInfo;