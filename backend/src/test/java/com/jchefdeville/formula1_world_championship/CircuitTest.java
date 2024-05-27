package com.jchefdeville.formula1_world_championship;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;


class CircuitTest {

    private static final Logger logger = Logger.getLogger("CircuitTest");

    @Test
    public void testHelloWorld() {
        logger.info("Hello World");
        assertTrue(true);
    }

    @Test
    public void tryOpeningCsv() {
        try {
            Path csvFile = Paths.get(getClass().getResource("/circuits.csv").toURI());
            try (Stream<String> lines = Files.lines(csvFile)) {
                lines.forEach(logger::info);
            }
        } catch (IOException | URISyntaxException e) {
            assertTrue(false);
        }
    }
}
