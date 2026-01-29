import Image from "next/image";
import { useEffect, useState } from "react";
import { useWhiteLabel } from "../hooks/useIsWhiteLabel";
import { Skeleton } from "./ui/skeleton";

export function GhostIdLogo({ width = 32, height = 32 }: { width?: number; height?: number }) {
  const { whiteLabelImage, isPending } = useWhiteLabel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPending) {
    return <Skeleton style={{ width, height }} />;
  }

  if (whiteLabelImage) {
    return <Image src={whiteLabelImage} alt="GHOST ID" width={width} height={height} />;
  }

  return null;

  // return (
  //   <Image
  //     src="/ghost-id.svg"
  //     alt="GHOST ID"
  //     width={width}
  //     height={height}
  //     className="invert dark:invert-0"
  //   />
  // );
}

export function GhostIdTextLogo({ width = 150, height = 34 }: { width?: number; height?: number }) {
  const { whiteLabelImage, isPending } = useWhiteLabel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPending) {
    return <Skeleton style={{ width, height }} />;
  }

  if (whiteLabelImage) {
    return <Image src={whiteLabelImage} alt="GHOST ID" width={width} height={height} />;
  }

  return <Image src="/ghost-id-text.svg" alt="GHOST ID" width={width} height={height} className="dark:invert-0 invert" />;
}
