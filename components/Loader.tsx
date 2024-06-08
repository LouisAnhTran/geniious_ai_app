import React from "react";
import { FaAirbnb } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-cente ">
      <FaAirbnb className="w-20 h-20 relative animate-spin text-fuchsia-500">
      </FaAirbnb>
      <p className="text-sm text-muted-foreground">
        Genius is thinking...
      </p>
    </div>
  );
};

export default Loader;
