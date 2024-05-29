package com.jchefdeville.formula1_world_championship;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jchefdeville.formula1_world_championship.loader.CircuitLoader;
import com.jchefdeville.formula1_world_championship.model.Circuit;

@RestController
public class FormulaOneController {

	private static final Logger logger = LoggerFactory.getLogger("FormulaOneController");

	@GetMapping("/circuits")
	public List<Circuit> getRest() {
		return CircuitLoader.fromCsv("src/main/resources/circuits.csv");
	}
}
