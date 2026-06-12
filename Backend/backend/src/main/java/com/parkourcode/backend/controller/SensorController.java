package com.parkourcode.backend.controller;

import com.parkourcode.backend.model.SensorEvent;
import com.parkourcode.backend.service.SensorEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sensor")
@CrossOrigin(origins = "*")
public class SensorController {

    @Autowired
    private SensorEventService sensorEventService;

    @PostMapping("/event")
    public ResponseEntity<?> handleSensorEvent(@RequestBody SensorEvent event) {
        sensorEventService.processSensorEvent(event);
        return ResponseEntity.ok().build();
    }
}
