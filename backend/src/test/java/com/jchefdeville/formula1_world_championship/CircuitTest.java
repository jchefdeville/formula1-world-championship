package com.jchefdeville.formula1_world_championship;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;


class CircuitTest {

	@Test
	public void tryOpeningCsv() {
		// Given
		String csvFilePath = "src/test/resources/test-circuits.csv";

		// When
		List<Circuit> circuits = CircuitLoader.fromCsv(csvFilePath);

		// Then
		Assertions.assertEquals(2, circuits.size());

		Circuit circuit1 = circuits.get(0);
		Assertions.assertEquals(1, circuit1.circuitId());
		Assertions.assertEquals("albert_park", circuit1.circuitRef());
		Assertions.assertEquals("Albert Park Grand Prix Circuit", circuit1.name());
		Assertions.assertEquals("Melbourne", circuit1.location());
		Assertions.assertEquals("Australia", circuit1.country());
		Assertions.assertEquals(-37.8497, circuit1.lat());
		Assertions.assertEquals(144.968, circuit1.lng());
		Assertions.assertEquals(10, circuit1.alt());
		Assertions.assertEquals("http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit", circuit1.url());

		Circuit circuit2 = circuits.get(1);
		Assertions.assertEquals(2, circuit2.circuitId());
		Assertions.assertEquals("sepang", circuit2.circuitRef());
		Assertions.assertEquals("Sepang International Circuit", circuit2.name());
		Assertions.assertEquals("Kuala Lumpur", circuit2.location());
		Assertions.assertEquals("Malaysia", circuit2.country());
		Assertions.assertEquals(2.76083, circuit2.lat());
		Assertions.assertEquals(101.738, circuit2.lng());
		Assertions.assertEquals(18, circuit2.alt());
		Assertions.assertEquals("http://en.wikipedia.org/wiki/Sepang_International_Circuit", circuit2.url());
	}

}
