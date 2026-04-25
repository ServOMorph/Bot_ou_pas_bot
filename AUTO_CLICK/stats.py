import json
import os
import threading
import time
from datetime import datetime
from collections import defaultdict

# Chemin du fichier de stats (dans le dossier AUTO_CLICK)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
STATS_FILE = os.path.join(ROOT_DIR, "click_stats.json")

_lock = threading.Lock()

# Buffer en mémoire
_buffer_count = 0
_buffer_events = []
_FLUSH_EVERY = 5       # flush toutes les 5 clics
_FLUSH_INTERVAL = 30.0  # flush toutes les 30 secondes
_last_flush_time = time.monotonic()

def _load_raw():
    if not os.path.exists(STATS_FILE):
        return {"total": 0, "events": []}
    try:
        with open(STATS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {"total": 0, "events": []}

def _write_raw(data):
    try:
        with open(STATS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError:
        pass

def _flush_locked(data=None):
    global _buffer_count, _buffer_events, _last_flush_time
    if not _buffer_events and _buffer_count == 0:
        return
    if data is None:
        data = _load_raw()
    data["total"] = data.get("total", 0) + _buffer_count
    data["events"] = data.get("events", []) + _buffer_events
    _write_raw(data)
    _buffer_count = 0
    _buffer_events = []
    _last_flush_time = time.monotonic()

def increment():
    """Incrémente le compteur de clics avec un timestamp."""
    global _buffer_count, _buffer_events
    with _lock:
        ts = datetime.now().isoformat()
        _buffer_count += 1
        _buffer_events.append(ts)
        if _buffer_count >= _FLUSH_EVERY or (time.monotonic() - _last_flush_time) >= _FLUSH_INTERVAL:
            _flush_locked()

def flush():
    """Force l'écriture sur le disque."""
    with _lock:
        _flush_locked()

def get_total():
    """Récupère le nombre total de clics (disque + buffer)."""
    with _lock:
        data = _load_raw()
        return data.get("total", 0) + _buffer_count

def get_stats(period="day"):
    """Agrège les données pour analyse."""
    with _lock:
        data = _load_raw()
        events = data.get("events", []) + _buffer_events
        counts = defaultdict(int)

        for ts in events:
            try:
                dt = datetime.fromisoformat(ts)
                if period == "hour":
                    key = dt.strftime("%H:00")
                elif period == "day":
                    key = dt.strftime("%d/%m")
                elif period == "week":
                    key = f"S{dt.isocalendar()[1]:02d}"
                else:
                    key = dt.strftime("%d/%m")
                counts[key] += 1
            except ValueError:
                continue
        
        return sorted(counts.items())
