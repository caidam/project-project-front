import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
  } from "@/components/ui/tabs"
import Navbar from '@/components/Navbar'

export default function DiscoveryComponent() {
  return (

    <Navbar>
    <div className="w-full max-w-full">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            {/* Additional content */}
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className="mb-10">About this project</CardTitle>
              <CardDescription className="text-md">
                Music discovery by way of visual curation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                
                {/* {props.children} */}

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </Navbar>

  )
}