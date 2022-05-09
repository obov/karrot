import { cls } from "@libs/client/utils";
import { ReactElement } from "react";

interface ButtonProps {
  large?: boolean;
  text: string;
  loading?: boolean;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        "h-8 w-full py-1 bg-orange-500 hover:bg-orange-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm ",
        loading ? "cursor-not-allowed" : ""
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
