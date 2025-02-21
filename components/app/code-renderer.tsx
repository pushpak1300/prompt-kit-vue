import { codeToHtml } from "@/lib/shiki"

export async function CodeRenderer({
  code,
  lang,
}: {
  code: string
  lang: string
}) {
  const html = await codeToHtml({ code, lang })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
