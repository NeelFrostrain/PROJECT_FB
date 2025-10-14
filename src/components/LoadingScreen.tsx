import { LoaderCircle } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center top-0 left-0 opacity-75 z-10">
      <div className="size-20 bg-black/55 rounded-md flex justify-center items-center">
        <LoaderCircle className=" animate-spin" />
      </div>
    </div>
  );
};

export default LoadingScreen;
