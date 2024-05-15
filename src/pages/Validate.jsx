import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import YouTubeVideoInfo from '../components/YoutubeVideoInfo';

const Addsource = () => {
    const [sources, setSources] = useState([]);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const { authTokens, logoutUser } = useContext(AuthContext);
    const api = useAxios();

    useEffect(() => {
        getTrackedSources();
    }, []);

    const getTrackedSources = async () => {
        try {
            const response = await api.get('/api/sources/');
            if (response.status === 200) {
                setSources(response.data);
            }
        } catch (error) {
            console.error('Error fetching tracked sources:', error);
        }
    };

    const handleAddSource = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await api.post('/api/usersources/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                // Add the newly added source to the sources list
                const newSource = {
                    id: response.data.id, // Assuming the response includes the new source ID
                    url: formData.get('source_url'), // Get the URL from the form data
                };
                setSources([...sources, newSource]); // Add the new source to the sources list
            }
        } catch (error) {
            console.error('Error adding source:', error);
        }
    };

    const handleValidate = () => {
        setIsValidated(true);
    };

    return (
        <>
            <h2>Add Source</h2>
            <form onSubmit={handleAddSource}>
                <label htmlFor="url">URL:</label>
                <input type="text" id="url" name="source_url" required onChange={(e) => setYoutubeUrl(e.target.value)} />
                <button type="button" onClick={handleValidate}>Validate</button>
                <button type="submit" disabled={!isValidated}>Add Source</button>
            </form>
            {youtubeUrl && <YouTubeVideoInfo url={youtubeUrl} />}
            <h2>Tracked Sources</h2>
            <ul>
                {sources.map((source) => (
                    <li key={source.id}>{source.url}</li>
                ))}
            </ul>
        </>
    );
};

export default Addsource;