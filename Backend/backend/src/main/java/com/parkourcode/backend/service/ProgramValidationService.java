package com.parkourcode.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProgramValidationService {

    private static final Map<String, List<String>> REQUIRED_ORDER = Map.of(
        "easy", Arrays.asList("augen-auf", "aufstehen", "winken"),
        "mid", Arrays.asList("augen-auf", "aufstehen", "licht-an", "musik"),
        "hard", Arrays.asList("augen-auf", "aufstehen", "winken", "licht-an", "musik", "schutz")
    );

    private static final Map<String, String> ERROR_MESSAGES = Map.of(
        "winken", "Mauzi kann nicht winken, bevor sie aufgestanden ist.",
        "aufstehen", "Mauzi kann nicht aufstehen, bevor ihre Augen offen sind.",
        "licht-an", "Mauzi kann nicht Licht einschalten, bevor sie aufgestanden ist.",
        "musik", "Mauzi kann keine Musik spielen, bevor sie aufgestanden ist.",
        "schutz", "Mauzi kann sich nicht verteidigen, bevor sie Licht an hat und Musik spielt."
    );

    public Map<String, Object> validateProgram(List<String> program, String difficulty) {
        Map<String, Object> result = new HashMap<>();
        List<String> errors = new ArrayList<>();
        List<Map<String, Object>> steps = new ArrayList<>();

        Set<String> executed = new HashSet<>();
        boolean awake = false;
        boolean standing = false;
        boolean lightOn = false;
        boolean musicOn = false;

        for (int i = 0; i < program.size(); i++) {
            String blockId = program.get(i);
            String error = validateBlock(blockId, awake, standing, lightOn, musicOn);

            if (error != null) {
                errors.add(error);
                steps.add(Map.of("stepIndex", i, "blockId", blockId, "success", false, "message", error));
                result.put("success", false);
                result.put("errors", errors);
                result.put("steps", steps);
                return result;
            }

            switch (blockId) {
                case "augen-auf": awake = true; break;
                case "aufstehen": standing = true; break;
                case "winken": break;
                case "licht-an": lightOn = true; break;
                case "musik": musicOn = true; break;
                case "schutz": break;
            }

            executed.add(blockId);
            steps.add(Map.of("stepIndex", i, "blockId", blockId, "success", true, "message", getStepMessage(blockId)));
        }

        List<String> required = REQUIRED_ORDER.getOrDefault(difficulty, REQUIRED_ORDER.get("easy"));
        List<String> missing = new ArrayList<>();
        for (String req : required) {
            if (!executed.contains(req)) {
                missing.add(req);
            }
        }

        if (!missing.isEmpty()) {
            result.put("success", false);
            result.put("errors", Arrays.asList("Fehlende Blöcke: " + String.join(", ", missing)));
            result.put("steps", steps);
            return result;
        }

        result.put("success", true);
        result.put("message", "Perfekt! Mauzi hat sich erfolgreich verteidigt!");
        result.put("steps", steps);
        return result;
    }

    private String validateBlock(String blockId, boolean awake, boolean standing, boolean lightOn, boolean musicOn) {
        if ("aufstehen".equals(blockId) && !awake) {
            return ERROR_MESSAGES.get("aufstehen");
        }
        if ("winken".equals(blockId) && !standing) {
            return ERROR_MESSAGES.get("winken");
        }
        if ("licht-an".equals(blockId) && !standing) {
            return ERROR_MESSAGES.get("licht-an");
        }
        if ("musik".equals(blockId) && !standing) {
            return ERROR_MESSAGES.get("musik");
        }
        if ("schutz".equals(blockId) && (!lightOn || !musicOn)) {
            return ERROR_MESSAGES.get("schutz");
        }
        return null;
    }

    private String getStepMessage(String blockId) {
        return switch (blockId) {
            case "augen-auf" -> "Mauzi öffnet die Augen!";
            case "aufstehen" -> "Mauzi steht auf!";
            case "winken" -> "Mauzi winkt!";
            case "licht-an" -> "Mauzi schaltet das Licht an!";
            case "musik" -> "Mauzi spielt Musik!";
            case "schutz" -> "Mauzi verteidigt sich!";
            default -> "Aktion ausgeführt!";
        };
    }
}
