"use client"

import { cn } from "@/lib/utils"
import React from "react"
import { Markdown } from "./markdown"

export type MessageProps = {
  children: React.ReactNode
  className?: string
}

type MessageContentProps = {
  children: React.ReactNode
  markdown?: boolean
  className?: string
}

type MessageActionsProps = {
  children: React.ReactNode
  className?: string
}

const Message = ({ children, className }: MessageProps) => (
  <div className={cn("flex gap-3", className)}>{children}</div>
)

const MessageAvatar = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn("shrink-0", className)}>{children}</div>

const MessageContent = ({
  children,
  markdown = false,
  className,
}: MessageContentProps) => {
  const classNames = cn(
    "rounded-lg p-2 text-foreground",
    "bg-secondary",
    "prose break-words whitespace-normal",
    className
  )

  return markdown ? (
    <Markdown className={classNames}>{children as string}</Markdown>
  ) : (
    <div className={classNames}>{children}</div>
  )
}

const MessageActions = ({ children, className }: MessageActionsProps) => (
  <div
    className={cn("text-muted-foreground flex items-center gap-2", className)}
  >
    {children}
  </div>
)

export { Message, MessageAvatar, MessageContent, MessageActions }
