package com.jchefdeville.formula1_world_championship.model;

public record Circuit(
	    int circuitId,
	    String circuitRef,
	    String name,
	    String location,
	    String country,
	    double lat,
	    double lng,
	    int alt,
	    String url
) {}