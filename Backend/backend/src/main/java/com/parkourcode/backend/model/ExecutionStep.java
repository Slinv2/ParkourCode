package com.parkourcode.backend.model;

public class ExecutionStep {
    private String type = "EXECUTION_STEP";
    private int stepIndex;
    private String blockId;
    private String message;
    private boolean success;

    public ExecutionStep(int stepIndex, String blockId, String message, boolean success) {
        this.stepIndex = stepIndex;
        this.blockId = blockId;
        this.message = message;
        this.success = success;
    }

    public String getType() { return type; }
    public int getStepIndex() { return stepIndex; }
    public String getBlockId() { return blockId; }
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
