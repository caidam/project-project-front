import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useCombinedSourcesInfo } from '@/hooks/useCombinedSourcesInfo'
import { useTrackedSources, useUserSources } from '../hooks/useTrackedSources';


const ContactPage = () => {

  const [sources, setSources, setSourcesUpdateNeeded] = useTrackedSources(); 
  const [userSources, setUserSources, setUserSourcesUpdateNeeded] = useUserSources();

  const [combinedSourcesInfo] = useCombinedSourcesInfo(sources, userSources);

  return (
    <>
        <h1>Contact</h1>
        <div>
      <h1>Combined Sources Information</h1>
      <pre>{JSON.stringify(combinedSourcesInfo, null, 2)}</pre>
    </div>

    </>
  )
}

export default ContactPage