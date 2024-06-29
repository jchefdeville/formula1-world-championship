package com.jchefdeville.formula1_world_championship.loader;

import com.jchefdeville.formula1_world_championship.model.Status;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class StatusLoader {

    private static final Logger logger = LoggerFactory.getLogger("StatusLoader");

    public static List<Status> fromCsv(String filePath) {
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            return reader.readAll().stream()
                    .skip(1) // Skip header row
                    .map(record -> new Status(
                            Integer.parseInt(record[0]),
                            record[1]
                    ))
                    .collect(Collectors.toList());
        } catch (IOException | CsvException e) {
            logger.error("Error reading CSV file", e);
            return List.of();
        }
    }
}