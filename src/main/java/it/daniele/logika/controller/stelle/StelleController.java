package it.daniele.logika.controller.stelle;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.daniele.logika.dto.stelle.StelleDto;
import it.daniele.logika.resource.stelle.StelleResource;
import it.daniele.logika.service.stelle.StelleService;


@RestController
@RequestMapping("logika/stelle")
public class StelleController {

	private final StelleService stelleService;
	
	public StelleController(StelleService stelleService) {
		this.stelleService=stelleService;
	}
	
	
	@PostMapping()
	public ResponseEntity<StelleResource> salvaStelle(@RequestBody StelleDto stelleDto) {
		StelleResource salva = stelleService.salva(stelleDto, null);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}

	@PutMapping("{id}")
	public ResponseEntity<StelleResource> aggiornaStelle(@RequestBody StelleDto stelleDto, @PathVariable Long id) {
		StelleResource salva = stelleService.salva(stelleDto, id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}

	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> cancellaStelle(@PathVariable Long id) {
		stelleService.cancella(id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.build();
	}
	
	@GetMapping()
	public ResponseEntity<List<StelleResource>> allStelle() {
		List<StelleResource> stelle = stelleService.allStelle();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(stelle);
		
	}


}
