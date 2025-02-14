import React from 'react';
import { ReactNode } from 'react';

type ModuleProps = {
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
  noSpace?: boolean;
};

const Module = ({ children, className, noBorder, noSpace }: ModuleProps) => {
  return (

    <div className={`border-gray-200 dark:border-white ${className} ${noBorder ? '' : 'border'} ${noSpace ? '' : 'p-5 m-5'}`}>
      {children}
    </div>
  );
};

export default Module;
