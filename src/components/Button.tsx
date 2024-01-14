import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-deep-pink w-full rounded px-6 py-2 hover:bg-slate-600 ease-in duration-300 disabled:opacity-50"
      disabled={loading}
    >
      <span className="text-white font-bold">
        {loading ? "Aguarde..." : children}
      </span>
    </button>
  );
}
