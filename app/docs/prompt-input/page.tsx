import { PromptInputBasic } from './prompt-input-basic';
import { PromptInputWithActions } from './prompt-input-with-actions';
import ComponentCodePreview from '@/app/agi-kit/docs/components/component-code-preview';

export default function PromptInputPage() {
  return (
    <div className='flex flex-col gap-10'>
      <ComponentCodePreview
        component={<PromptInputBasic />}
        filePath='app/agi-kit/docs/prompt-input/prompt-input-basic.tsx'
        classNameComponentContainer='p-8'
      />
      <ComponentCodePreview
        component={<PromptInputWithActions />}
        filePath='app/agi-kit/docs/prompt-input/prompt-input-with-actions.tsx'
        classNameComponentContainer='p-8'
      />
    </div>
  );
}
