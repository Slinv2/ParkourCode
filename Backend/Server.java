import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class Server {
    private static final int TCP_PORT = 50005;
    private static final int WEBSOCKET_PORT = 8080; // Port für deine HTML-Seite

    // Liste aller aktuell im Browser geöffneten HTML-Seiten
    private static final Set<WebSocket> activeConnections = Collections.synchronizedSet(new HashSet<>());

    public static void main(String[] args) {
        // WebSocket-Server für den Browser
        startWebSocketServer();

        System.out.println("Java Sensor-Server gestartet. Warte auf Pi-Daten auf Port " + TCP_PORT + "...");

        // TCP-ServerSocket für den Raspberry Pi
        try (ServerSocket serverSocket = new ServerSocket(TCP_PORT)) {

            while (true) {
                try (Socket clientSocket = serverSocket.accept();
                     BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {

                    String empfangeneDaten = in.readLine();

                    if (empfangeneDaten != null) {
                        System.out.println("[EMPFANGEN VOM PI]: " + empfangeneDaten);

                        // String conversion in JSON
                        String jsonDaten = convertToJsonBooleans(empfangeneDaten);

                        // Sende an die HTML-Seite(n)
                        broadcastToWebSockets(jsonDaten);
                    }

                } catch (Exception e) {
                    System.err.println("Fehler bei der Client-Verbindung: " + e.getMessage());
                }
            }

        } catch (Exception e) {
            System.err.println("Server-Fehler: " + e.getLocalizedMessage());
        }
    }


    private static void startWebSocketServer() {
        WebSocketServer wss = new WebSocketServer(new InetSocketAddress(WEBSOCKET_PORT)) {
            @Override
            public void onOpen(WebSocket conn, ClientHandshake handshake) {
                activeConnections.add(conn);
                System.out.println("[HTML] Browser verbunden: " + conn.getRemoteSocketAddress());
            }

            @Override
            public void onClose(WebSocket conn, int code, String reason, boolean remote) {
                activeConnections.remove(conn);
                System.out.println("[HTML] Browser getrennt.");
            }

            @Override
            public void onMessage(WebSocket conn, String message) {
            }

            @Override
            public void onError(WebSocket conn, Exception ex) {
                System.err.println("WebSocket Fehler: " + ex.getMessage());
            }

            @Override
            public void onStart() {
                System.out.println("WebSocket-Server für HTML läuft auf Port " + WEBSOCKET_PORT);
            }
        };
        wss.start();
    }


    private static void broadcastToWebSockets(String text) {
        synchronized (activeConnections) {
            for (WebSocket ws : activeConnections) {
                if (ws.isOpen()) {
                    ws.send(text);
                }
            }
        }
    }


    private static String convertToJsonBooleans(String rawData) {
        boolean schalter = rawData.contains("Schalter:AN");
        boolean taster = rawData.contains("Taster:GEDRÜCKT");
        boolean licht = rawData.contains("Licht:HELL");

        return String.format("{\"schalter\":%b,\"taster\":%b,\"licht\":%b}", schalter, taster, licht);
    }
}