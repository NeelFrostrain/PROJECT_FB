import { useEffect, useRef } from "react";
import useWebStore from "../store/useWebStore";
import LoadingScreen from "./LoadingScreen";

const Webview = () => {
  const webRef = useRef<Electron.WebviewTag | null>(null);
  const { isLoading, setIsLoading, currentURL, setCurrentURL } = useWebStore();

  useEffect(() => {
    const webView = webRef.current;
    if (!webView) return;

    const handleDidNavigate = () => setCurrentURL(webView.getURL());
    const handleDidNavigateInPage = () => setCurrentURL(webView.getURL());
    const handleDidStartLoading = () => setIsLoading(true);
    const handleDidStopLoading = () => setIsLoading(false);

    webView.addEventListener("did-navigate", handleDidNavigate);
    webView.addEventListener("did-navigate-in-page", handleDidNavigateInPage);
    webView.addEventListener("did-start-loading", handleDidStartLoading);
    webView.addEventListener("did-stop-loading", handleDidStopLoading);

    return () => {
      webView.removeEventListener("did-navigate", handleDidNavigate);
      webView.removeEventListener(
        "did-navigate-in-page",
        handleDidNavigateInPage
      );
      webView.removeEventListener("did-start-loading", handleDidStartLoading);
      webView.removeEventListener("did-stop-loading", handleDidStopLoading);
    };
  }, [setIsLoading, setCurrentURL]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <webview
        ref={webRef}
        src="https://google.com"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <p className="text-white">{currentURL}</p>
      {isLoading ? <LoadingScreen /> : ""}
    </div>
  );
};

export default Webview;
