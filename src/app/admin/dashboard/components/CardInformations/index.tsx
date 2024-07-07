import { CardInformationsProps } from "./types";

export const CardInformations = ({
  icon,
  quantity,
  title,
}: CardInformationsProps) => {
  return (
    <div className="w-full rounded-lg px-4 py-10 bg-white shadow-md">
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="font-bold text-xl block">{quantity}</span>
          <span className="text-lg block">{title}</span>
        </div>

        <div>{icon}</div>
      </div>
    </div>
  );
};
