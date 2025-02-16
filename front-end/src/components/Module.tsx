import React from 'react';
import { ReactNode } from 'react';

type ModuleProps = {
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
  noSpace?: boolean;
};

const Module = ({ children, className, noSpace }: ModuleProps) => {
  return (

    <div className={`bg-light-component drop-shadow-md dark:bg-dark-component rounded-md ${className} ${noSpace ? '' : 'p-5 m-5'}`}>
      {children}
    </div>
  );
};

export default Module;
