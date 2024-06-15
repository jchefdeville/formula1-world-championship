package com.jchefdeville.formula1_world_championship.model;

public record Result(
		int resultId,
		int raceId,
		int driverId,
		int constructorId,
		int number,
		int grid,
		int position,
		String positionText,
		int positionOrder,
		double points,
		int laps,
		String time,
		long milliseconds,
		int fastestLap,
		int rank,
		String fastestLapTime,
		String fastestLapSpeed,
		int statusId) {}