import type { ReactNode } from 'react';

interface FrameProps {
  children?: ReactNode;
  className?: string;
}

function Frame({ children, className }: FrameProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[480px] min-w-[480px] bg-[#f5f5f5] flex flex-row justify-center items-center box-border ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
}

export { Frame };
