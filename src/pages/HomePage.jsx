import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import YoutubeVideoCard from '../components/YoutubeVideoCard';
import { useTrackedSources, useUserSources, useStopTracking } from '../hooks/useTrackedSources'; // Import useStopTracking
import Addsource from '../components/AddsourceComponent';
import StopTrackingButton from '../components/StopTrackingButton';

const HomePage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();
  
  useEffect(() => {
    getNotes()
  }, [])

  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  let api = useAxios()
  
  let getNotes = async() => {
    
    let response = await api.get('/api/notes/')
    // let response = await api.get('/api/sources/')

    if (response.status === 200) {
      setNotes(response.data)
    }
  };

  return (
    <>
        <h1>Home</h1>

        <ul>
          {notes.map(note => (
            <li key={ note.id } > { note.body } </li> 
            //  <li key={ note.url } > { note.type } </li> 
          ))}
        </ul>

        <Addsource  sources={sources} setSourcesUpdateNeeded={setSourcesUpdateNeeded} setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} />

        <h2>Tracked Sources</h2>
        <div>
          {sources.map((source, index) => {
            const userSource = userSources.find(us => us.source === source.id);
            // console.log(userSource.id)
            return (
              <div key={index}>
                <YoutubeVideoCard url={source.url} />
                {/* {userSource && <button onClick={() => stopTracking(source.url, userSource.id)}>Stop Tracking</button>} */}
                {userSource && <StopTrackingButton sourceUrl={source.url} userSourceId={userSource.id} setSourcesUpdateNeeded={setSourcesUpdateNeeded} />}
              </div>
            );
          })}
        </div>
    </>
  )
}

export default HomePage
