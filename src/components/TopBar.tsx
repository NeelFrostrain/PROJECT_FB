import {
  ArrowLeft,
  ArrowRight,
  Copy,
  CopyCheck,
  Minus,
  PanelRightClose,
  PanelRightOpen,
  RefreshCcw,
  Search,
  Square,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import TopBarBTN from "./ui/TopBarBTN";
import { cn } from "../lib/utils/cn";
import useWebStore from "../store/useWebStore";
import useSidebarStore from "../store/useSidebarStore";

const TopBar = () => {
  const { canGoBack, canGoForward, webActions, isLoading, currentURL } =
    useWebStore();

  const { isOpen, setIsOpen } = useSidebarStore();

  const [inputValue, setInputValue] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Keep search bar synced with current URL
  useEffect(() => {
    setInputValue(currentURL);
  }, [currentURL]);

  // ✅ Search / Navigate handler
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || !webActions) return;

    let input = inputValue.trim();

    if (/^[^\s]+\.[^\s]+$/.test(input)) {
      if (!/^https?:\/\//.test(input)) {
        input = `https://${input}`;
      }
    } else {
      input = `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
    }

    webActions.navigate(input);
    inputRef.current?.blur();
  };

  // ✅ Window control buttons
  const sendTitlebarAction = (action: "minimize" | "maximize" | "close") => {
    window.electron.sendTitleBarBTNMsg("titlebar-btn-msg", action);
  };

  const handleCopyBTN = () => {
    if (isCopied || !inputValue) return;

    navigator.clipboard.writeText(inputValue);
    setIsCopied(true);

    // Reset after 2 seconds (optional)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full h-11 text-white drag flex items-center px-2.5">
      {/* Sidebar Toggle */}
      <div className="w-[120px] mt-1.5 flex items-center">
        <TopBarBTN onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <PanelRightClose size={17} strokeWidth={2} />
          ) : (
            <PanelRightOpen size={17} strokeWidth={2} />
          )}
        </TopBarBTN>
      </div>

      {/* Navigation & Search */}
      <div className="flex items-center mx-auto gap-1 mt-1.5">
        <div className="flex items-center gap-3">
          <TopBarBTN
            className={cn(
              "active:bg-[#0a0a0a] active:scale-100",
              canGoBack ? "opacity-100" : "opacity-50"
            )}
            onClick={() => !isLoading && webActions.goBack()}
          >
            <ArrowLeft size={17} strokeWidth={2} />
          </TopBarBTN>

          <TopBarBTN
            className={cn(
              "active:bg-[#0a0a0a] active:scale-100",
              canGoForward ? "opacity-100" : "opacity-50"
            )}
            onClick={() => !isLoading && webActions.goForward()}
          >
            <ArrowRight size={17} strokeWidth={2} />
          </TopBarBTN>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:max-w-[400px] md:max-w-[300px] min-w-[300px] mx-3 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-white/60 flex items-center">
          <form
            onSubmit={onSearchSubmit}
            className="w-full flex justify-between items-center"
          >
            <div className="w-full flex justify-start items-center">
              <Search size={17} strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search Anything Or Enter URL"
                className="nodrag w-full outline-none border-none h-full text-sm scale-95 font-normal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </form>
          <button
            className="size-3.5 nodrag cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleCopyBTN();
            }}
          >
            {isCopied ? (
              <CopyCheck size={15} strokeWidth={2} />
            ) : (
              <Copy size={15} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Reload */}
        <TopBarBTN
          className={cn(
            "active:bg-[#0a0a0a] opacity-100",
            isLoading ? "spin-reverse opacity-55" : ""
          )}
          onClick={() => !isLoading && webActions.reload()}
        >
          <RefreshCcw size={16} strokeWidth={2} />
        </TopBarBTN>
      </div>

      {/* Window Controls */}
      <div className="w-[120px] h-full flex items-center justify-end mt-1.5 gap-3.5">
        <TopBarBTN onClick={() => sendTitlebarAction("minimize")}>
          <Minus color="#fff" size={15} strokeWidth={2} />
        </TopBarBTN>

        <TopBarBTN onClick={() => sendTitlebarAction("maximize")}>
          <Square color="#fff" size={14} strokeWidth={2} />
        </TopBarBTN>

        <TopBarBTN
          onClick={() => sendTitlebarAction("close")}
          className="active:bg-red-600 active:opacity-95"
        >
          <X color="#fff" size={15} strokeWidth={1.5} />
        </TopBarBTN>
      </div>
    </div>
  );
};

export default TopBar;
