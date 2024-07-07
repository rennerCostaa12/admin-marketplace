import { StatusColor } from "./types";

export const useInputMessage = () => {
  const switchStatusColor = (color?: StatusColor) => {
    switch (color) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-orange-500";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-black";
    }
  };

  return {
    switchStatusColor,
  };
};
