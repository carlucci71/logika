package it.daniele.logika.service.stelle;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import it.daniele.logika.dto.stelle.StelleDto;
import it.daniele.logika.factory.stelle.StelleFactory;
import it.daniele.logika.model.stelle.Stelle;
import it.daniele.logika.repository.stelle.StelleRepository;
import it.daniele.logika.resource.stelle.StelleResource;



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

	
	@Transactional
	public void cancella(Long id) {
		stelleRepository.deleteById(id);
	}
	
	public List<StelleResource> allStelle() {
		List<Stelle> stelle = stelleRepository.findAll();
		return stelleFactory.toResource(stelle);
	}
	
}
