package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Constructor;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class ConstructorLoader {
	private static final Logger logger = LoggerFactory.getLogger(ConstructorLoader.class);

	public static List<Constructor> fromCsv(String filePath) {
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(record -> new Constructor(
							Integer.parseInt(record[0]),
							record[1],
							record[2],
							record[3],
							record[4]
							))
					.collect(Collectors.toList());
		} catch (IOException | CsvException e) {
			logger.error("Error reading CSV file", e);
			return List.of();
		}
	}
}
