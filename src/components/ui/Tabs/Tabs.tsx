"use client";

import type { ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import styles from "./Tabs.module.css";

export interface TabsItem {
  value: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabsItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const rootClassNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <BaseTabs.Root
      className={rootClassNames}
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={(next) => onValueChange?.(next as string)}
    >
      <BaseTabs.List className={styles.list}>
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            className={styles.tab}
          >
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel
          key={item.value}
          value={item.value}
          className={styles.panel}
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
