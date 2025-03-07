use std::{fs, os::unix::fs::MetadataExt, path::PathBuf};

use serde::Serialize;

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum DirectoryItem {
    #[serde(rename_all(serialize = "camelCase"))]
    Directory {
        id: u64,
        name: String,
        size: u64,
        path: PathBuf,
        is_symlink: bool,
    },
    #[serde(rename_all(serialize = "camelCase"))]
    File {
        id: u64,
        name: String,
        size: u64,
        path: PathBuf,
        is_symlink: bool,
    },
}

#[tauri::command]
pub fn ls(path: &str) -> Vec<DirectoryItem> {
    let dir = fs::read_dir(path).unwrap();
    dir.filter_map(|entry| {
        entry.ok().and_then(|e| {
            let name = e
                .path()
                .file_name()
                .and_then(|n| n.to_str().map(String::from))?;

            let metadata = e.metadata().ok()?;
            let file_type = e.file_type().ok()?;
            let id = metadata.ino();
            let path = fs::canonicalize(e.path()).ok()?;
            let is_symlink = file_type.is_symlink();

            if file_type.is_dir() {
                Some(DirectoryItem::Directory {
                    id,
                    name,
                    size: metadata.size(),
                    path,
                    is_symlink,
                })
            } else {
                Some(DirectoryItem::File {
                    id,
                    name,
                    size: metadata.size(),
                    path,
                    is_symlink,
                })
            }
        })
    })
    .collect::<Vec<_>>()
}
