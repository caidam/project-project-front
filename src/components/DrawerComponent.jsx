import * as React from "react"
import { Minus, PlusCircle } from "lucide-react"
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
// import Addsource from "./AddsourceComponent"

export function DrawerComponent( props ) {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Video
                  </span>
        </Button>
        {/* <Button variant="outline">Open Drawer</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="m-4">Add A New Video</DrawerTitle>
            <DrawerDescription>Submit the YouTube URL of the video you want to track</DrawerDescription>
          </DrawerHeader>
          <div className="pt-0 p-4 pb-0">

            {/* <Addsource/> */}
            {props.children}

          </div>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button variant="outline">Exit</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
