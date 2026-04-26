from pathlib import Path

# Chemin racine de ton projet
ROOT = Path(r"D:\ServOMorph\Bot ou pas Bot")

ignore_dirs = {
    ".git", ".idea", ".vscode", "__pycache__", ".pytest_cache",
    ".mypy_cache", ".ruff_cache", "node_modules", "dist", "build",
    ".venv", "venv", "env"
}
ignore_files = {"ARCHITECTURE.md"}

def desc(p: Path) -> str:
    ext = p.suffix.lower()
    n = p.name.lower()

    if n in {"readme.md", "readme"}:
        return "Documentation principale du projet."
    if n.startswith("license"):
        return "Licence du projet."
    if n.startswith("makefile"):
        return "Règles de build et d’automatisation."
    if n in {"requirements.txt", "pyproject.toml", "poetry.lock", "pipfile", "pipfile.lock"}:
        return "Dépendances et configuration Python."
    if n in {"package.json", "package-lock.json", "pnpm-lock.yaml", "yarn.lock"}:
        return "Dépendances et scripts JavaScript/TypeScript."
    if n in {"dockerfile", "compose.yml", "docker-compose.yml"}:
        return "Configuration Docker."
    if ext == ".py":
        return "Script Python."
    if ext == ".md":
        return "Document Markdown."
    if ext in {".json", ".yaml", ".yml", ".toml", ".ini", ".cfg"}:
        return "Fichier de configuration."
    if ext in {".js", ".ts", ".tsx", ".jsx"}:
        return "Source JavaScript/TypeScript."
    if ext in {".cpp", ".h", ".hpp", ".cs", ".java", ".go", ".rs"}:
        return "Source de code."
    if ext in {".sh", ".bat", ".ps1"}:
        return "Script d’automatisation."
    if ext in {".html", ".css", ".scss"}:
        return "Fichier web/interface."
    return "Fichier du projet."

def walk(p: Path, level: int = 0) -> list[str]:
    lines: list[str] = []
    for x in sorted(p.iterdir(), key=lambda z: (z.is_file(), z.name.lower())):
        if x.name in ignore_files:
            continue
        if x.is_dir():
            if x.name in ignore_dirs or x.name.startswith("."):
                continue
            lines.append("  " * level + f"- {x.name}/")
            lines.extend(walk(x, level + 1))
        else:
            lines.append("  " * level + f"- {x.name} — {desc(x)}")
    return lines

def main() -> None:
    content: list[str] = [
        "# Architecture du projet",
        "",
        f"Racine : `{ROOT}`",
        "",
        "## Arborescence",
    ]
    content += walk(ROOT)
    content += [
        "",
        "## Notes",
        "- Les dossiers techniques courants sont ignorés pour garder le fichier lisible.",
        "- Ce fichier est généré automatiquement.",
    ]

    archi_file = ROOT / "ARCHITECTURE.md"
    archi_file.write_text("\n".join(content) + "\n", encoding="utf-8")
    print(f"Fichier généré : {archi_file}")

if __name__ == "__main__":
    main()