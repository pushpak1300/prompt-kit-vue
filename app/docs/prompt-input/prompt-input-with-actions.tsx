'use client';
import { useState } from 'react';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputAction,
  PromptInputActions,
} from '@/components/agi-kit/prompt-input';
import { ArrowUp, Square, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PromptInputWithActions() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInput('');
        setFiles([]);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className='w-full max-w-(--breakpoint-md)'
    >
      {files.length > 0 && (
        <div className='flex flex-wrap gap-2 pb-2'>
          {files.map((file, index) => (
            <div
              key={index}
              className='flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm'
            >
              <Paperclip className='size-4' />
              <span className='max-w-[120px] truncate'>{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className='rounded-full p-1 hover:bg-secondary/50'
              >
                <X className='size-4' />
              </button>
            </div>
          ))}
        </div>
      )}

      <PromptInputTextarea placeholder='Ask me anything...' />

      <PromptInputActions className='flex items-center justify-between gap-2 pt-2'>
        <PromptInputAction tooltip='Attach files'>
          <label
            htmlFor='file-upload'
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl hover:bg-secondary-foreground/10'
          >
            <input
              type='file'
              multiple
              onChange={handleFileChange}
              className='hidden'
              id='file-upload'
            />
            <Paperclip className='size-5 text-primary' />
          </label>
        </PromptInputAction>

        <PromptInputAction
          tooltip={isLoading ? 'Stop generation' : 'Send message'}
        >
          <Button
            variant='default'
            size='icon'
            className='h-8 w-8 rounded-full'
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Square className='size-5 fill-current' />
            ) : (
              <ArrowUp className='size-5' />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
