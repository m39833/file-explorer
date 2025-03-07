"use client";

import {
  GalleryVerticalEnd,
  HardDrive,
  Home,
  LucideIcon,
  Star,
  Trash,
  Usb,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { Search } from "../search";
import { usePathStore } from "@/stores/path";

type SidebarItem = {
  label: string;
  icon: LucideIcon;
  // path: string;
};

const MAIN_ITEMS: SidebarItem[] = [
  // {
  //   label: "Home",
  //   icon: Home,
  // },
  {
    label: "Starred",
    icon: Star,
  },
  {
    label: "Trash",
    icon: Trash,
  },
];

export function AppSidebar() {
  const setPath = usePathStore((state) => state.setPath);
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton className="" size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Files</span>
            <span className="">v0.0.1</span>
          </div>
        </SidebarMenuButton>
        <Search />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton
                onClick={() => {
                  const home = usePathStore.getState().home ?? "";
                  setPath(home.split("/"));
                  setOpenMobile(false);
                }}
              >
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
              {MAIN_ITEMS.map((item, i) => (
                <SidebarMenuButton key={i} onClick={() => setOpenMobile(false)}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Locations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton>
                <HardDrive />
                <span>Root</span>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Usb />
                <span>USB Drive</span>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
