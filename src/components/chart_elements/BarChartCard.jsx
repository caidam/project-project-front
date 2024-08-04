import React from 'react'
import {
    Bar,
    BarChart,
    Label,
    Rectangle,
    ReferenceLine,
    XAxis,
  } from "recharts"
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

function BarChartCard({ data }) {
  
  ///////////////////////////////
  const limit = 7; // Adjust this value to change the number of displayed records
  const fieldName = 'daily_views'; // Field name variable

  // Calculate overall average daily views
  const validValues = data.filter(record => record[fieldName] !== null).map(record => record[fieldName]);
  const overallAvg = validValues.reduce((acc, views) => acc + views, 0) / validValues.length;

  // Limit the data to the last specified number of records
  const limitedData = data.slice(-limit);

  // Calculate average daily views over the limited period and round to an integer
  const limitedAvgValue = Math.round(
    limitedData.reduce((acc, record) => acc + (record[fieldName] || 0), 0) / limitedData.length
  );

  // Transform the data to the format needed by the BarChart
  const chartData = limitedData.map(item => ({
    date: item.ref_day,
    steps: item[fieldName] || limitedAvgValue, // Ensure a value is present for the chart
  }));

  // Access the field value for the last record in the dataset
  const lastRecordValue = data[data.length - 1]?.[fieldName] || 0;

  return (
    <div>
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              {lastRecordValue}{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                daily views
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={chartData}
                // data={[
                //   {
                //     date: "2024-01-01",
                //     steps: 2000,
                //   },
                //   {
                //     date: "2024-01-02",
                //     steps: 2100,
                //   },
                //   {
                //     date: "2024-01-03",
                //     steps: 2200,
                //   },
                //   {
                //     date: "2024-01-04",
                //     steps: 1300,
                //   },
                //   {
                //     date: "2024-01-05",
                //     steps: 1400,
                //   },
                //   {
                //     date: "2024-01-06",
                //     steps: 2500,
                //   },
                //   {
                //     date: "2024-01-07",
                //     steps: 1600,
                //   },
                // ]}
              >
                <Bar
                  dataKey="steps"
                  fill="var(--color-steps)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={limitedAvgValue}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Average Daily Views"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value={limitedAvgValue}
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Over the past 7 days, you have walked{" "}
              <span className="font-medium text-foreground">53,305</span> steps.
            </CardDescription>
            <CardDescription>
              You need{" "}
              <span className="font-medium text-foreground">12,584</span> more
              steps to reach your goal.
            </CardDescription>
          </CardFooter>
        </Card>
    </div>
  )
}

export default BarChartCard