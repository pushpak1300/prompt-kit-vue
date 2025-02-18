"use client";
import { useState } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputAction,
  PromptInputActions,
} from "@/components/prompt-kit/prompt-input";
import { ArrowUp, Globe, Plus, Square, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Arrow } from "@radix-ui/react-tooltip";

export function PromptInputChatGPT() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  return (
    <PromptInput
      value={input}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full max-w-(--breakpoint-md) border border-input bg-background px-3 py-1 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]"
    >
      <PromptInputTextarea
        placeholder="Message ChatGPT"
        className="text-[18px] placeholder:text-[18px] md:text-[18px]"
      />
      <PromptInputActions className="mb-2 mt-0 flex h-auto items-center justify-between gap-2 sm:mt-5">
        <div className="flex items-center gap-x-1.5">
          <PromptInputAction
            delayDuration={0}
            className="duration-0 data-[state=closed]:duration-0"
            tooltip={
              <div className="bg-black">
                <Arrow className="fill-black" />
                <span className="text-xs font-semibold leading-none text-white">
                  Attach files
                </span>
              </div>
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border border-input bg-background p-1 text-xs font-semibold text-secondary-foreground hover:bg-secondary focus-visible:outline-black [&_svg]:size-[18px]"
            >
              <Plus />
            </Button>
          </PromptInputAction>
          <PromptInputAction
            delayDuration={0}
            className="duration-0 data-[state=closed]:duration-0"
            tooltip={
              <div className="bg-black">
                <Arrow className="fill-black" />
                <span className="text-xs font-semibold leading-none text-white">
                  Search the web
                </span>
              </div>
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-auto rounded-full border border-input bg-background p-2 text-xs font-semibold text-secondary-foreground hover:bg-secondary focus-visible:outline-black [&_svg]:size-[18px]"
            >
              <Globe />
              Search
            </Button>
          </PromptInputAction>
          <PromptInputAction
            delayDuration={0}
            className="duration-0 data-[state=closed]:duration-0"
            tooltip={
              <div className="bg-black">
                <Arrow className="fill-black" />
                <span className="text-xs font-semibold leading-none text-white">
                  View tools
                </span>
              </div>
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border border-input bg-background p-1 text-xs font-semibold text-secondary-foreground hover:bg-secondary focus-visible:outline-black [&_svg]:size-[18px]"
            >
              <Ellipsis />
            </Button>
          </PromptInputAction>
        </div>
        <PromptInputAction
          delayDuration={0}
          className="duration-0 data-[state=closed]:duration-0"
          tooltip={
            <div className="bg-black">
              <Arrow className="fill-black duration-0" />
              <span className="text-xs font-semibold leading-none text-white">
                {isLoading ? "Stop generation" : "Send message"}
              </span>
            </div>
          }
        >
          <Button
            variant="default"
            size="icon"
            className="h-9 w-9 rounded-full p-1 [&_svg]:size-6"
            onClick={handleSubmit}
          >
            {isLoading ? <Square /> : <ArrowUp />}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
