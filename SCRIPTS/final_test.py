import requests
try:
    r = requests.get("http://localhost:8000/api/models", timeout=5)
    print(f"GET Status: {r.status_code}")
    print(f"GET Body: {r.json()}")
    
    r = requests.post("http://localhost:8000/api/optimize", json={"prompt": "test"}, timeout=10)
    print(f"POST Status: {r.status_code}")
    print(f"POST Body: {r.json()}")
except Exception as e:
    print(f"Error: {e}")
