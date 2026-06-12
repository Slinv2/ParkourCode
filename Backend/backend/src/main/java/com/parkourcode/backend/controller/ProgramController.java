package com.parkourcode.backend.controller;

import com.parkourcode.backend.model.ProgramExecuteRequest;
import com.parkourcode.backend.service.ExecutionService;
import com.parkourcode.backend.service.ProgramValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/program")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    private ProgramValidationService validationService;

    @Autowired
    private ExecutionService executionService;

    @PostMapping("/validate")
    public ResponseEntity<?> validateProgram(@RequestBody ProgramExecuteRequest request) {
        Map<String, Object> result = validationService.validateProgram(request.getProgram(), request.getDifficulty());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/execute")
    public ResponseEntity<?> executeProgram(@RequestBody ProgramExecuteRequest request) {
        executionService.executeProgram(request.getProgram(), request.getDifficulty());
        return ResponseEntity.ok(Map.of("status", "EXECUTING"));
    }
}
