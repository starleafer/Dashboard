import React from 'react';

import { ReactNode } from 'react';

const Module = ({ children }: { children: ReactNode }) => {
  return (
    <div className='border m-5 p-5 rounded-3xl shadow-lg '>
      {children}
    </div>
  );
};

export default Module;
