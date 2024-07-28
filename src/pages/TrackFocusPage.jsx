import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Charts } from '@/components/FocusStatsComponent';
import { useModeledData } from '@/hooks/useModeledData';
// import ChartWrapper from '@/components/chart_elements/ChartWrapper';
import { ChartWrapper, ChartGridLeft, ChartGridMiddle, ChartGridRight } from '@/components/chart_elements/ChartGrid';
import BarChartCard from '@/components/chart_elements/BarChartCard';
import LineChartCard from '@/components/chart_elements/LineChartCard';
import ProgressCard from '@/components/chart_elements/ProgressCard';
import MiniBarChart from '@/components/chart_elements/MiniBarChart';
import KpiBarCard from '@/components/chart_elements/KpiBarCard';
import MultiDonutCard from '@/components/chart_elements/MultiDonutCard';
import AreaChartCard from '@/components/chart_elements/AreaChartCard';

const TrackFocusPage = () => {
  const { source_id } = useParams();
  const [summaryData, setSummaryData, setSummaryDataUpdateNeeded] = useModeledData('/api/usersource_summary', source_id);
  const [statsData, setStatsData, setStatsDataUpdateNeeded] = useModeledData('/api/source_stats', source_id); 

  useEffect(() => {
    console.log('useModeledData in TrackFocusPage:', useModeledData);
  }, [useModeledData]);

  return (
    <div>
      <Navbar>
        <Charts />
        <div>
        {source_id && <p>source_id = {source_id}</p>}
        {summaryData && summaryData[0] && summaryData[0].youtube_channel_medium_thumbnail_url && (
          <img src={summaryData[0].youtube_channel_medium_thumbnail_url} alt="Channel Thumbnail" />
        )}
        {summaryData && summaryData[0] && summaryData[0].youtube_video_thumbnail_url && (
          <img src={summaryData[0].youtube_video_thumbnail_url} alt="Video Thumbnail" />
        )}
        {summaryData && summaryData.length > 0 && (
          <p>{JSON.stringify(summaryData, null, 2)}</p>
        )}
        {statsData && statsData.length > 0 && (
          <p>{JSON.stringify(statsData, null, 2)}</p>
        )}
        </div>

        <ChartWrapper>
          <ChartGridLeft>
            <LineChartCard/>
            <BarChartCard/>
          </ChartGridLeft>
          <ChartGridMiddle>
            <ProgressCard/>
            <MultiDonutCard/>
            <MiniBarChart/>
            <KpiBarCard/>
          </ChartGridMiddle>
          <ChartGridRight>
            <KpiBarCard/>
            <MultiDonutCard/>
            <AreaChartCard/>
          </ChartGridRight>
        </ChartWrapper>

      </Navbar>
    </div>
  );
}

export default TrackFocusPage;
