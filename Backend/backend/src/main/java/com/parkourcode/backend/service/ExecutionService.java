package com.parkourcode.backend.service;

import com.parkourcode.backend.model.ExecutionComplete;
import com.parkourcode.backend.model.ExecutionStep;
import com.parkourcode.backend.websocket.WebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ExecutionService {

    @Autowired
    private WebSocketHandler webSocketHandler;

    @Autowired
    private ProgramValidationService validationService;

    @Async
    public void executeProgram(List<String> program, String difficulty) {
        Map<String, Object> validation = validationService.validateProgram(program, difficulty);

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> steps = (List<Map<String, Object>>) validation.get("steps");

        if (steps != null) {
            for (int i = 0; i < steps.size(); i++) {
                Map<String, Object> step = steps.get(i);
                ExecutionStep executionStep = new ExecutionStep(
                    (int) step.get("stepIndex"),
                    (String) step.get("blockId"),
                    (String) step.get("message"),
                    (boolean) step.get("success")
                );
                webSocketHandler.broadcast(executionStep);
                
                try {
                    Thread.sleep(800);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                if (!(boolean) step.get("success")) {
                    webSocketHandler.broadcast(new ExecutionComplete(false, (String) step.get("message")));
                    return;
                }
            }
        }

        boolean success = (boolean) validation.getOrDefault("success", false);
        String message = (String) validation.getOrDefault("message", "Fertig!");
        webSocketHandler.broadcast(new ExecutionComplete(success, message));
    }
}
