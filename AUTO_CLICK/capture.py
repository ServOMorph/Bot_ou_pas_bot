import tkinter as tk
from PIL import ImageGrab
import os
from datetime import datetime

class ZoneSelector:
    """Outil de sélection de zone pour capture d'écran."""
    
    def __init__(self, save_path):
        self.save_path = save_path
        self.root = tk.Tk()
        self.root.attributes("-alpha", 0.3)
        self.root.attributes("-fullscreen", True)
        self.root.attributes("-topmost", True)
        self.root.config(cursor="cross")
        
        self.canvas = tk.Canvas(self.root, cursor="cross", bg="grey")
        self.canvas.pack(fill="both", expand=True)
        
        self.start_x = None
        self.start_y = None
        self.rect = None
        
        self.canvas.bind("<ButtonPress-1>", self.on_button_press)
        self.canvas.bind("<B1-Motion>", self.on_move_press)
        self.canvas.bind("<ButtonRelease-1>", self.on_button_release)
        self.root.bind("<Escape>", self.on_escape)

    def on_escape(self, event=None):
        print("Capture annulée (Echap)")
        self.root.destroy()

    def on_button_press(self, event):
        self.start_x = event.x
        self.start_y = event.y
        self.rect = self.canvas.create_rectangle(self.start_x, self.start_y, 1, 1, outline='red', width=2)

    def on_move_press(self, event):
        cur_x, cur_y = (event.x, event.y)
        self.canvas.coords(self.rect, self.start_x, self.start_y, cur_x, cur_y)

    def on_button_release(self, event):
        end_x, end_y = (event.x, event.y)
        self.root.destroy()
        
        # Capture de la zone
        x1 = min(self.start_x, end_x)
        y1 = min(self.start_y, end_y)
        x2 = max(self.start_x, end_x)
        y2 = max(self.start_y, end_y)
        
        if x2 - x1 > 5 and y2 - y1 > 5:
            self.capture(x1, y1, x2, y2)

    def capture(self, x1, y1, x2, y2):
        if not os.path.exists(self.save_path):
            os.makedirs(self.save_path)
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"target_{timestamp}.png"
        filepath = os.path.join(self.save_path, filename)
        
        # Utilisation de ImageGrab pour la capture
        # Sur Windows, ImageGrab.grab(bbox=...) fonctionne bien
        img = ImageGrab.grab(bbox=(x1, y1, x2, y2))
        img.save(filepath)
        print(f"Cible sauvegardée dans assets : {filepath}")

def start_capture(save_path):
    selector = ZoneSelector(save_path)
    selector.root.mainloop()
