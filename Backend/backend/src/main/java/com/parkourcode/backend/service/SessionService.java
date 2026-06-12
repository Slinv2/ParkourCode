package com.parkourcode.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SessionService {
    private String currentDifficulty = "easy";
    private List<String> hardwareSteps = new ArrayList<>();
    private int currentStepIndex = 0;
    private long sessionId = System.currentTimeMillis();

    public Map<String, Object> startSession(String difficulty) {
        this.currentDifficulty = difficulty;
        this.currentStepIndex = 0;
        this.sessionId = System.currentTimeMillis();
        
        // Define hardware steps based on difficulty (matching frontend missions)
        switch (difficulty) {
            case "easy":
                hardwareSteps = Arrays.asList("button-a", "lichtschranke-a");
                break;
            case "mid":
                hardwareSteps = Arrays.asList("button-a", "button-b", "gewicht");
                break;
            case "hard":
                hardwareSteps = Arrays.asList("button-a", "button-b", "lichtschranke-a", "gewicht", "lichtschranke-b", "licht");
                break;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("sessionId", this.sessionId);
        result.put("difficulty", this.currentDifficulty);
        result.put("hardwareSteps", this.hardwareSteps);
        return result;
    }

    public void resetSession() {
        this.currentStepIndex = 0;
        this.sessionId = System.currentTimeMillis();
    }

    public String getExpectedSensor() {
        if (currentStepIndex < hardwareSteps.size()) {
            return hardwareSteps.get(currentStepIndex);
        }
        return null;
    }

    public boolean isComplete() {
        return currentStepIndex >= hardwareSteps.size();
    }

    public boolean checkStep(String sensorId) {
        if (isComplete()) return false;
        
        if (hardwareSteps.get(currentStepIndex).equals(sensorId)) {
            currentStepIndex++;
            return true;
        }
        
        return false;
    }
}
