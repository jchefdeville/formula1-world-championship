package com.jchefdeville.formula1_world_championship;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.loader.ConstructorLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;
import com.jchefdeville.formula1_world_championship.model.Constructor;

@RestController
public class FormulaOneController {

	@GetMapping("/circuits")
	public List<Circuit> getCircuits() {
		return CircuitLoader.fromCsv("src/main/resources/circuits.csv");
	}

	@GetMapping("/constructors")
	public List<Constructor> getConstructors() {
		return ConstructorLoader.fromCsv("src/main/resources/constructors.csv");
	}
}
