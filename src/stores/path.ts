import { homeDir } from "@tauri-apps/api/path";
import { create } from "zustand";

type PathStoreState = {
  path: string[];
  loading: boolean;
};

type PathStoreActions = {
  setPath: (
    newPath:
      | PathStoreState["path"]
      | ((state: PathStoreState["path"]) => string[]),
  ) => void;
  init: () => Promise<void>;
  // append: (
  //   segment:
  //     | PathStoreState["path"]
  //     | ((state: PathStoreState["path"]) => string[]),
  // ) => void;
};

type PathStore = PathStoreState & PathStoreActions;

export const usePathStore = create<PathStore>()((set) => ({
  path: [],
  loading: true,
  setPath(segment) {
    set((state) => ({
      path: typeof segment === "function" ? segment(state.path) : segment,
    }));
  },
  init: async () => {
    const home = await homeDir().then((res) => res.split("/"));
    set(() => ({
      path: home,
      loading: false,
    }));
  },
}));
