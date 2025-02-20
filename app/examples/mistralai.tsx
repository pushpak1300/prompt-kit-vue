"use client";
import { useState } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputAction,
} from "@/components/prompt-kit/prompt-input";
import {
  ArrowRight,
  FileText,
  Globe,
  Image,
  Paperclip,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Arrow } from "@radix-ui/react-tooltip";

export function PromptInputMistralAI() {
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
      className="relative w-full max-w-(--breakpoint-md) rounded border border-[#e4e4e7] bg-background p-1.5 shadow-lg"
    >
      <PromptInputTextarea
        disableAutosize
        placeholder="Ask le Chat or @mention an agent"
        className="text-[16px] placeholder:text-[16px] md:text-[16px]"
      />
      <div className="flex h-10 items-center justify-between gap-2">
        <div className="flex gap-1 px-0.5 text-xs">
          <Button
            variant="ghost"
            className="flex h-8 w-auto items-center justify-center gap-1.5 rounded bg-transparent px-2 py-0 text-[12px] font-normal text-[hsl(240_5%_65%)] ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground [&_svg]:size-4"
          >
            <FileText />
            Canvas
          </Button>

          <Button
            variant="ghost"
            className="flex h-8 w-auto items-center justify-center gap-1.5 rounded bg-transparent px-2 py-0 text-[12px] font-normal text-[hsl(240_5%_65%)] ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground [&_svg]:size-4"
          >
            <Globe />
            Web search
          </Button>

          <Button
            variant="ghost"
            className="hidden h-8 w-auto items-center justify-center gap-1.5 rounded bg-transparent px-2 py-0 text-[12px] font-normal text-[hsl(240_5%_65%)] ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground [&_svg]:size-4 sm:flex"
          >
            <Image />
            Image generation
          </Button>
        </div>
        <div className="flex items-center gap-x-1">
          <PromptInputAction
            delayDuration={0}
            className="duration-0 data-[state=closed]:duration-0"
            tooltip={
              <div className="bg-black">
                <Arrow className="fill-black" />
                <span className="text-xs font-normal leading-none text-white">
                  Drop PDFs or images here
                </span>
              </div>
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg rounded-bl-xl p-1 text-xs font-semibold text-[hsl(240_4%_46%)] hover:bg-transparent hover:text-[hsl(240_6%_10%)] focus-visible:outline-black dark:focus-visible:outline-white [&_svg]:size-5"
            >
              <Paperclip />
            </Button>
          </PromptInputAction>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none bg-[hsl(26_100%_92%)] p-1 text-[hsl(25_95%_53%)] hover:bg-[hsl(26_100%_92%)] hover:text-[hsl(25_95%_53%)] [&_svg]:size-5 [&_svg]:text-[hsl(25_95%_53%)] [&_svg]:hover:text-[hsl(25_95%_53%)]"
            onClick={handleSubmit}
            disabled={!input}
          >
            {isLoading ? (
              <Square className="fill-[hsl(25_95%_53%)]" />
            ) : (
              <ArrowRight />
            )}
          </Button>
        </div>
      </div>
    </PromptInput>
  );
}
