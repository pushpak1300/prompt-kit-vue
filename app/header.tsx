import { SidebarTrigger } from "@/components/ui/sidebar";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export type HeaderProps = {
  triggerViewportWidth: number;
};

export function Header({ triggerViewportWidth }: HeaderProps) {
  const isMobileView = useBreakpoint(triggerViewportWidth);

  return (
    <nav className="z-60 absolute left-0 top-0 w-full px-4 py-4 text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between text-zinc-900">
        <Link href="/" className="">
          <span className="font-[450] lowercase">prompt-kit</span>
        </Link>
        <div className="flex items-center gap-2">
          {isMobileView ? (
            <SidebarTrigger />
          ) : (
            <a
              className="inline-flex items-center gap-1 rounded-md bg-transparent border border-zinc-200 text-black px-2 py-1 text-sm transition-colors hover:bg-zinc-100"
              href="https://github.com/ibelick/prompt-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
