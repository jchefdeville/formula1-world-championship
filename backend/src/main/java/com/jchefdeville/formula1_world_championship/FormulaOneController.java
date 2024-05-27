package com.jchefdeville.formula1_world_championship;

import java.util.logging.Logger;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormulaOneController {

    private static final Logger logger = Logger.getLogger("FormulaOneController");

    @GetMapping("/get")
    public void getRest() {
        logger.info("hi");
    }
}
