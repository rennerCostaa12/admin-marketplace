export type StatusColor = "success" | "warning" | "error" | "info";

export interface InputMessageProps {
  text: string;
  color?: StatusColor;
}
