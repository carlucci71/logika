package it.daniele.logika.controller.crucipixel;

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

import it.daniele.logika.dto.crucipixel.CrucipixelDto;
import it.daniele.logika.resource.crucipixel.CrucipixelResource;
import it.daniele.logika.service.crucipixel.CrucipixelService;


@RestController
@RequestMapping("logika/crucipixel")
public class CrucipixelController {

	private final CrucipixelService crucipixelService;
	
	public CrucipixelController(CrucipixelService crucipixelService) {
		this.crucipixelService=crucipixelService;
	}
	
	
	@PostMapping()
	public ResponseEntity<CrucipixelResource> salvaCrucipixel(@RequestBody CrucipixelDto crucipixelDto) {
		CrucipixelResource salva = crucipixelService.salva(crucipixelDto, null);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}

	@PutMapping("{id}")
	public ResponseEntity<CrucipixelResource> aggiornaCrucipixel(@RequestBody CrucipixelDto crucipixelDto, @PathVariable Long id) {
		CrucipixelResource salva = crucipixelService.salva(crucipixelDto, id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(salva);
	}

	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> cancellaCrucipixel(@PathVariable Long id) {
		crucipixelService.cancella(id); 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.build();
	}
	
	@GetMapping()
	public ResponseEntity<List<CrucipixelResource>> allCrucipixel() {
		List<CrucipixelResource> crucipixel = crucipixelService.allCrucipixel();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Time-Attuale", LocalDateTime.now().toString());
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(crucipixel);
		
	}


}
