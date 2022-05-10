import Link from "next/link";
import React from "react";
import { PageHandler } from "@libs/client/usePage";

export default function Pagenation(PageHandler: PageHandler) {
  return (
    <div className="fixed border-0 aspect-[3/8] border-transparent transition-colors bottom-44 right-5 shadow-xl bg-orange-400 rounded-full w-14 flex items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-2">
        <div
          onClick={PageHandler.decPage}
          className="hover:bg-orange-500 cursor-pointer rounded-full p-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="select-none text-xl ">{PageHandler.number + 1}</div>
        <div
          onClick={PageHandler.incPage}
          className="hover:bg-orange-500 cursor-pointer rounded-full p-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
