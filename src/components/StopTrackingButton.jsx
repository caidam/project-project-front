import React from 'react';
import { useStopTracking } from '../hooks/useTrackedSources';

const StopTrackingButton = ({ sourceUrl, userSourceId, onSuccess }) => {
  const stopTracking = useStopTracking();

  const handleClick = async () => {
    try {
      await stopTracking(sourceUrl, userSourceId);
    } catch (error) {
      console.error('Error stopping tracking:', error);
    }
    onSuccess();
  };

  return <button onClick={handleClick}>Stop Tracking</button>;
};

export default StopTrackingButton;