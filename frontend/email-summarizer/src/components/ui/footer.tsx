"use client";

import * as React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="relative h-[30px] w-[30px] px-5">
        <Image
          alt="Nylas Logo"
          src="/nylas-logo.svg"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="mt-auto font-light pb-0.5">Powered by Nylas</span>
    </footer>
  );
}
