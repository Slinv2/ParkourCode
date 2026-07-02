import RPi.GPIO as GPIO
import time

# Pin-Nummerierung auf physische Pins (BOARD) setzen
GPIO.setmode(GPIO.BOARD)

# --- PIN-KONFIGURATION ---

# SCHALTER (Schließt gegen GND)
PIN_SCHALTER = 33
GPIO.setup(PIN_SCHALTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# NEU: KURZHUBTASTER (Schließt gegen GND)
PIN_TASTER = 31
GPIO.setup(PIN_TASTER, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# LDR (Digitaler Spannungsteiler, 3.3V-Schaltung mit externem Pull-Down)
PIN_LDR = 29
GPIO.setup(PIN_LDR, GPIO.IN)

try:
    print("Messung gestartet... Drücke STRG+C zum Beenden.")
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
        
        # 4. Ausgabe im Terminal
        print(f"Schalter: {status_schalter} | Taster: {status_taster} | Licht: {status_licht}")
        
        # Kleine Pause zur Entlastung der CPU und leichtes Entprellen
        time.sleep(0.2)

except KeyboardInterrupt:
    print("\nProgramm beendet.")
finally:
    GPIO.cleanup()