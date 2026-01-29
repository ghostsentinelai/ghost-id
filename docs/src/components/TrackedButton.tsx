"use client";

import Link from "next/link";

interface TrackedButtonProps {
  href: string;
  eventName: string;
  eventProps: Record<string, string | number | boolean>;
  className: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export function TrackedButton({ href, eventName, eventProps, className, children, target, rel }: TrackedButtonProps) {
  return (
    <Link
      href={href}
      className="w-full sm:w-auto"
      data-ghost-id-event={eventName}
      data-ghost-id-prop-location={eventProps.location}
      target={target}
      rel={rel}
    >
      <button className={className}>{children}</button>
    </Link>
  );
}
