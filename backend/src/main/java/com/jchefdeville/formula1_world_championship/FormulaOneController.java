package com.jchefdeville.formula1_world_championship;

import java.util.List;
import java.util.stream.Collectors;

import com.jchefdeville.formula1_world_championship.loader.*;
import com.jchefdeville.formula1_world_championship.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

@RestController
public class FormulaOneController {

	private static final Logger logger = LoggerFactory.getLogger("FormulaOneController");

	private List<Circuit> circuits;
	private List<Constructor> constructors;
	private List<Driver> drivers;
	private List<Race> races;
	private List<Result> results;
	private List<Status> statuses;

	@GetMapping("/circuits")
	public List<Circuit> getCircuits() {
		return circuits;
	}

	@GetMapping("/constructors")
	public List<Constructor> getConstructors() {
		return constructors;
	}

	@GetMapping("/drivers/{driverId}")
	public DriverDetails getDriverDetails(@PathVariable int driverId) {
		var driver = drivers.stream()
				.filter(d -> d.driverId() == driverId).findFirst().get();


		return new DriverDetails(driver);
	}

	@GetMapping("/drivers")
	public List<Driver> getDrivers() {
		return drivers;
	}

	@GetMapping("/races/{raceId}")
	public RaceDetails getRaceDetails(@PathVariable int raceId) {
		var race = races.stream()
				.filter(r -> r.raceId() == raceId).findFirst().get();

		var raceResults = results.stream()
				.filter(r -> r.raceId() == raceId)
				.toList();

		List<Integer> driverIds = raceResults.stream()
				.map(Result::driverId)
				.toList();

		List<Driver> raceDrivers = drivers.stream()
				.filter(driver -> driverIds.contains(driver.driverId()))
				.collect(Collectors.toList());

		logger.info("Race={}", race.raceId());
		logger.info("raceResults={}", raceResults.size());
		logger.info("raceDrivers={}", raceDrivers.size());

		// Constructor_Resullts
		// Constructor

		// statuses to /GET and store in load npm

		return new RaceDetails(race, raceResults, raceDrivers, statuses);
	}

	@GetMapping("/seasons/{year}/races")
	public List<Race> getRaces(@PathVariable int year) {
		return races.stream()
				.filter(r -> r.year() == year)
				.toList();
	}

	@GetMapping("/seasons/{year}")
	public SeasonDetails getSeasonDetails(@PathVariable int year) {

		var seasonRaces = races.stream()
				.filter(r -> r.year() == year)
				.toList();

        return new SeasonDetails(year, seasonRaces);
	}

	@PostConstruct
	public void init() {
		circuits = CircuitLoader.fromCsv("src/main/resources/circuits.csv");
		constructors = ConstructorLoader.fromCsv("src/main/resources/constructors.csv");
		drivers = DriverLoader.fromCsv("src/main/resources/drivers.csv");
		races = RaceLoader.fromCsv("src/main/resources/races.csv");
		results = ResultLoader.fromCsv("src/main/resources/results.csv");
		statuses = StatusLoader.fromCsv("src/main/resources/status.csv");
	}
}