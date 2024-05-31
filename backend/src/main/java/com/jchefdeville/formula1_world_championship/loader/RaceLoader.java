package com.jchefdeville.formula1_world_championship.loader;

import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Race;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class RaceLoader {

	private static final Logger logger = LoggerFactory.getLogger(ConstructorLoader.class);

	public static List<Race> fromCsv(String filePath) {
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			return reader.readAll().stream()
					.skip(1) // Skip header row
					.map(data -> new Race(
							Integer.parseInt(data[0]),
							Integer.parseInt(data[1]),
							Integer.parseInt(data[2]),
							Integer.parseInt(data[3]),
							data[4],
							parseOptionalDate(data[5]),
							parseOptionalTime(data[6]),
							data[7],
							parseOptionalDate(data[8]),
							parseOptionalTime(data[9]),
							parseOptionalDate(data[10]),
							parseOptionalTime(data[11]),
							parseOptionalDate(data[12]),
							parseOptionalTime(data[13]),
							parseOptionalDate(data[14]),
							parseOptionalTime(data[15]),
							parseOptionalDate(data[16]),
							parseOptionalTime(data[17])
							))
					.collect(Collectors.toList());
		} catch (IOException | CsvException e) {
			logger.error("Error reading CSV file", e);
			return List.of();
		}
	}

	private static LocalDate parseOptionalDate(String dateString) {
		return dateString.isEmpty() || "N".equals(dateString) ?  null : LocalDate.parse(dateString);
	}

	private static LocalTime parseOptionalTime(String timeString) {
		return timeString.isEmpty() || "N".equals(timeString) ? null : LocalTime.parse(timeString);
	}
}
