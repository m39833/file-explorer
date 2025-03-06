import { z } from "zod";

export type TDirEntryDirectory = z.infer<typeof DirEntryDirectory>;
export const DirEntryDirectory = z.object({
  type: z.literal("directory"),
  id: z.number(),
  name: z.string(),
  // size: z.number().positive(),
  path: z.string(),
  isSymlink: z.boolean(),
});

export type TDirEntryFile = z.infer<typeof DirEntryFile>;
export const DirEntryFile = z.object({
  type: z.literal("file"),
  id: z.number(),
  name: z.string(),
  size: z.number(),
  path: z.string(),
  isSymlink: z.boolean(),
});

export type TDirEntry = z.infer<typeof DirEntry>;
export const DirEntry = z.discriminatedUnion("type", [
  DirEntryFile,
  DirEntryDirectory,
]);
