import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Importing AuthContext for user authentication
import useAxios from '../utils/useAxios'; // Custom hook for making Axios requests
import YouTubeVideoInfo from './YoutubeVideoInfo'; // Component to display YouTube video info
import { Search, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast, Toaster } from 'sonner';

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

        // console.log(inputValue)
        // console.log(formData)

        // Normalize the URL
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get('v');
            urlObj.searchParams.delete('v');
            url = urlObj.toString().toLowerCase() + (videoId ? `?v=${videoId}` : '');
        } catch (error) {
            toast.error('Invalid URL');
            return;
        }
    
        // Log the normalized URL
        // console.log('Normalized URL:', url);
    
        // Check if the URL is already being tracked
        if (sources.some(source => source.url === url)) {
            toast.error('This URL is already being tracked.');
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
            toast.error('Error adding source');
        }
    };

    // Render the component
    return (
        <>

            <form onSubmit={handleAddSource}>

                <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        name="source_url"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 mx-auto max-w-sm my-4"
                        // required 
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsValidUrl(false); // Reset the isValidUrl state to false
                            setYoutubeUrl('');
                            setIsSubmitted(false);
                        }}
                        />
                </div>
                

            
            {isSubmitted && <p>Source added successfully!</p>}

            <div className="flex justify-center items-center w-full">
            {youtubeUrl && <YouTubeVideoInfo url={youtubeUrl} onValidUrlChange={setIsValidUrl} />}
            </div>

            {!isValidUrl && <Button 
                                // className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] my-8" 
                                className="mx-auto w-full max-w-sm"
                                type="button" 
                                onClick={handleSetUrl}
                                >
                                Check URL
                            </Button>}
            {isValidUrl && <Button 
                                className="mx-auto w-full max-w-sm" 
                                type="submit" 
                                disabled={isSubmitted}
                                >
                                Add Source
                            </Button>}
            
            </form>


            {/* <Toaster richColors closeButton /> */}

             {/* dont delete for now */}

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

