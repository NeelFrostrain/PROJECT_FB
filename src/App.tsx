import { WebView } from "./components";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden z-10 flex flex-col">
      <TopBar />
      <div className="flex-1 flex justify-center items-center text-white">
        <WebView />
      </div>
    </div>
  );
};

export default App;
