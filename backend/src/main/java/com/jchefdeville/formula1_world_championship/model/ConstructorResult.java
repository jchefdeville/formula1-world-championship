package com.jchefdeville.formula1_world_championship.model;

public record ConstructorResult(
		int constructorResultsId,
		int raceId,
		int constructorId,
		double points,
		String status)
{}
