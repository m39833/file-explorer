#[tauri::command]
pub async fn open(path: &str) -> Result<(), ()> {
    if let Err(e) = open::that(path) {
        eprintln!("{:?}", e);
    }

    Ok(())
}
