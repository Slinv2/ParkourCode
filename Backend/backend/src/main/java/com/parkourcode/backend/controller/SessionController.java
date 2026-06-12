package com.parkourcode.backend.controller;

import com.parkourcode.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/session")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/start")
    public ResponseEntity<?> startSession(@RequestBody Map<String, Object> request) {
        String difficulty = (String) request.getOrDefault("difficulty", "easy");
        Map<String, Object> response = sessionService.startSession(difficulty);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetSession() {
        sessionService.resetSession();
        return ResponseEntity.ok().build();
    }
}
