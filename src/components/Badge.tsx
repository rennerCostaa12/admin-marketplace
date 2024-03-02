import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color: string;
}

export const Badge = ({ children, color }: BadgeProps) => {
  const switchColor = () => {
    switch (color) {
      case "awaiting-preview":
        return "green";
    }
  };

  return (
    <div
      className={`bg-[${switchColor()}] rounded-md text-center p-2 font-bold text-white`}
    >
      {children}
    </div>
  );
};
