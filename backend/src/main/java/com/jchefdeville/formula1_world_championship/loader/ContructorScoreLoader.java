package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.ConstructorScore;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class ContructorScoreLoader {

	private static final Logger logger = LoggerFactory.getLogger("ContructorScoreLoader");

	public static List<ConstructorScore> fromCsv(String filePath) {
		try (var reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(record -> new ConstructorScore(
							parseInt(record[0]),
							parseInt(record[1]),
							parseInt(record[2]),
							parseDouble(record[3]),
							parseInt(record[4]),
							record[5],
							parseInt(record[6])))
					.toList();
		} catch (IOException | CsvException e) {
			logger.error("Error reading CSV file", e);
			return List.of();
		}
	}

	private static double parseDouble(String number) {
		if ("NA".equals(number)) {
			return 0.0;
		}
		return Double.parseDouble(number);
	}

	private static int parseInt(String number) {
		if ("N".equals(number)) {
			return 0;
		}
		return Integer.parseInt(number);
	}
}
