'use client';
import { cloneElement, useState } from 'react';

type CardComponentProps = {
  children: React.ReactElement;
  hasReTrigger?: boolean;
};

export default function CardComponent({
  children,
  hasReTrigger,
}: CardComponentProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(Date.now());

  const reTrigger = () => {
    setReTriggerKey(Date.now());
  };

  return (
    <div className='relative -mx-6 flex items-start justify-center border-y border-neutral-200 bg-white px-6 py-12 dark:border-white/10 dark:bg-neutral-900 sm:mx-0 sm:rounded-lg sm:border sm:px-8'>
      {hasReTrigger && (
        <button
          className={`absolute right-4 top-3 cursor-pointer`}
          onClick={reTrigger}
        >
          r
        </button>
      )}
      {hasReTrigger ? cloneElement(children, { key: reTriggerKey }) : children}
    </div>
  );
}
