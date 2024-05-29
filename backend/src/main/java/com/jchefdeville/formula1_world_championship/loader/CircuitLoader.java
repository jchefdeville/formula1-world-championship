package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Circuit;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class CircuitLoader {

	private static final Logger logger = LoggerFactory.getLogger("CircuitLoader");

	public static List<Circuit> fromCsv(String filePath) {
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(record -> new Circuit(
							Integer.parseInt(record[0]),
							record[1],
							record[2],
							record[3],
							record[4],
							Double.parseDouble(record[5]),
							Double.parseDouble(record[6]),
							parseAltitude(record[7]),
							record[8]
							))
					.collect(Collectors.toList());
		} catch (IOException | CsvException e) {
			logger.error("Error while reading circuits csv", e);
		}
		return List.of();
	}

	private static int parseAltitude(String altitude) {
		if ("N".equals(altitude)) {
			return 0;
		}
		return Integer.parseInt(altitude);
	}
}
