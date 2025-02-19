'use client';

import { codeToHtml } from '@/lib/shiki';
import { useEffect, useState } from 'react';

export function CodeRenderer({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    codeToHtml({ code, lang }).then(setHtml);
  }, [code, lang]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function ServerCodeRenderer({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const html = await codeToHtml({ code, lang });
  return html;
}
