package com.jchefdeville.formula1_world_championship;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;

@RestController
public class FormulaOneController {

	@GetMapping("/circuits")
	public List<Circuit> getCircuits() {
		return CircuitLoader.fromCsv("src/main/resources/circuits.csv");
	}
}
