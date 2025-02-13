// import React from 'react'

// function LandingPage() {
//   return (
//     <div>
//       <h1>Landing Page</h1>
//     </div>
//   )
// }

// export default LandingPage

import React, { useState, useEffect } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import YouTubeVideoInfoStatic from '@/components/YoutubeVideoInfoStatic';
import DiscoveryDialogComponentPublic from '@/components/DiscoveryDialogComponentPublic';
import { DJ_BASE_URL } from '@/config';

const LandingPage = () => {
  const [url, setUrl] = useState(null);
  // const { user } = useContext(AuthContext);
  // const userId = user ? user.user_id : null;

  useEffect(() => {
    let apiUrl = `${DJ_BASE_URL}/api/random_url/`;
    // if (userId) {
    //   apiUrl += `?user_id=${userId}`;
    // }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUrl(data.url));
  }, []);

  return (
    <>
      <NavbarPublic>
        <DiscoveryDialogComponentPublic>
          {url && <YouTubeVideoInfoStatic url={url} />}
        </DiscoveryDialogComponentPublic>
      </NavbarPublic>
    </>
  )
}

export default LandingPage;
