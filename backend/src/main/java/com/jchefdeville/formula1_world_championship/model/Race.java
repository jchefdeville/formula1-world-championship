package com.jchefdeville.formula1_world_championship.model;

import java.time.LocalDate;
import java.time.LocalTime;

public record Race(
		int raceId,
		int year,
		int round,
		int circuitId,
		String name,
		LocalDate date,
		LocalTime time,
		String url,
		LocalDate fp1Date,
		LocalTime fp1Time,
		LocalDate fp2Date,
		LocalTime fp2Time,
		LocalDate fp3Date,
		LocalTime fp3Time,
		LocalDate qualifyingDate,
		LocalTime qualifyingTime,
		LocalDate sprintDate,
		LocalTime sprintTime) {

}
