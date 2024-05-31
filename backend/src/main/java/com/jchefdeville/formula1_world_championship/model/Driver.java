package com.jchefdeville.formula1_world_championship.model;

public record Driver(
		int driverId,
		String driverRef,
		int number,
		String code,
		String forename,
		String surname,
		String dob,
		String nationality,
		String url
		) {}