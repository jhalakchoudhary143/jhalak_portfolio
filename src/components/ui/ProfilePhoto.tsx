"use client";

import Image from "next/image";
import { useState } from "react";
import { PROFILE_IMAGE_PRIMARY, PROFILE_IMAGE_FALLBACK } from "@/lib/constants";

type ProfilePhotoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: { box: "h-24 w-24 sm:h-28 sm:w-28", px: 112 },
  md: { box: "h-32 w-32 sm:h-40 sm:w-40", px: 160 },
  lg: { box: "h-40 w-40 sm:h-48 sm:w-48", px: 192 },
};

export function ProfilePhoto({ size = "md", className = "", priority = false }: ProfilePhotoProps) {
  const [src, setSrc] = useState(PROFILE_IMAGE_PRIMARY);
  const [failed, setFailed] = useState(false);
  const dim = sizes[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-3xl border-2 border-violet-500/40 bg-violet-500/10 shadow-xl ring-2 ring-white/10 ${dim.box} ${className}`}
    >
      {!failed ? (
        <Image
          src={src}
          alt="Jhalak Choudhary"
          width={dim.px}
          height={dim.px}
          className="h-full w-full object-cover"
          priority={priority}
          sizes={`${dim.px}px`}
          onError={() => {
            if (src === PROFILE_IMAGE_PRIMARY) {
              setSrc(PROFILE_IMAGE_FALLBACK);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6B46C1] to-[#4299E1] text-3xl font-bold text-white sm:text-4xl">
          JC
        </div>
      )}
    </div>
  );
}
