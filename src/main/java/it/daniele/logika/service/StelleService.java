package it.daniele.logika.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import it.daniele.logika.dto.StelleDto;
import it.daniele.logika.factory.StelleFactory;
import it.daniele.logika.model.Stelle;
import it.daniele.logika.repository.StelleRepository;
import it.daniele.logika.resource.StelleResource;



@Service
public class StelleService {

	private final StelleFactory stelleFactory;
	private final StelleRepository stelleRepository;
	
	public StelleService(StelleFactory stelleFactory, StelleRepository stelleRepository) {
		this.stelleFactory=stelleFactory;
		this.stelleRepository=stelleRepository;
	}
	
	@Transactional
	public StelleResource salva(StelleDto stelleDto) {
		Stelle stelle = stelleFactory.toModel(stelleDto);
		stelle = stelleRepository.save(stelle);
		return stelleFactory.toResource(stelle);
	}

	@Transactional
	public StelleResource aggiorna(StelleDto stelleDto, Long id) {
		Stelle stelle = stelleFactory.toModel(stelleDto);
		stelle.setId(id);
		stelle = stelleRepository.save(stelle);
		return stelleFactory.toResource(stelle);
	}
	
	public List<StelleResource> allStelle() {
		List<Stelle> stelle = stelleRepository.findAll();
		return stelleFactory.toResource(stelle);
	}
	
}
