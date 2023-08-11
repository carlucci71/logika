package it.daniele.logika.controller.grattacieli;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import it.daniele.logika.dto.grattacieli.GrattacieliDto;
import it.daniele.logika.resource.grattacieli.GrattacieliResource;
import it.daniele.logika.service.grattacieli.GrattacieliService;

@RestController
@RequestMapping("logika/grattacieli")
public class GrattacieliController {

	@Autowired
	GrattacieliService grattacieliService;
	
	@PostMapping()
	public ResponseEntity<GrattacieliResource> salvaGrattacieli(@RequestBody GrattacieliDto grattacieliDto) {
		GrattacieliResource salva = grattacieliService.salva(grattacieliDto, null);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}
	@PutMapping("{id}")
	public ResponseEntity<GrattacieliResource> aggiornaGrattacieli(@RequestBody GrattacieliDto grattacieliDto, @PathVariable Long id) {
		GrattacieliResource salva = grattacieliService.salva(grattacieliDto, id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}
	@GetMapping()
	public ResponseEntity<List<GrattacieliResource>> allGrattacieli() {
		List<GrattacieliResource> grattacieli = grattacieliService.allGrattacieli();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(grattacieli);
		
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> cancellaGrattacieli(@PathVariable Long id) {
		grattacieliService.cancella(id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.build();
	}
	

}
