import { useState, useEffect } from 'react';

const fetchVideoInfo = async (url) => {
  const videoId = url.split('v=')[1];
  const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`);
  if (!response.ok) {
    throw new Error('Invalid YouTube URL');
  }
  return response.json();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useCombinedSourcesInfo = (sources) => {
  const [combinedSourcesInfo, setCombinedSourcesInfo] = useState([]);

  useEffect(() => {
    const fetchAndCombineRecords = async () => {
      if (!sources || sources.length === 0) return;

      const newRecords = await Promise.all(sources.map(async (source) => {
        try {
          const videoInfo = await fetchVideoInfo(source.url);
          const formattedDate = formatDate(source.date_added);
          return { ...source, ...videoInfo, date_added: formattedDate };
        } catch (error) {
          console.error(`Error fetching video info for URL: ${source.url}`, error);
          return source;
        }
      }));
      setCombinedSourcesInfo(newRecords);
    };

    fetchAndCombineRecords();
  }, [sources]);

  return [combinedSourcesInfo];
};
