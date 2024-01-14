"use-client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  error?: boolean;
  textError?: string | undefined | null;
}

export default function Input({
  label,
  error,
  textError,
  ...props
}: InputProps) {
  return (
    <div>
      {label && <div className="text-black mb-1">{label}</div>}
      <input
        {...props}
        className={`w-full min-w-56 border-2 rounded ${
          error ? "border-rose-500" : "border-black"
        } py-1 px-2 text-black`}
      />
      {error && textError && (
        <div className="w-full">
          <span className="w-full text-rose-500 text-sm text-right">
            {textError}
          </span>
        </div>
      )}
    </div>
  );
}
