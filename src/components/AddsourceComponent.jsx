import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Importing AuthContext for user authentication
import useAxios from '../utils/useAxios'; // Custom hook for making Axios requests
import YouTubeVideoInfo from './YoutubeVideoInfo'; // Component to display YouTube video info
// import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';

// Define the Addsource component
const Addsource = ({ sources, setSourcesUpdateNeeded, setUserSourcesUpdateNeeded }) => {
    // Define state variables
    const [inputValue, setInputValue] = useState(''); // State to hold the input value from the form
    const [youtubeUrl, setYoutubeUrl] = useState(''); // State to hold the YouTube URL
    const [isValidUrl, setIsValidUrl] = useState(false); // State to check if the URL is valid
    const { authTokens, logoutUser } = useContext(AuthContext); // Context to hold the authentication tokens and logout function
    const api = useAxios(); // Custom hook to make API calls
    // const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Function to set the YouTube URL
    const handleSetUrl = () => {
        setYoutubeUrl(inputValue);
        // console.log('isValidUrl in Addsource:', isValidUrl); // Log the state
    };

    // Function to handle adding a new source
    const handleAddSource = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let url = formData.get('source_url');

        // Normalize the URL
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        urlObj.searchParams.delete('v');
        url = urlObj.toString().toLowerCase() + (videoId ? `?v=${videoId}` : '');
    
        // Log the normalized URL
        // console.log('Normalized URL:', url);
    
        // Check if the URL is already being tracked
        if (sources.some(source => source.url === url)) {
            alert('This URL is already being tracked.');
            return;
        }
    
        try {
            const response = await api.post('/api/usersources/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // if (response.status === 201) {
            if ([200, 201].includes(response.status)) {
                const newSource = {
                    id: response.data.id,
                    url: formData.get('source_url'),
                };
                // setSources([newSource, ...sources]);
                setSourcesUpdateNeeded(true);
                setUserSourcesUpdateNeeded(true);
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Error adding source:', error);
        }
    };

    // Render the component
    return (
        <>
            <h3>Add a new source</h3>
            <form onSubmit={handleAddSource}>
                <label htmlFor="url">URL:</label>
                <input type="text" id="url" name="source_url" required onChange={(e) => {
                                                                setInputValue(e.target.value);
                                                                setIsValidUrl(false); // Reset the isValidUrl state to false
                                                                setYoutubeUrl('');
                                                                setIsSubmitted(false);
                                                            }}
                />
                {!isValidUrl && <button type="button" onClick={handleSetUrl}>Check URL</button>}
                {isValidUrl && <button type="submit" disabled={isSubmitted}>Add Source</button>}
            </form>
            {isSubmitted && <p>Source added successfully!</p>}
            {youtubeUrl && <YouTubeVideoInfo url={youtubeUrl} onValidUrlChange={setIsValidUrl} />}
            {/* <h2>Tracked Sources</h2>
            <ul>
                {sources.map((source) => (
                    <li key={source.url}>{source.url}</li>
                ))}
            </ul> */}
        </>
    );
};

export default Addsource;

