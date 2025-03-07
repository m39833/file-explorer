"use client";

import { usePathStore } from "@/stores/path";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { breadcrumbsFromPath } from "@/utils";

export function NavBreadcrumbs() {
  const path = usePathStore((state) => state.path);
  const setPath = usePathStore((state) => state.setPath);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { segment: string; path: string }[]
  >([]);

  useEffect(() => {
    setBreadcrumbs(breadcrumbsFromPath(path.join("/")));
  }, [path]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.slice(1).map(({ segment, path }, i, a) => (
          <React.Fragment key={`${i}-${segment}`}>
            <BreadcrumbItem>
              {i === a.length - 1 ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  onClick={() => setPath(path.split("/"))}
                >
                  <button>{segment}</button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {i < a.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
