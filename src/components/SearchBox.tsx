// import { useEffect } from "react";
import { cn } from "../lib/utils/cn";
import useSearchBoxStore from "../store/useSearchBoxStore";

const SearchBox = () => {
  const { isOpen } = useSearchBoxStore();

  // useEffect(() => {
  //   if (window.electronAPI) {
  //     window.electronAPI.onToggleSearchbox(() => {
  //       setIsOpen(!isOpen);
  //     });
  //     window.electronAPI.onCloseSearchbox(() => {
  //       setIsOpen(false);
  //     });
  //   }
  // }, [setIsOpen, isOpen]);

  return (
    <div
      className={cn(
        "absolute text-white top-0 left-0 w-screen h-screen bg-black/25 transition-all duration-150 ease-linear justify-center items-center",
        isOpen ? "flex" : "hidden"
      )}
    >
      SearchBox
    </div>
  );
};

export default SearchBox;
