import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <React.Fragment>
      <div className={`w-full max-w-7xl px-5 md:px-10 mx-auto ${className || ''}`}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Wrapper;
