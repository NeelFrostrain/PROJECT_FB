import React from "react";
import { cn } from "../../lib/utils/cn";

interface ITopBarBTN {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TopBarBTN: React.FC<ITopBarBTN> = ({ children, onClick, className }) => {
  return (
    <button
      className={cn(
        "size-7 nodrag opacity-50 cursor-pointer flex justify-center items-center rounded-md active:scale-90 active:bg-white/10 active:opacity-70 transition-all duration-100 ease-linear",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TopBarBTN;
