package it.daniele.logika.service.stelle;

import java.sql.Timestamp;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
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
	public StelleResource salva(StelleDto stelleDto, Long id) {
		Stelle stelle = stelleFactory.toModel(stelleDto);
		if (id != null) {
			stelle.setId(id);
		}
		stelle.setDataOra(new Timestamp(System.currentTimeMillis()));
		stelle = stelleRepository.save(stelle);
		return stelleFactory.toResource(stelle);
	}

	
	@Transactional
	public void cancella(Long id) {
		stelleRepository.deleteById(id);
	}
	
	public List<StelleResource> allStelle() {
		List<Stelle> stelle = stelleRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		return stelleFactory.toResource(stelle);
	}
	
}
