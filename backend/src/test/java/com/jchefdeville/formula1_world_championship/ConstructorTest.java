package com.jchefdeville.formula1_world_championship;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jchefdeville.formula1_world_championship.loader.ConstructorLoader;
import com.jchefdeville.formula1_world_championship.model.Constructor;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class ConstructorTest {

	@Test
	public void testLoadConstructors() {
		String csvFilePath = "src/test/resources/test-constructors.csv";
		List<Constructor> constructors = ConstructorLoader.fromCsv(csvFilePath);

		assertEquals(2, constructors.size());

		Constructor constructor1 = constructors.get(0);
		assertEquals(1, constructor1.constructorId());
		assertEquals("mclaren", constructor1.constructorRef());
		assertEquals("McLaren", constructor1.name());
		assertEquals("British", constructor1.nationality());
		assertEquals("http://en.wikipedia.org/wiki/McLaren", constructor1.url());

		Constructor constructor2 = constructors.get(1);
		assertEquals(2, constructor2.constructorId());
		assertEquals("bmw_sauber", constructor2.constructorRef());
		assertEquals("BMW Sauber", constructor2.name());
		assertEquals("German", constructor2.nationality());
		assertEquals("http://en.wikipedia.org/wiki/BMW_Sauber", constructor2.url());
	}

	@Test
	public void tryOpeningCsv() throws IOException {
		String csvFilePath = "src/test/resources/test-constructors.csv";
		try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
			assertNotNull(reader);
		}
	}

	@Test
	public void tryReadCsv() throws IOException, CsvException {
		String csvFilePath = "src/test/resources/test-constructors.csv";
		try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
			List<String[]> records = reader.readAll();
			assertNotNull(records);
		}
	}
}
