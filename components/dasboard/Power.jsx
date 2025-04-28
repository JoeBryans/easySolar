import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const Power = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-600 cursor-pointer">
        click
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          calculate for the total power of all appliances
        </DialogTitle>

        <main>
          {/* <div>
                      {
                        <Input />
                      }
                  </div> */}
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default Power;
