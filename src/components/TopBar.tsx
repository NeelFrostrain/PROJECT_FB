import {
  ArrowLeft,
  ArrowRight,
  Minus,
  RefreshCcw,
  Search,
  Square,
  X,
} from "lucide-react";
import TopBarBTN from "./ui/TopBarBTN";
import { cn } from "../lib/utils/cn";
import useWebStore from "../store/useWebStore";
import React, { useEffect, useRef, useState } from "react";

const TopBar = () => {
  const { canGoBack, canGoForward, webActions, isLoading, currentURL } =
    useWebStore();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(currentURL);
  }, [currentURL]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || !webActions) return;

    let input = inputValue.trim();

    // Check if it looks like a domain (contains a dot but no spaces)
    if (/^[^\s]+\.[^\s]+$/.test(input)) {
      // Add protocol if missing
      if (!/^https?:\/\//.test(input)) {
        input = `https://${input}`;
      }
    } else {
      // Treat as search query
      input = `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
    }

    webActions.navigate(input);
    inputRef.current?.blur();
  };

  // Send Close Minimize And Maximize Msgs
  const TitlebarBTNMsgSend = (btnName: "minimize" | "maximize" | "close") => {
    switch (btnName) {
      case "minimize":
        window.electron.sendTitleBarBTNMsg("titlebar-btn-msg", "minimize");
        break;
      case "maximize":
        window.electron.sendTitleBarBTNMsg("titlebar-btn-msg", "maximize");
        break;
      case "close":
        window.electron.sendTitleBarBTNMsg("titlebar-btn-msg", "close");
        break;
    }
  };

  return (
    <div className="w-full h-11 text-white drag flex justify-start items-center flex-row px-2.5">
      <div className="w-[120px] mt-1.5 flex justify-start items-center">
        LEFT
      </div>
      <div className="flex justify-center items-center mx-auto gap-1 mt-1.5">
        <div className="flex justify-center items-center gap-3">
          <TopBarBTN
            className={cn(
              "active:bg-[#0a0a0a] active:scale-100",
              canGoBack ? "opacity-100" : "opacity-50"
            )}
            onClick={() => {
              if (!isLoading) {
                webActions.goBack();
              }
            }}
          >
            <ArrowLeft size={17} strokeWidth={2} />
          </TopBarBTN>
          <TopBarBTN
            className={cn(
              "active:bg-[#0a0a0a] active:scale-100",
              canGoForward ? "opacity-100" : "opacity-50"
            )}
            onClick={() => {
              if (!isLoading) {
                webActions.goForward();
              }
            }}
          >
            <ArrowRight size={17} strokeWidth={2} />
          </TopBarBTN>
        </div>
        <form
          onSubmit={onSearchSubmit}
          className="w-full max-w-[300px] min-w-[300px] mx-3 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-white/60 flex justify-between items-center"
        >
          <Search size={17} strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            className="nodrag w-full outline-none border-none h-full text-sm scale-95 font-normal"
            placeholder="Search Anything Or Enter Url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <TopBarBTN
          className={cn(
            "active:bg-[#0a0a0a] opacity-100",
            isLoading ? "spin-reverse opacity-55" : ""
          )}
          onClick={() => {
            if (!isLoading) {
              webActions.reload();
            }
          }}
        >
          <RefreshCcw size={16} strokeWidth={2} />
        </TopBarBTN>
      </div>
      <div className="w-[120px] h-full flex justify-end items-center mt-1.5 gap-3.5">
        <TopBarBTN onClick={() => TitlebarBTNMsgSend("minimize")}>
          <Minus color="#fff" size={"15"} strokeWidth={2} />
        </TopBarBTN>
        <TopBarBTN onClick={() => TitlebarBTNMsgSend("maximize")}>
          <Square color="#fff" size={"14"} strokeWidth={2} />
        </TopBarBTN>
        <TopBarBTN
          onClick={() => TitlebarBTNMsgSend("close")}
          className="active:bg-red-600 active:opacity-95"
        >
          <X color="#fff" size={"15"} strokeWidth={1.5} />
        </TopBarBTN>
      </div>
    </div>
  );
};

export default TopBar;
