#[tauri::command]
pub fn open(path: &str) {
    if let Err(e) = open::that(path) {
        eprintln!("{:?}", e);
    }
}
