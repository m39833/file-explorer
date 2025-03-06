"use client";

import { FormEventHandler, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";

export function Form() {
  const [name, setName] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [ls, setLs] = useState<string[] | null>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    invoke<string>("greet", { name }).then(setContent);
    invoke<string[]>("ls", { name }).then(setLs);
  };

  return (
    <div className="w-full">
      <form
        className="max-w-3xl w-full mx-auto space-y-4"
        onSubmit={handleSubmit}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit">Submit</Button>
      </form>
      {content && <p>{content}</p>}
      {ls && <pre>{JSON.stringify(ls, null, 2)}</pre>}
    </div>
  );
}
