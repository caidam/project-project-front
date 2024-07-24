import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Importing AuthContext for user authentication
import useAxios from '../utils/useAxios'; // Custom hook for making Axios requests
import YouTubeVideoInfo from './YoutubeVideoInfo'; // Component to display YouTube video info
import { Search, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast, Toaster } from 'sonner';

// Define the Addsource component
const Addsource = ({ sources, setSourcesUpdateNeeded, setUserSourcesUpdateNeeded }) => {

    useEffect(() => {
        console.log('Sources in Addsource:', sources);
      }, [sources]);

    // Define state variables
    const [inputValue, setInputValue] = useState(''); // State to hold the input value from the form
    const [youtubeUrl, setYoutubeUrl] = useState(''); // State to hold the YouTube URL
    const [isValidUrl, setIsValidUrl] = useState(false); // State to check if the URL is valid
    const { authTokens, logoutUser } = useContext(AuthContext); // Context to hold the authentication tokens and logout function
    const api = useAxios(); // Custom hook to make API calls
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Function to set the YouTube URL
    const handleSetUrl = () => {
        setYoutubeUrl(inputValue);
    };

    // Function to clean the URL
    const cleanUrl = (url) => {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get('v');
            return `https://www.youtube.com/watch?v=${videoId}`;
        } catch (error) {
            toast.error('Invalid URL');
            return null;
        }
    };

    // Function to handle adding a new source
    const handleAddSource = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let url = formData.get('source_url');

        // Clean the URL
        url = cleanUrl(url);
        if (!url) return;

        // Log the cleaned URL
        console.log('Cleaned URL:', url);

        // Check if the URL is already being tracked
        const isTracked = sources.some(source => source.url.toLowerCase() === url.toLowerCase());

        if (isTracked) {
            toast.info('This video is already being tracked');
            console.log('already tracked');
            return;
        }

        // Use toast.promise to handle the promise
        toast.promise(
            api.post('/api/usersources/', { source_url: url }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            {
                loading: 'Loading...',
                success: (response) => {
                    const newSource = {
                        id: response.data.id,
                        url: url,
                    };
                    setSourcesUpdateNeeded(true);
                    setUserSourcesUpdateNeeded(true);
                    setIsSubmitted(true);
                    return `The video has been added`;
                },
                error: 'Error adding source',
            }
        );
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
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsValidUrl(false); // Reset the isValidUrl state to false
                            setYoutubeUrl('');
                            setIsSubmitted(false);
                        }}
                    />
                </div>

                {/* {isSubmitted && <p>Source added successfully!</p>} */}

                <div className="flex justify-center items-center w-full">
                    {youtubeUrl && <YouTubeVideoInfo url={youtubeUrl} onValidUrlChange={setIsValidUrl} />}
                </div>

                {!isValidUrl && <Button 
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
        </>
    );
};

export default Addsource;
