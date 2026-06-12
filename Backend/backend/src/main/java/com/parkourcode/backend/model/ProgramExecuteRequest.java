package com.parkourcode.backend.model;

import java.util.List;

public class ProgramExecuteRequest {
    private List<String> program;
    private String difficulty;

    public List<String> getProgram() { return program; }
    public void setProgram(List<String> program) { this.program = program; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
