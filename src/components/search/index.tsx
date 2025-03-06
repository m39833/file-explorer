"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="border-input gap-4 bg-opacity-75"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex items-center">
          <SearchIcon className="text-muted-foreground mr-2 h-6 w-6" />
          <span className="text-muted-foreground font-light">
            Search for something...
          </span>
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList></CommandList>
      </CommandDialog>
    </>
  );
}
