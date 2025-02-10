import React from 'react';
import { ReactNode } from 'react';

type ModuleProps = {
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
};

const Module = ({ children, className, noBorder }: ModuleProps) => {
  return (

    <div className={`m-5 p-5 rounded-3xl shadow-lg ${className} ${noBorder ? '' : 'border'}`}>
      {children}
    </div>
  );
};

export default Module;
