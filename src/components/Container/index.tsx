import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12">{children}</div>
    </div>
  );
};
