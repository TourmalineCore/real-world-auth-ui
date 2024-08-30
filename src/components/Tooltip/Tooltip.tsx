import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

function Tooltip({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx('tooltip', className)}>
      {children}
    </div>
  );
}

export default Tooltip;
