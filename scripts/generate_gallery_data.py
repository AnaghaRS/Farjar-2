import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROJECTS_DIR = ROOT / "assets" / "images" / "projects"
OUTPUT_JSON = ROOT / "data" / "gallery-images.json"
OUTPUT_JS = ROOT / "data" / "gallery-images.js"
WEB_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
LABEL_OVERRIDES = {
    "55 R_Bat": "55 R'Bat",
    "Smile Line": "smile",
}

# Project folders to omit from gallery data (still on disk / projects page if needed).
GALLERY_EXCLUDE_FOLDERS = frozenset({"VIAN CROISSANTS"})

# Order of projects in the gallery (folders under assets/images/projects).
# Folders not listed here are appended after, sorted by name.
GALLERY_FOLDER_ORDER = [
    "Watchesco",
    "Haffa",
    "55 R_Bat",
    "JELAL EFENDI RESTAURANT",
    "AL BALEED MUSUEM",
    "Muscafe",
    "Suwaiq",
    "Myriad 55",
    "Tea Town",
    "UR 20",
    "55 Azaiba",
    "55 Gardenes Mall",
    "CAIKA CAFE SALALA",
    "55 Mawaleh",
    "Sign",
    "Smile Line",
]


def _ordered_folders(folder_names: set[str]) -> list[str]:
    seen: set[str] = set()
    ordered: list[str] = []
    for name in GALLERY_FOLDER_ORDER:
        if name in folder_names and name not in seen:
            ordered.append(name)
            seen.add(name)
    rest = sorted((n for n in folder_names if n not in seen), key=str.lower)
    ordered.extend(rest)
    return ordered


def collect_gallery_data() -> dict:
    gallery_by_folder: dict[str, list[str]] = {}
    folder_paths = [p for p in PROJECTS_DIR.iterdir() if p.is_dir()]

    for folder in sorted(folder_paths, key=lambda p: p.name.lower()):
        if folder.name in GALLERY_EXCLUDE_FOLDERS:
            continue
        files = [
            file.name
            for file in sorted(folder.iterdir(), key=lambda p: p.name.lower())
            if file.is_file() and file.suffix.lower() in WEB_EXTENSIONS
        ]
        if files:
            gallery_by_folder[folder.name] = files

    ordered_keys = _ordered_folders(set(gallery_by_folder.keys()))
    gallery_by_folder_ordered = {k: gallery_by_folder[k] for k in ordered_keys}

    gallery_items: list[dict] = []
    for folder_name in ordered_keys:
        folder = PROJECTS_DIR / folder_name
        for filename in gallery_by_folder[folder_name]:
            file_path = folder / filename
            gallery_items.append(
                {
                    "folder": folder_name,
                    "file": filename,
                    "sizeBytes": file_path.stat().st_size,
                }
            )

    return {
        "labelOverrides": LABEL_OVERRIDES,
        "galleryByFolder": gallery_by_folder_ordered,
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
