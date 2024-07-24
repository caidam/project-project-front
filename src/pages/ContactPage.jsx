import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useCombinedSourcesInfo } from '@/hooks/useCombinedSourcesInfo'
import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';
import Navbar from '@/components/Navbar';
import DiscoveryComponent from '@/components/DiscoveryComponent';
import { YouTubeVideoInfoStatic } from '@/components/YoutubeVideoInfo';


const ContactPage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

  const [combinedSourcesInfo] = useCombinedSourcesInfo(sources, userSources);

  return (
    <>
      <Navbar>

          <DiscoveryComponent>
            {/* <div>
              <h1>Combined Sources Information</h1>
              <pre>{JSON.stringify(combinedSourcesInfo, null, 2)}</pre>
            </div> */}
            <YouTubeVideoInfoStatic url='https://www.youtube.com/watch?v=Vswhnqjoow4' />
          </DiscoveryComponent>
      </Navbar>

    </>
  )
}

export default ContactPage