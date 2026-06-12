import RPi.GPIO as GPIO
import time
import socket  # Neu für die Netzwerkverbindung

# --- NETZWERK KONFIGURATION ---
SERVER_IP = '127.0.0.1'  # Ändere dies in die IP deines Java-Servers (z.B. '192.168.178.50')
SERVER_PORT = 50005      # Der Port muss mit dem Java-Server übereinstimmen

# --- GPIO KONFIGURATION ---
GPIO.setmode(GPIO.BOARD)

PIN_SCHALTER = 33
GPIO.setup(PIN_SCHALTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

PIN_TASTER = 31
GPIO.setup(PIN_TASTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

PIN_LDR = 29
GPIO.setup(PIN_LDR, GPIO.IN)

def sende_daten(daten_string):
    """Baut eine kurze Verbindung auf, sendet die Daten und schließt sie wieder."""
    try:
        # Erstellt einen TCP-Socket
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1.0) # Verhindert, dass das Skript blockiert, wenn der Server offline ist
            s.connect((SERVER_IP, SERVER_PORT))
            # Daten müssen als Bytes (utf-8) gesendet werden + Zeilenumbruch für Java
            s.sendall(f"{daten_string}\n".encode('utf-8'))
    except (socket.classmethod, ConnectionRefusedError, socket.timeout):
        print("Fehler: Server nicht erreichbar!")

try:
    print(f"Messung gestartet... Sende an {SERVER_IP}:{SERVER_PORT}")
    print("Drücke STRG+C zum Beenden.")
    
    while True:
        # 1. Sensoren auslesen
        status_schalter = "AN" if GPIO.input(PIN_SCHALTER) == GPIO.LOW else "AUS"
        status_taster = "GEDRÜCKT" if GPIO.input(PIN_TASTER) == GPIO.LOW else "LOSGELASSEN"
        status_licht = "HELL" if GPIO.input(PIN_LDR) == GPIO.HIGH else "DUNKEL"
        
        # 2. Datenstring für die Übertragung zusammenbauen
        daten = f"Schalter:{status_schalter};Taster:{status_taster};Licht:{status_licht}"
        
        # 3. Lokale Ausgabe und Senden
        print(f"Sende: {daten}")
        sende_daten(daten)
        
        time.sleep(0.5) # Intervall leicht erhöht, um das Netzwerk nicht zu fluten

except KeyboardInterrupt:
    print("\nProgramm beendet.")
finally:
    GPIO.cleanup()