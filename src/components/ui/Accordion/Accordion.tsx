"use client";

import type { ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Whether one panel or several panels can be open at once. @default "single" */
  type?: "single" | "multiple";
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
}: AccordionProps) {
  const rootClassNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <BaseAccordion.Root
      className={rootClassNames}
      multiple={type === "multiple"}
      defaultValue={defaultValue}
    >
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          value={item.value}
          className={styles.item}
        >
          <BaseAccordion.Header className={styles.header}>
            <BaseAccordion.Trigger className={styles.trigger}>
              {item.title}
              <ChevronIcon className={styles.icon} />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={styles.panel}>
            <div className={styles.content}>{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
