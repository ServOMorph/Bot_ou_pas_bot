import sys
import customtkinter as ctk

# Constantes pour l'overlay
OVERLAY_WIDTH = 120
OVERLAY_HEIGHT = 40
OVERLAY_MARGIN = 20
OVERLAY_ALPHA = 0.8
COLOR_ACTIVE = "#e74c3c"    # Rouge (pour l'utilisateur c'est Actif ?)
COLOR_INACTIVE = "#2ecc71"  # Vert (pour l'utilisateur c'est Inactif ?)
TEXT_COLOR = "#ffffff"

class AutoAntigravityOverlay(ctk.CTkToplevel):
    """Indicateur flottant always-on-top pour l'état de l'autoclick."""
    
    def __init__(self, on_toggle: callable, on_capture: callable):
        super().__init__()
        self.on_toggle = on_toggle
        self.on_capture = on_capture
        self.active = False

        # Configuration de la fenêtre
        self.title("AutoAntigravity Overlay")
        self.overrideredirect(True)  # Pas de bordures
        self.attributes("-topmost", True)  # Toujours au-dessus
        self.attributes("-alpha", OVERLAY_ALPHA)
        
        # Windows specific: hide from Taskbar
        if sys.platform == "win32":
            self.attributes("-toolwindow", True)

        # Positionnement en bas à droite
        screen_w = self.winfo_screenwidth()
        screen_h = self.winfo_screenheight()
        x = screen_w - OVERLAY_WIDTH - OVERLAY_MARGIN
        y = screen_h - OVERLAY_HEIGHT - OVERLAY_MARGIN
        self.geometry(f"{OVERLAY_WIDTH}x{OVERLAY_HEIGHT}+{x}+{y}")

        # Frame principale cliquable pour le toggle
        self.main_frame = ctk.CTkFrame(self, fg_color=COLOR_INACTIVE, corner_radius=10)
        self.main_frame.pack(expand=True, fill="both")

        self.label = ctk.CTkLabel(
            self.main_frame,
            text="AG OFF",
            font=ctk.CTkFont(family="Segoe UI", size=13, weight="bold"),
            text_color=TEXT_COLOR
        )
        self.label.pack(side="left", expand=True, padx=(10, 0))

        self.count_label = ctk.CTkLabel(
            self.main_frame,
            text="0",
            font=ctk.CTkFont(family="Segoe UI", size=13, weight="bold"),
            text_color=TEXT_COLOR
        )
        self.count_label.pack(side="right", expand=True, padx=(0, 10))

        # Binding du clic pour le toggle
        self.label.bind("<Button-1>", self._handle_toggle)
        self.count_label.bind("<Button-1>", self._handle_toggle)
        self.main_frame.bind("<Button-1>", self._handle_toggle)
        
        # Clic droit pour la capture
        self.label.bind("<Button-3>", lambda e: self.on_capture())
        self.count_label.bind("<Button-3>", lambda e: self.on_capture())
        self.main_frame.bind("<Button-3>", lambda e: self.on_capture())

        self._keep_on_top()

    def _handle_toggle(self, event=None):
        self.active = not self.active
        self.update_ui()
        self.on_toggle(self.active)

    def update_ui(self):
        if self.active:
            self.main_frame.configure(fg_color=COLOR_ACTIVE)
            self.label.configure(text="AG ON")
        else:
            self.main_frame.configure(fg_color=COLOR_INACTIVE)
            self.label.configure(text="AG OFF")

    def update_count(self, count: int):
        self.count_label.configure(text=str(count))

    def _keep_on_top(self):
        self.attributes("-topmost", True)
        self.lift()
        self.after(2000, self._keep_on_top)
