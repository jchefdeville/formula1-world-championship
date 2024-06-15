package com.jchefdeville.formula1_world_championship;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.loader.ConstructorLoader;
import com.jchefdeville.formula1_world_championship.loader.DriverLoader;
import com.jchefdeville.formula1_world_championship.loader.RaceLoader;
import com.jchefdeville.formula1_world_championship.loader.ResultLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;
import com.jchefdeville.formula1_world_championship.model.Constructor;
import com.jchefdeville.formula1_world_championship.model.Driver;
import com.jchefdeville.formula1_world_championship.model.Race;
import com.jchefdeville.formula1_world_championship.model.RaceDetails;
import com.jchefdeville.formula1_world_championship.model.Result;

import jakarta.annotation.PostConstruct;

@RestController
public class FormulaOneController {

	private static final Logger logger = LoggerFactory.getLogger("FormulaOneController");

	private List<Circuit> circuits;
	private List<Constructor> constructors;
	private List<Driver> drivers;
	private List<Race> races;
	private List<Result> results;

	@GetMapping("/circuits")
	public List<Circuit> getCircuits() {
		return circuits;
	}

	@GetMapping("/constructors")
	public List<Constructor> getConstructors() {
		return constructors;
	}

	@GetMapping("/drivers")
	public List<Driver> getDrivers() {
		return drivers;
	}

	@GetMapping("/races/{raceId}/")
	public RaceDetails getRaceDetails(@PathVariable int raceId) {
		Race race = races.stream()
				.filter(r -> r.raceId() == raceId).findFirst().get();

		List<Result> raceResults = results.stream()
				.filter(r -> r.raceId() == raceId)
				.toList();

		raceResults.forEach(r -> logger.info("driverId={}", r.driverId()));

		logger.info("Race={}", race.raceId());
		logger.info("raceResults={}", raceResults.size());

		return null;
	}

	@GetMapping("/seasons/{year}/races")
	public List<Race> getRaces(@PathVariable int year) {
		return races.stream()
				.filter(r -> r.year() == year)
				.toList();
	}

	@PostConstruct
	public void init() {
		circuits = CircuitLoader.fromCsv("src/main/resources/circuits.csv");
		constructors = ConstructorLoader.fromCsv("src/main/resources/constructors.csv");
		drivers = DriverLoader.fromCsv("src/main/resources/drivers.csv");
		races = RaceLoader.fromCsv("src/main/resources/races.csv");
		results = ResultLoader.fromCsv("src/main/resources/results.csv");
	}
}