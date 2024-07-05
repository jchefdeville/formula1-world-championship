package com.jchefdeville.formula1_world_championship.model;

public record DriverScore(
		int driverStandingsId,
		int raceId,
		int driverId,
		double points,
		int position,
		String positionText,
		int wins)

{}
