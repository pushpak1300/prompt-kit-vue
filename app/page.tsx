"use client";
import { useState } from "react";
import { PromptInputChatGPT } from "./examples/chatgpt";
import { PromptInputMistralAI } from "./examples/mistralai";
import { PromptInputDeepSeek } from "./examples/deepseek";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/prompt-kit/code-block";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TextMorph } from "@/components/ui/text-morph";

const TABS = [
  {
    label: "ChatGPT",
    component: PromptInputChatGPT,
    img: "/openai_logo.png",
  },
  {
    label: "Mistral AI",
    component: PromptInputMistralAI,
    img: "/mistral_logo.png",
  },
  {
    label: "DeepSeek",
    component: PromptInputDeepSeek,
    img: "/deepseek_logo.png",
  },
];

const CODE_SAMPLE = `import {
  PromptInput,
  PromptInputTextarea,
  PromptInputAction,
} from '@/components/ui/prompt-input';

function PromptInputBasic() {
  return (
    <PromptInput>
      <PromptInputTextarea placeholder='Ask prompt-kit' />
      <PromptInputActions>
        <PromptInputAction tooltip='Upload File'>
          <Button>Upload File</Button>
        </PromptInputAction>
        <PromptInputAction tooltip='Send'>
          <Button>Send</Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}`;

export default function Home() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [hasCopyLabel, setHasCopyLabel] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(CODE_SAMPLE);
    setHasCopyLabel(true);

    setTimeout(() => {
      setHasCopyLabel(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-12 flex flex-col items-start">
        <div className="mb-5 flex flex-col gap-1 text-pretty">
          <p className="text-4xl font-[450] tracking-tight text-black">
            Core building block for AI apps.
          </p>
          <p className="text-4xl font-[450] tracking-tight text-zinc-500">
            High-quality, accessible, and customizable components for AI
            interfaces.
          </p>
        </div>
        <Link
          href="/docs"
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-base text-white"
        >
          Get Started
        </Link>
      </div>
      <div className="mb-40 flex flex-col gap-10">
        <div className="flex min-h-[350px] w-full items-end rounded border border-zinc-200 p-8">
          {activeTab.component()}
        </div>
        <div className="flex flex-row justify-center gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex flex-row items-center gap-1 rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
                activeTab === tab && "bg-zinc-100 text-zinc-900"
              )}
            >
              <img src={tab.img} alt={tab.label} className="h-auto w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <CodeBlock className="relative mb-20 rounded" language="tsx">
        <CodeBlockGroup className="absolute right-4 top-4">
          <button
            onClick={onCopy}
            className="rounded-[2px] border px-2 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <TextMorph>{hasCopyLabel ? "Copied" : "Copy"}</TextMorph>
          </button>
        </CodeBlockGroup>
        <CodeBlockCode code={CODE_SAMPLE} />
      </CodeBlock>
    </div>
  );
}
