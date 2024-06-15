package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Result;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class ResultLoader {

	private static final Logger logger = LoggerFactory.getLogger("ResultLoader");

	public static List<Result> fromCsv(String filePath) {
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(record -> new Result(
							parseInt(record[0]),
							parseInt(record[1]),
							parseInt(record[2]),
							parseInt(record[3]),
							parseInt(record[4]),
							parseInt(record[5]),
							parseInt(record[6]),
							record[7],
							parseInt(record[8]),
							parseDouble(record[9]),
							parseInt(record[10]),
							record[11],
							parseLong(record[12]),
							parseInt(record[13]),
							parseInt(record[14]),
							record[15],
							record[16],
							parseInt(record[17])
							))
					.collect(Collectors.toList());
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

	private static long parseLong(String number) {
		if ("N".equals(number)) {
			return 0;
		}
		return Long.parseLong(number);
	}

}
