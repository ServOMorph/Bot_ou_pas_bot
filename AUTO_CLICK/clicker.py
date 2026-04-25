import os
import time
import threading
import pyautogui
import tkinter as tk
from PIL import Image, ImageTk

# Configuration
CONFIDENCE = 0.8
ASSETS_DIR = "assets"

class VisualFeedback(tk.Toplevel):
    """Petit rond rouge indiquant où le clic va se produire."""
    def __init__(self, x, y):
        super().__init__()
        self.overrideredirect(True)
        self.attributes("-topmost", True)
        self.attributes("-transparentcolor", "white")
        self.geometry(f"30x30+{x-15}+{y-15}")
        
        self.canvas = tk.Canvas(self, width=30, height=30, bg="white", highlightthickness=0)
        self.canvas.pack()
        self.canvas.create_oval(2, 2, 28, 28, outline="red", width=3)
        
        self.after(500, self.destroy)

class ClickerService:
    def __init__(self, root_path, feedback_callback=None):
        self.root_path = root_path
        self.assets_path = os.path.join(root_path, ASSETS_DIR)
        self.active = False
        self.thread = None
        self.feedback_callback = feedback_callback
        
        if not os.path.exists(self.assets_path):
            os.makedirs(self.assets_path)

    def start(self):
        self.active = True
        if not self.thread or not self.thread.is_alive():
            self.thread = threading.Thread(target=self._run, daemon=True)
            self.thread.start()

    def stop(self):
        self.active = False

    def _run(self):
        while True:
            if not self.active:
                time.sleep(0.5)
                continue
            
            # Lister les images dans assets
            try:
                images = [f for f in os.listdir(self.assets_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            except Exception:
                images = []
            
            for img_name in images:
                if not self.active: break
                
                img_path = os.path.join(self.assets_path, img_name)
                try:
                    # Recherche de l'image sur l'écran
                    location = pyautogui.locateCenterOnScreen(img_path, confidence=CONFIDENCE)
                    if location:
                        x, y = location
                        
                        # Feedback visuel (via callback vers le thread UI)
                        if self.feedback_callback:
                            self.feedback_callback(x, y)
                        
                        time.sleep(0.3)
                        
                        # Clic
                        pyautogui.click(x, y)
                        print(f"Clicked on {img_name} at ({x}, {y})")
                        time.sleep(1.0) # Pause après clic
                except Exception as e:
                    # print(f"Error searching for {img_name}: {e}")
                    pass
            
            time.sleep(0.1)
