package com.parkourcode.backend.model;

public class ExecutionComplete {
    private String type = "EXECUTION_COMPLETE";
    private boolean success;
    private String message;

    public ExecutionComplete(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public String getType() { return type; }
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
}
