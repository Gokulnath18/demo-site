"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

type AnchorButtonProps = Extract<ButtonProps, { as: "a" }>;
type LinkNavProps = Pick<
  ComponentProps<typeof Link>,
  "href" | "prefetch" | "replace" | "scroll"
>;

export type LinkButtonProps = Omit<AnchorButtonProps, "as" | "href"> &
  LinkNavProps;

// `Link`'s `legacyBehavior` clones its child to attach routing/prefetch
// props, and that clone requires a ref — which Next.js can't attach when the
// child element is created in a Server Component (it throws at runtime:
// "received a direct child that is either a Server Component..."). This
// wrapper exists purely so that `<Button as="a">` is created inside a
// Client Component's render instead of a Server Component page, satisfying
// that constraint. It adds no styling of its own — Button still owns the
// anchor element and its variant/size classes.
export function LinkButton({
  href,
  prefetch,
  replace,
  scroll,
  ...buttonProps
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      passHref
      legacyBehavior
    >
      <Button as="a" {...buttonProps} />
    </Link>
  );
}
