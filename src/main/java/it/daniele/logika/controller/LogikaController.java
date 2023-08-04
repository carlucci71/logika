package it.daniele.logika.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("logika")
public class LogikaController {

	@GetMapping("/all")
	public ResponseEntity<List<String>> all() {
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		List<String> ret = new ArrayList<>();
		ret.add("ciao");
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(ret);
		
		
	}



}
