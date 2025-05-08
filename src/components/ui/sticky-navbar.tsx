import React from 'react';

export const StickyNavbar = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <nav className={className}>
      {children}
    </nav>
  );
};
