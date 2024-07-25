import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useCombinedSourcesInfo } from '@/hooks/useCombinedSourcesInfo'
import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';
import Navbar from '@/components/Navbar';
// import DiscoveryComponent from '@/components/DiscoveryComponent';
import YouTubeVideoInfoStatic from '@/components/YoutubeVideoInfoStatic';
import DiscoveryDialogComponent from '@/components/DiscoveryDialogComponent';

const DiscoveryPage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

  const [combinedSourcesInfo] = useCombinedSourcesInfo(sources, userSources);

  return (
    <>
      <Navbar>

          <DiscoveryDialogComponent>

            <YouTubeVideoInfoStatic url='https://www.youtube.com/watch?v=Vswhnqjoow4' />

          </DiscoveryDialogComponent>


      </Navbar>

    </>
  )
}

export default DiscoveryPage