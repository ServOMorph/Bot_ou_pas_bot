import os
import customtkinter as ctk
from overlay import AutoAntigravityOverlay
from clicker import ClickerService, VisualFeedback
from capture import start_capture
import stats

# DPI Awareness pour Windows
try:
    from ctypes import windll
    windll.shcore.SetProcessDpiAwareness(1)
except Exception:
    pass

# Chemins
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(ROOT_DIR, "assets")

class AutoAntigravityApp:
    def __init__(self):
        self.root = ctk.CTk()
        self.root.withdraw()  # Cacher la fenêtre principale
        
        # Créer le dossier assets s'il n'existe pas
        if not os.path.exists(ASSETS_DIR):
            os.makedirs(ASSETS_DIR)

        # Initialisation du service de clic
        self.clicker = ClickerService(ROOT_DIR, feedback_callback=self.show_visual_feedback)
        
        # Initialisation de l'overlay
        self.overlay = AutoAntigravityOverlay(
            on_toggle=self.toggle_clicker,
            on_capture=self.trigger_capture
        )
        self.overlay.update_count(stats.get_total())
        
        self.root.protocol("WM_DELETE_WINDOW", self.on_close)

    def on_close(self):
        """Action à la fermeture."""
        stats.flush()
        self.root.destroy()

    def toggle_clicker(self, active):
        if active:
            self.clicker.start()
        else:
            self.clicker.stop()

    def show_visual_feedback(self, x, y):
        """Appelé par le service de clic (thread) pour afficher le rond rouge."""
        # On utilise after() pour s'assurer que l'UI est modifiée dans le thread principal
        self.root.after(0, lambda: VisualFeedback(x, y))
        self.root.after(0, lambda: self.overlay.update_count(stats.get_total()))

    def trigger_capture(self):
        """Lance l'outil de capture de zone."""
        # On peut lancer ça dans un thread séparé ou via after()
        self.root.after(100, lambda: start_capture(ASSETS_DIR))

    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = AutoAntigravityApp()
    app.run()
