import { ReactNode } from 'react';

const containerStyle = {
  width: '1140px',
  margin: '0 auto',
};

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return <div style={containerStyle}>{children}</div>;
};
