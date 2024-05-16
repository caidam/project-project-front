// import React, { useState, useEffect, useContext } from 'react'
// import AuthContext from '../context/AuthContext';
// import useAxios from '../utils/useAxios';
// import YoutubeVideoCard from '../components/YoutubeVideoCard';
// import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';
// import Addsource from '../components/AddsourceComponent';

// const HomePage = () => {

//   const [sources, setSources] = useTrackedSources(); 
//   const [userSources, setUserSources] = useUserSources();
  
//     useEffect(() => {
//       getNotes()
//     }, [])

//   let [notes, setNotes] = useState([]);
//   let { authTokens, logoutUser } = useContext(AuthContext);

//   let api = useAxios()
  
//   let getNotes = async() => {
    
//     let response = await api.get('/api/notes/')
//     // let response = await api.get('/api/sources/')

//     if (response.status === 200) {
//       setNotes(response.data)
//     }
//   };

//   return (
//     <>
//         <h2>Home</h2>

//         <ul>
//           {notes.map(note => (
//             <li key={ note.id } > { note.body } </li> 
//             //  <li key={ note.url } > { note.type } </li> 
//           ))}
//         </ul>

//         <Addsource  sources={sources} setSources={setSources} />

//         <h3>Tracked Sources</h3>
//         <div>
//           {sources.map((source, index) => (
//             <YoutubeVideoCard key={index} url={source.url} />
//           ))}
//         </div>
//     </>
//   )
// }

// export default HomePage



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
  // const stopTracking = useStopTracking(); // Initialize stopTracking function
  
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

  const handleStopTrackingSuccess = (userSource) => {
    // Remove the source from the sources state
    setSources(sources.filter(source => source.id !== userSource.id));
    // Display a success message
    alert('Stopped tracking the source successfully!');
  };

  return (
    <>
        <h2>Home</h2>

        <ul>
          {notes.map(note => (
            <li key={ note.id } > { note.body } </li> 
            //  <li key={ note.url } > { note.type } </li> 
          ))}
        </ul>

        <Addsource  sources={sources} setSourcesUpdateNeeded={setSourcesUpdateNeeded} setUserSourcesUpdateNeeded={setUserSourcesUpdateNeeded} />

        <h3>Tracked Sources</h3>
        <div>
          {sources.map((source, index) => {
            const userSource = userSources.find(us => us.source === source.id);
            // console.log(userSource.id)
            return (
              <div key={index}>
                <YoutubeVideoCard url={source.url} />
                {/* {userSource && <button onClick={() => stopTracking(source.url, userSource.id)}>Stop Tracking</button>} */}
                {userSource && <StopTrackingButton sourceUrl={source.url} userSourceId={userSource.id} onSuccess={() => () => handleStopTrackingSuccess(userSource.id)} />}
              </div>
            );
          })}
        </div>
    </>
  )
}

export default HomePage
