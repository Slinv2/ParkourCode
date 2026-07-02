import RPi.GPIO as GPIO
import time
import socket

SERVER_IP = '192.168.137.1'  
SERVER_PORT = 50005   

# PIO
GPIO.setmode(GPIO.BOARD)

# SCHALTER (Schließt gegen GND -> Pin 33 und GND)
PIN_SCHALTER = 33
GPIO.setup(PIN_SCHALTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# KURZHUBTASTER (Schließt gegen GND -> Pin 31 und GND)
PIN_TASTER = 31
GPIO.setup(PIN_TASTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# LDR (Digitaler Spannungsteiler -> Pin 29)
PIN_LDR = 29
GPIO.setup(PIN_LDR, GPIO.IN)

def sende_daten(daten_string):
    """Baut eine kurze Verbindung auf, sendet die Daten und schließt sie wieder."""
    try:
        # Erstellt einen TCP-Socket
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1.0) # Verhindert, dass das Skript blockiert, wenn der Server offline ist
            s.connect((SERVER_IP, SERVER_PORT))
            s.sendall(f"{daten_string}\n".encode('utf-8'))
    except (socket.error, ConnectionRefusedError, socket.timeout):
        print(f"Fehler: Java-Server unter {SERVER_IP}:{SERVER_PORT} ist offline oder nicht erreichbar!")

# main program
try:
    print(f"Messung gestartet... Sende an {SERVER_IP}:{SERVER_PORT}")
    print("Drücke STRG+C zum Beenden.")
    
    while True:
        # 1. Schalter auslesen (GND-Schaltung -> LOW = AN)
        if GPIO.input(PIN_SCHALTER) == GPIO.LOW:
            status_schalter = "AN"
        else:
            status_schalter = "AUS"
            
        # 2. Kurzhubtaster auslesen (GND-Schaltung -> LOW = GEDRÜCKT)
        if GPIO.input(PIN_TASTER) == GPIO.LOW:
            status_taster = "GEDRÜCKT"
        else:
            status_taster = "LOSGELASSEN"
            
        # 3. LDR auslesen (3,3V-Schaltung mit Pull-Down -> HIGH = HELL)
        if GPIO.input(PIN_LDR) == GPIO.HIGH:
            status_licht = "HELL"
        else:
            status_licht = "DUNKEL"
        
        # 4. Datenstring für die Übertragung zusammenbauen
        daten = f"Schalter:{status_schalter};Taster:{status_taster};Licht:{status_licht}"
        
        # 5. Lokale Ausgabe und Senden an den Java-Server
        print(f"Sende: {daten}")
        sende_daten(daten)
        
        # 0.5 Sekunden warten vor der nächsten Messung
        time.sleep(0.5)

except KeyboardInterrupt:
    print("\nProgramm beendet.")
finally:
    # GPIO zurücksetzen
    GPIO.cleanup()