package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Driver;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class DriverLoader {

	private static final Logger logger = LoggerFactory.getLogger(DriverLoader.class);

	public static List<Driver> fromCsv(String filePath) {
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(record -> new Driver(
							Integer.parseInt(record[0]),
							record[1],
							parseNumber(record[2]),
							record[3],
							record[4],
							record[5],
							record[6],
							record[7],
							record[8]
							))
					.collect(Collectors.toList());
		} catch (IOException | CsvException e) {
			logger.error("Error reading CSV file", e);
			return List.of();
		}
	}

	private static int parseNumber(String number) {
		if ("N".equals(number)) {
			return 0;
		}
		return Integer.parseInt(number);
	}
}
