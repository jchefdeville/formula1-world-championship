package com.jchefdeville.formula1_world_championship.model;

public record ConstructorScore(
		int constructorStandingsId,
		int raceId,
		int constructorId,
		double points,
		int position,
		String positionText,
		int wins)
{}
