"use client"

import { cn } from "@/lib/utils"
import React, { createContext, useContext, useEffect, useState } from "react"
import { CodeToHastOptions, codeToHtml, type ShikiTransformer } from "shiki"

type CodeBlockContextType = {
  language: string
  theme?: string
  transformers?: ShikiTransformer[]
  options?: CodeToHastOptions
}
const CodeBlockContext = createContext<CodeBlockContextType | undefined>(
  undefined
)
function useCodeBlock() {
  const context = useContext(CodeBlockContext)
  if (!context) {
    throw new Error("useCodeBlock must be used within a CodeBlock")
  }
  return context
}
async function highlightCode(
  code: string,
  lang: string,
  theme?: string,
  transformers?: ShikiTransformer[],
  options?: CodeToHastOptions
) {
  return await codeToHtml(code, {
    lang,
    theme: theme || "github-light",
    transformers,
    ...options,
  })
}
type CodeBlockProps = {
  language?: string
  theme?: string
  transformers?: ShikiTransformer[]
  options?: CodeToHastOptions
  children: React.ReactNode
  className?: string
}
function CodeBlock({
  language = "tsx",
  theme,
  transformers,
  options,
  children,
  className,
}: CodeBlockProps) {
  return (
    <CodeBlockContext.Provider
      value={{ language, theme, transformers, options }}
    >
      <div
        className={cn(
          "not-prose flex w-full flex-col gap-2 border p-4 text-sm",
          "border-border bg-card text-card-foreground rounded",
          className
        )}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  )
}
type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>
function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  )
}
type CodeBlockCodeProps = {
  code: string
  className?: string
}
function CodeBlockCode({ code, className, ...props }: CodeBlockCodeProps) {
  const { language, theme, transformers, options } = useCodeBlock()
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")
  useEffect(() => {
    async function highlight() {
      const highlighted = await highlightCode(
        code,
        language,
        theme,
        transformers,
        options
      )
      setHighlightedHtml(highlighted)
    }
    highlight()
  }, [code, language, theme, transformers, options])
  return (
    <div
      className={cn("w-full overflow-x-auto", className)}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  )
}
async function ServerCodeBlockCode({
  code,
  className,
  ...props
}: CodeBlockCodeProps) {
  const { language, theme, transformers, options } = useCodeBlock()
  const highlightedHtml = await highlightCode(
    code,
    language,
    theme,
    transformers,
    options
  )
  return (
    <div
      className={cn("w-full overflow-x-auto", className)}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  )
}
export { CodeBlock, CodeBlockGroup, CodeBlockCode, ServerCodeBlockCode }
