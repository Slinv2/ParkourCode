package com.parkourcode.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @GetMapping("/status")
    public ResponseEntity<?> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("sensorsConnected", true);
        status.put("activeSession", true);
        status.put("lastEvent", System.currentTimeMillis());
        return ResponseEntity.ok(status);
    }
}
