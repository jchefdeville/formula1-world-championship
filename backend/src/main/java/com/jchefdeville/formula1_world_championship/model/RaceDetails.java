package com.jchefdeville.formula1_world_championship.model;

import java.util.List;

public record RaceDetails(
        Race race,
        List<Result> results,
        List<Driver> drivers,
        List<Status> statuses)
{}
