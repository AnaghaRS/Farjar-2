import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROJECTS_DIR = ROOT / "assets" / "images" / "projects"
OUTPUT_JSON = ROOT / "data" / "gallery-images.json"
OUTPUT_JS = ROOT / "data" / "gallery-images.js"
WEB_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
LABEL_OVERRIDES = {
    "55 R_Bat": "55 R'Bat",
}


def collect_gallery_data() -> dict:
    gallery_by_folder = {}
    gallery_items = []

    for folder in sorted((p for p in PROJECTS_DIR.iterdir() if p.is_dir()), key=lambda p: p.name.lower()):
        files = [
            file.name
            for file in sorted(folder.iterdir(), key=lambda p: p.name.lower())
            if file.is_file() and file.suffix.lower() in WEB_EXTENSIONS
        ]
        if files:
            gallery_by_folder[folder.name] = files
            for filename in files:
                file_path = folder / filename
                gallery_items.append(
                    {
                        "folder": folder.name,
                        "file": filename,
                        "sizeBytes": file_path.stat().st_size,
                    }
                )

    gallery_items.sort(key=lambda item: (item["sizeBytes"], item["folder"].lower(), item["file"].lower()))

    return {
        "labelOverrides": LABEL_OVERRIDES,
        "galleryByFolder": gallery_by_folder,
        "galleryItems": gallery_items,
    }


def main() -> None:
    data = collect_gallery_data()
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    json_text = json.dumps(data, indent=2)
    OUTPUT_JSON.write_text(json_text, encoding="utf-8")
    OUTPUT_JS.write_text("window.GALLERY_IMAGES_DATA = " + json_text + ";\n", encoding="utf-8")
    print(f"Updated {OUTPUT_JSON}")
    print(f"Updated {OUTPUT_JS}")
    print(f"Folders: {len(data['galleryByFolder'])}")
    print(f"Images: {len(data['galleryItems'])}")


if __name__ == "__main__":
    main()
