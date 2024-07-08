package com.jchefdeville.formula1_world_championship.model;

import java.util.List;

public record SeasonDetails(
		int year,
		List<Race> races,
		List<Result> results,
		List<Driver> drivers,
		List<Circuit> circuits) {

}
