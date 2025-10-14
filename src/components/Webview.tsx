/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import useWebStore from "../store/useWebStore";
import LoadingScreen from "./LoadingScreen";

const Webview = () => {
  const webRef = useRef<Electron.WebviewTag | null>(null);
  const {
    isLoading,
    setIsLoading,
    setCurrentURL,
    setCanGoBack,
    setCanGoForward,
    setWebActions,
  } = useWebStore();

  const webView = webRef.current;

  // ✅ Inject webview actions once
  useEffect(() => {
    const webView = webRef.current;
    if (!webView) return;

    setWebActions({
      goBack: () => webView.canGoBack() && webView.goBack(),
      goForward: () => webView.canGoForward() && webView.goForward(),
      reload: () => webView.reload(),
      navigate: (url: string) => webView.loadURL(url),
    });
  }, [setWebActions]);

  // ✅ Track navigation (URL + back/forward state)
  useEffect(() => {
    const webView = webRef.current;
    if (!webView) return;

    const updateNavState = () => {
      setCurrentURL(webView.getURL());
      setCanGoBack(webView.canGoBack());
      setCanGoForward(webView.canGoForward());
    };

    webView.addEventListener("did-navigate", updateNavState);
    webView.addEventListener("did-navigate-in-page", updateNavState);

    return () => {
      webView.removeEventListener("did-navigate", updateNavState);
      webView.removeEventListener("did-navigate-in-page", updateNavState);
    };
  }, [setCurrentURL, setCanGoBack, setCanGoForward]);

  // ✅ Track loading state
  useEffect(() => {
    if (!webView) return;

    const handleDidStartLoading = () => setIsLoading(true);
    const handleDidStopLoading = () => {
      setIsLoading(false);
      webView.insertCSS(`
      ::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
      }
    `);
    };

    webView.addEventListener("did-start-loading", handleDidStartLoading);
    webView.addEventListener("did-stop-loading", handleDidStopLoading);

    return () => {
      webView.removeEventListener("did-start-loading", handleDidStartLoading);
      webView.removeEventListener("did-stop-loading", handleDidStopLoading);
    };
  }, [setIsLoading, webView]);

  // ✅ Error Handler
  useEffect(() => {
    if (!webView) return;

    const handleFailLoad = () => {
      webView.loadURL("https://duckduckgo.com");
    };

    webView.addEventListener("did-fail-load", handleFailLoad);

    return () => {
      webView.removeEventListener("did-fail-load", handleFailLoad);
    };
  }, [setIsLoading, webView]);

  // Set Current Page Data
  useEffect(() => {
    const webview = webRef.current;
    if (!webview) return;

    const handleTitle = (event: any) => {
      const title = event.title;
      if (!title) return;
      window.electron.send("update-title", title);
    };

    webview.addEventListener("page-title-updated", handleTitle);

    return () => {
      webview.removeEventListener("page-title-updated", handleTitle);
    };
  }, []);

  return (
    <div className="w-[98%] h-[98%] lg:w-[99%] relative overflow-hidden">
      <webview
        ref={webRef}
        src="https://duckduckgo.com"
        className="w-full h-full z-0 overflow-auto rounded-xl"
      />
      {isLoading ? <LoadingScreen /> : ""}
    </div>
  );
};

export default Webview;
