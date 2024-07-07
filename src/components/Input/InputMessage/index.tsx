import { InputMessageProps } from "./types";

import { useInputMessage } from "./useInputMessage";

export const InputMessage = ({ text, color }: InputMessageProps) => {
  const { switchStatusColor } = useInputMessage();

  return (
    <div className={`my-2 text-sm ${switchStatusColor(color)}`}>{text}</div>
  );
};
