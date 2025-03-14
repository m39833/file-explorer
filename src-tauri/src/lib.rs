mod commands;

// #[tauri::command]
// fn greet(name: &str) -> String {
//     println!("rust code");
//     format!("Hello, {}, this is from the rust code", name)
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::ls, commands::open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
