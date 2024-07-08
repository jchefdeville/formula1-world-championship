package com.jchefdeville.formula1_world_championship;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.loader.ConstructorLoader;
import com.jchefdeville.formula1_world_championship.loader.ConstructorResultLoader;
import com.jchefdeville.formula1_world_championship.loader.ContructorScoreLoader;
import com.jchefdeville.formula1_world_championship.loader.DriverLoader;
import com.jchefdeville.formula1_world_championship.loader.DriverScoreLoader;
import com.jchefdeville.formula1_world_championship.loader.RaceLoader;
import com.jchefdeville.formula1_world_championship.loader.ResultLoader;
import com.jchefdeville.formula1_world_championship.loader.StatusLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;
import com.jchefdeville.formula1_world_championship.model.Constructor;
import com.jchefdeville.formula1_world_championship.model.ConstructorDetails;
import com.jchefdeville.formula1_world_championship.model.ConstructorResult;
import com.jchefdeville.formula1_world_championship.model.ConstructorScore;
import com.jchefdeville.formula1_world_championship.model.Driver;
import com.jchefdeville.formula1_world_championship.model.DriverDetails;
import com.jchefdeville.formula1_world_championship.model.DriverScore;
import com.jchefdeville.formula1_world_championship.model.Race;
import com.jchefdeville.formula1_world_championship.model.RaceDetails;
import com.jchefdeville.formula1_world_championship.model.Result;
import com.jchefdeville.formula1_world_championship.model.SeasonDetails;
import com.jchefdeville.formula1_world_championship.model.Status;

import jakarta.annotation.PostConstruct;

@RestController
public class FormulaOneController {

	private static final Logger logger = LoggerFactory.getLogger("FormulaOneController");

	private List<Circuit> circuits;
	private List<Constructor> constructors;
	private List<Driver> drivers;
	private List<Race> races;
	private List<Result> results;
	private List<ConstructorResult> constructorsResults;
	private List<DriverScore> driverScores;
	private List<ConstructorScore> constructorScores;
	private List<Status> statuses;

	@GetMapping("/circuits")
	public List<Circuit> getCircuits() {
		logger.info("circuits={}", circuits.size());
		return circuits;
	}

	@GetMapping("/constructors/{constructorId}")
	public ConstructorDetails getConstructorDetails(@PathVariable int constructorId) {
		logger.info("constructorId={}", constructorId);
		var constructor = constructors.stream()
				.filter(c -> c.constructorId() == constructorId)
				.findFirst()
				.orElse(null);

		// Retrieve constructorResults + constructorScores => raceId => results => driverId => drivers

		var constructorDetailsResults = results.stream()
				.filter(r -> r.constructorId() == constructorId)
				.toList();

		logger.info("constructorDetailsResults={}", constructorDetailsResults.size());

		var driverIds = constructorDetailsResults.stream()
				.map(Result::driverId)
				.toList();

		var constructorDetailsDrivers = drivers.stream()
				.filter(driver -> driverIds.contains(driver.driverId()))
				.toList();

		logger.info("Drivers={}", constructorDetailsDrivers.size());

		return new ConstructorDetails(constructor, constructorDetailsDrivers);
	}

	@GetMapping("/constructors")
	public List<Constructor> getConstructors() {
		logger.info("constructors={}", constructors.size());
		return constructors;
	}

	@GetMapping("/drivers/{driverId}")
	public DriverDetails getDriverDetails(@PathVariable int driverId) {
		logger.info("driverId={}", driverId);
		var driver = drivers.stream()
				.filter(d -> d.driverId() == driverId)
				.findFirst()
				.orElse(null);

		var driverResults = results.stream()
				.filter(r -> r.driverId() == driverId)
				.toList();

		var constructorIds = driverResults.stream()
				.map(Result::constructorId)
				.toList();

		var driverConstructors = constructors.stream()
				.filter(c -> constructorIds.contains(c.constructorId()))
				.toList();




		// Retrieve results + driverScores => constructorId => constructors

		return new DriverDetails(driver, driverConstructors);
	}

	@GetMapping("/drivers")
	public List<Driver> getDrivers() {
		logger.info("drivers={}", drivers.size());
		return drivers;
	}

	@GetMapping("/races/{raceId}")
	public ResponseEntity<RaceDetails> getRaceDetails(@PathVariable int raceId) {
		logger.info("raceId={}", raceId);
		var race = races.stream()
				.filter(r -> r.raceId() == raceId)
				.findFirst()
				.orElse(null);

		if (race == null) {
			return ResponseEntity.notFound().build();
		}

		var raceResults = results.stream()
				.filter(result -> result.raceId() == raceId)
				.toList();

		var raceDriverScores = driverScores.stream()
				.filter(r -> r.raceId() == raceId)
				.sorted(Comparator.comparingInt(DriverScore::position))
				.toList();

		var raceConstructorScores = constructorScores.stream()
				.filter(r -> r.raceId() == raceId)
				.sorted(Comparator.comparingInt(ConstructorScore::position))
				.toList();

		var driverIds = raceDriverScores.stream()
				.map(DriverScore::driverId)
				.toList();

		List<Driver> raceDrivers = drivers.stream()
				.filter(driver -> driverIds.contains(driver.driverId()))
				.collect(Collectors.toList());

		var constructorResults = constructorsResults.stream()
				.filter(r -> r.raceId() == raceId)
				.toList();

		var constuctorIds = constructorResults.stream()
				.map(ConstructorResult::constructorId)
				.toList();

		var raceConstructors = constructors.stream()
				.filter(constructor -> constuctorIds.contains(constructor.constructorId()))
				.toList();

		logger.info("Race={}", race.raceId());
		logger.info("raceResults={}", raceResults.size());
		logger.info("raceDriverScores={}", raceDriverScores.size());
		logger.info("raceConstructorScores={}", raceConstructorScores.size());
		logger.info("raceDrivers={}", raceDrivers.size());
		logger.info("constructorResults={}", constructorResults.size());
		logger.info("raceConstructors={}", raceConstructors.size());

		// statuses to /GET and store in load npm

		return ResponseEntity.ok(new RaceDetails(race, raceResults, raceDrivers, constructorResults, raceConstructors, raceDriverScores, raceConstructorScores, statuses));
	}

	@GetMapping("/seasons/{year}/races")
	public List<Race> getRaces(@PathVariable int year) {
		logger.info("year={}", year);
		return races.stream()
				.filter(r -> r.year() == year)
				.sorted(Comparator.comparingInt(Race::round))
				.toList();
	}

	@GetMapping("/seasons/{year}")
	public SeasonDetails getSeasonDetails(@PathVariable int year) {
		logger.info("year={}", year);
		var seasonRaces = races.stream()
				.filter(r -> r.year() == year)
				.toList();

		// Get last driverScores et last constructorScores ?

		var seasonResults = results.stream()
				.filter(r -> seasonRaces.stream().anyMatch(sr -> sr.raceId() == r.raceId()))
				// .filter(r -> r.raceId() == 1099)
				.toList();

		var seasonDrivers = drivers.stream()
				.filter(r -> seasonResults.stream().anyMatch(sr -> sr.driverId() == r.driverId()))
				.toList();

		var seasonCircuits = circuits.stream()
				.filter(c -> seasonRaces.stream().anyMatch(sr -> sr.circuitId() == c.circuitId()))
				.toList();

		return new SeasonDetails(year, seasonRaces, seasonResults, seasonDrivers, seasonCircuits);
	}

	@PostConstruct
	public void init() {
		circuits = CircuitLoader.fromCsv("src/main/resources/circuits.csv");
		drivers = DriverLoader.fromCsv("src/main/resources/drivers.csv");
		results = ResultLoader.fromCsv("src/main/resources/results.csv");
		driverScores = DriverScoreLoader.fromCsv("src/main/resources/driver_standings.csv");
		constructors = ConstructorLoader.fromCsv("src/main/resources/constructors.csv");
		constructorsResults = ConstructorResultLoader.fromCsv("src/main/resources/constructor_results.csv");
		constructorScores = ContructorScoreLoader.fromCsv("src/main/resources/constructor_standings.csv");
		races = RaceLoader.fromCsv("src/main/resources/races.csv");
		statuses = StatusLoader.fromCsv("src/main/resources/status.csv");
	}
}