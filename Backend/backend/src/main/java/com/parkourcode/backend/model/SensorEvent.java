package com.parkourcode.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SensorEvent {
    private String sensorId;
    private String sensorType;
    private Long timestamp;
}
