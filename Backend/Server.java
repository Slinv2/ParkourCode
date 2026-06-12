import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    private static final int PORT = 50005; 

    public static void main(String[] args) {
        System.out.println("Java Sensor-Server gestartet. Warte auf Daten auf Port " + PORT + "...");

        // ServerSocket öffnen
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            
            while (true) {
                // Warte auf Verbindung vom Raspberry Pi
                try (Socket clientSocket = serverSocket.accept();
                     BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {
                    
                    // Zeile vom Client einlesen
                    String empfangeneDaten = in.readLine();
                    
                    if (empfangeneDaten != null) {
                        System.out.println("[EMPFANGEN]: " + empfangeneDaten);
                    
                    }
                    
                } catch (Exception e) {
                    System.err.println("Fehler bei der Client-Verbindung: " + e.getMessage());
                }
            }
            
        } catch (Exception e) {
            System.err.println("Server-Fehler: " + e.getLocalizedMessage());
        }
    }
}