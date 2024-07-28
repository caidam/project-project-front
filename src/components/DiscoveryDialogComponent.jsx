import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DiscoveryDialogComponent(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4" style={{ paddingBottom: '30vh' }}>
      <p className="mb-4 text-lg text-muted-foreground pb-20">
        Click below to discover random music videos tracked by other users
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-md text-primary py-3 px-6">Discover</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-7xl h-auto p-4 flex flex-col items-center justify-center">
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DiscoveryDialogComponent;
