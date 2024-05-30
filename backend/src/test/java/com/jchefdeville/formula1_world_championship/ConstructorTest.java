package com.jchefdeville.formula1_world_championship;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.FileReader;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.model.Constructor;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class ConstructorTest {

	private static final Logger logger = LoggerFactory.getLogger("ConstructorTest");

	@Test
	public void createRecord() {

		Constructor record = new Constructor();
		assertTrue(record != null);
	}

	@Test
	public void tryOpeningCsv() throws IOException {

		String csvFilePath = "src/test/resources/test-constructors.csv";
		try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
			assertTrue(reader != null);
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void tryReadCsv() throws IOException, CsvException {

		String csvFilePath = "src/test/resources/test-constructors.csv";
		try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
			reader.readAll().stream()
			.skip(1)
			.forEach(record -> logger.info(String.join(", ", record)));
			assertTrue(reader != null);
		} catch (IOException e) {
			throw e;
		}
	}
}
