# Session 2026-04-25 - Bot ou pas Bot - Optimisation AutoAntigravity

## Context
Improvement of the AUTO_CLICK tool.

## Key Learnings
1. DPI Awareness: On Windows, use `ctypes.windll.shcore.SetProcessDpiAwareness(1)` to fix coordinate mismatch between Tkinter and screenshots.
2. PyAutoGUI Detection: Use `grayscale=True` and `confidence=0.7` for more robust image matching across different rendering states.
3. Statistics Persistence: Implemented a buffered JSON storage in `stats.py` with thread-safe lock and `WM_DELETE_WINDOW` flush for high-frequency event tracking (clicks).
4. Asset Management: Always use absolute paths derived from `os.path.dirname(os.path.abspath(__file__))` to avoid CWD issues between capture and clicker modules.
5. User Interface: Overlay color inversion (Red=Active, Green=Inactive) and dynamic counter integration.
