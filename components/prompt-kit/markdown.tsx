import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock, CodeBlockCode } from './code-block';

export type MarkdownProps = {
  children: string;
  className?: string;
  components?: Components;
};

const extractLanguage = (className?: string) => {
  if (!className) return 'plaintext';
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : 'plaintext';
};

const INITIAL_COMPONENTS: Partial<Components> = {
  code: ({ ...props }) => {
    const language = extractLanguage(props.className);

    return (
      <CodeBlock {...props} language={language}>
        <CodeBlockCode code={props.children as string} />
      </CodeBlock>
    );
  },
  pre: ({ children }) => <div className='not-prose'>{children}</div>,
};

export function Markdown({
  children,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className={className}
    >
      {children}
    </ReactMarkdown>
  );
}
