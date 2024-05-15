import { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios'; // Custom hook for making Axios requests

export const useTrackedSources = () => {
  const [sources, setSources] = useState([]);
  const api = useAxios();

  useEffect(() => {
    const getTrackedSources = async () => {
      try {
        const response = await api.get('/api/sources/');
        if (response.status === 200) {
          // const sortedData = response.data.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
          setSources(response.data);
          // console.log(sortedData)
        }
      } catch (error) {
        console.error('Error fetching tracked sources:', error);
      }
    };

    getTrackedSources();
  }, []);

  return [sources, setSources];
};

export const useUserSources = () => {
  const [userSources, setUserSources] = useState([]);
  const api = useAxios();

  useEffect(() => {
    const getUserSources = async () => {
      try {
        const response = await api.get('/api/usersources/');
        if (response.status === 200) {
          // const sortedData = response.data.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
          setUserSources(response.data);
          // console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching tracked sources:', error);
      }
    };

    getUserSources();
  }, []);

  return [userSources, setUserSources];
};

// test stop tracking
export const useStopTracking = () => {
  const api = useAxios();

  const stopTracking = async (sourceUrl, userSourceId) => {
    try {
      const response = await api.post(`/api/usersources/${userSourceId}/stop_tracking/`, {
        source_url: sourceUrl
      });

      if (response.status === 200) {
        console.log('Successfully stopped tracking source:', response.data);
      }
    } catch (error) {
      console.error('Error stopping tracking source:', error);
    }
  };

  return stopTracking;
};
