import { createContext, useContext, useEffect, useState } from "react";

type SearchDialogContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const context = createContext<SearchDialogContext>({
  open: false,
  setOpen: () => {},
});

export const useSearchDialog = () => useContext(context);

export function SearchDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <context.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </context.Provider>
  );
}
