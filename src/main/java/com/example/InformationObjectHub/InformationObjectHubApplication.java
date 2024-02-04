package com.example.InformationObjectHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class InformationObjectHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(InformationObjectHubApplication.class, args);
	}

}
