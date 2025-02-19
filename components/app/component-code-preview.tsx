import fs from 'fs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CodePreview from './code-preview';
import { CodeRenderer } from './code-renderer';
import ComponentPreview from './component-preview';

type ComponentCodePreview = {
  component: React.ReactElement;
  filePath: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
};

const extractCodeFromFilePath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return fileContent;
};

export default function ComponentCodePreview({
  component,
  filePath,
  hasReTrigger,
  classNameComponentContainer,
}: ComponentCodePreview) {
  const fileContent = extractCodeFromFilePath(`components/${filePath}.tsx`);

  return (
    <div className='not-prose relative z-0 flex items-center justify-between pb-3'>
      <Tabs defaultValue='preview' className='relative mr-auto w-full'>
        <TabsList>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='code'>Code</TabsTrigger>
        </TabsList>
        <TabsContent value='preview'>
          <ComponentPreview
            component={component}
            hasReTrigger={hasReTrigger}
            className={classNameComponentContainer}
          />
        </TabsContent>
        <TabsContent value='code'>
          <CodePreview code={fileContent}>
            <CodeRenderer code={fileContent} lang='tsx' />
          </CodePreview>
        </TabsContent>
      </Tabs>
    </div>
  );
}
