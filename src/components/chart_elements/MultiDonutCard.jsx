import React from 'react'
import {
PolarAngleAxis,
RadialBar,
RadialBarChart,
} from "recharts"

import {
Card,
CardContent,
} from "@/components/ui/card"
import {
ChartContainer,
} from "@/components/ui/chart"

function MultiDonutCard({ data }) {

  // Calculate overall average daily views
  const validValues = data.filter(record => record['daily_views'] !== null).map(record => record['daily_views']);
  const overallAvg = Math.floor(validValues.reduce((acc, views) => acc + views, 0) / validValues.length);
  //
  const DailyViews = data[data.length - 1]?.['daily_views'] || 0;
  const formattedDailyViews = new Intl.NumberFormat('en-US').format(DailyViews);
  const formattedDailyViewsWithSpaces = DailyViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const WeeklyViews = data[data.length - 1]?.['weekly_views'] || 0;

  return (
    <div>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-5"
        >
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Daily / Average</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  {DailyViews}/{overallAvg}
                  <span className="text-sm font-normal text-muted-foreground">
                    views
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Daily / Average</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  73/120
                  <span className="text-sm font-normal text-muted-foreground">
                    likes
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Daily / Average</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  8/12
                  <span className="text-sm font-normal text-muted-foreground">
                    comments
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-2))",
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={[
                  {
                    activity: "stand",
                    value: (DailyViews / overallAvg) * 100,
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "exercise",
                    value: (65 / 60) * 100,
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "views",
                    value: ((WeeklyViews - DailyViews) / WeeklyViews) * 100,
                    fill: "var(--color-move)",
                  },
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}

export default MultiDonutCard