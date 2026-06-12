package com.parkourcode.backend.service;

import com.parkourcode.backend.model.SensorEvent;
import com.parkourcode.backend.websocket.WebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SensorEventService {

    @Autowired
    private WebSocketHandler webSocketHandler;

    @Autowired
    private SessionService sessionService;

    public void processSensorEvent(SensorEvent event) {
        String expectedSensor = sessionService.getExpectedSensor();
        
        Map<String, Object> response = new HashMap<>();
        
        if (expectedSensor == null) {
            if (sessionService.isComplete()) {
                response.put("type", "HARDWARE_SUCCESS");
                response.put("message", "Parcours bereits abgeschlossen!");
            } else {
                response.put("type", "HARDWARE_ERROR");
                response.put("message", "Bitte starte zuerst eine Mission!");
            }
            webSocketHandler.broadcast(response);
            return;
        }

        if (expectedSensor.equals(event.getSensorId())) {
            boolean stepSuccess = sessionService.checkStep(event.getSensorId());
            if (stepSuccess) {
                response.put("type", "HARDWARE_STEP_SUCCESS");
                response.put("sensorId", event.getSensorId());
                response.put("message", "Schritt erfolgreich abgeschlossen!");
                
                if (sessionService.isComplete()) {
                    response.put("type", "HARDWARE_SUCCESS");
                    response.put("message", "Parcours erfolgreich beendet!");
                }
            }
        } else {
            response.put("type", "HARDWARE_WRONG_PATH");
            response.put("message", "Falscher Weg! Erwarte: " + expectedSensor);
        }

        webSocketHandler.broadcast(response);
    }
}
