package it.daniele.logika;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
public class MainClass {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(MainClass.class, args);
		
	}

}
