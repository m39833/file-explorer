"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchDialogProvider } from "./search-dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SearchDialogProvider>{children}</SearchDialogProvider>
    </SidebarProvider>
  );
}
