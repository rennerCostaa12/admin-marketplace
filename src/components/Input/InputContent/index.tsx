import { Input } from "@/components/ui/input";

import { InputContentProps } from "./types";

export const InputContent = ({ ...props }: InputContentProps) => {
  return (
    <div className="w-full">
      <Input {...props} />
    </div>
  );
};
