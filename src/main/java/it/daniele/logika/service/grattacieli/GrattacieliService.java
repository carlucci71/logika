package it.daniele.logika.service.grattacieli;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import it.daniele.logika.dto.grattacieli.GrattacieliDto;
import it.daniele.logika.factory.grattacieli.GrattacieliFactory;
import it.daniele.logika.model.grattacieli.Grattacieli;
import it.daniele.logika.repository.grattacieli.GrattacieliRepository;
import it.daniele.logika.resource.grattacieli.GrattacieliResource;



@Service
public class GrattacieliService {

	private final GrattacieliFactory grattacieliFactory;
	private final GrattacieliRepository grattacieliRepository;
	
	public GrattacieliService(GrattacieliFactory grattacieliFactory, GrattacieliRepository grattacieliRepository) {
		this.grattacieliFactory=grattacieliFactory;
		this.grattacieliRepository=grattacieliRepository;
	}
	
	@Transactional
	public GrattacieliResource salva(GrattacieliDto grattacieliDto) {
		Grattacieli grattacieli = grattacieliFactory.toModel(grattacieliDto);
		grattacieli = grattacieliRepository.save(grattacieli);
		return grattacieliFactory.toResource(grattacieli);
	}

	@Transactional
	public GrattacieliResource aggiorna(GrattacieliDto grattacieliDto, Long id) {
		Grattacieli grattacieli = grattacieliFactory.toModel(grattacieliDto);
		grattacieli.setId(id);
		grattacieli = grattacieliRepository.save(grattacieli);
		return grattacieliFactory.toResource(grattacieli);
	}
	public List<GrattacieliResource> allGrattacieli() {
		List<Grattacieli> grattacieli = grattacieliRepository.findAll();
		return grattacieliFactory.toResource(grattacieli);
	}
	@Transactional
	public void cancella(Long id) {
		grattacieliRepository.deleteById(id);
	}
	
}
