"use client";

import { usePathStore } from "@/stores/path";
import { useEffect, useLayoutEffect, useState, useTransition } from "react";
import { DirEntry, type TDirEntry } from "@/types/files";
import { invoke } from "@tauri-apps/api/core";
import { File, Folder, Link2 } from "lucide-react";
import { truncateMid } from "@/utils";
import { openPath } from "@tauri-apps/plugin-opener";

export default function Home() {
  const path = usePathStore((state) => state.path);
  const loading = usePathStore((state) => state.loading);
  const setPath = usePathStore((state) => state.setPath);
  const [dirContents, setDirContents] = useState<TDirEntry[]>([]);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    usePathStore.getState().init();
  }, []);

  useEffect(() => {
    if (loading) return;

    invoke("ls", { path: path.join("/") })
      .then(DirEntry.array().parse)
      .then((res) =>
        res.sort((a, b) => {
          if (a.type === "directory" && b.type !== "directory") return -1;
          if (a.type !== "directory" && b.type === "directory") return 1;

          return a.name.localeCompare(b.name);
        }),
      )
      .then(setDirContents);
  }, [path]);

  if (isPending) {
    return <div>loading..</div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 sm:gap-4 w-full">
      {dirContents.map((entry) => {
        return (
          <div key={entry.id} className="mx-auto">
            <div
              className="p-4 cursor-default select-none rounded-lg transition-colors hover:bg-muted w-42 max-h-44 flex flex-col items-center"
              onDoubleClick={() => {
                if (entry.type === "directory") {
                  setPath(entry.path.split("/"));
                } else if (entry.type === "file") {
                  // startTransition(() => {
                  // openPath(entry.path);
                  invoke("open", { path: entry.path });
                  // });
                }
              }}
            >
              {entry.type === "directory" && (
                <Folder className="size-24 stroke-1 shrink-0" />
              )}
              {entry.type === "file" && (
                <File className="size-24 shrink-0 stroke-1" />
              )}

              <span className="text-center break-all">
                {truncateMid(entry.name, 36, 6)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
