package it.daniele.logika.service.crucipixel;

import java.sql.Timestamp;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import it.daniele.logika.dto.crucipixel.CrucipixelDto;
import it.daniele.logika.factory.crucipixel.CrucipixelFactory;
import it.daniele.logika.model.crucipixel.Crucipixel;
import it.daniele.logika.repository.crucipixel.CrucipixelRepository;
import it.daniele.logika.resource.crucipixel.CrucipixelResource;



@Service
public class CrucipixelService {

	private final CrucipixelFactory crucipixelFactory;
	private final CrucipixelRepository crucipixelRepository;
	
	public CrucipixelService(CrucipixelFactory crucipixelFactory, CrucipixelRepository crucipixelRepository) {
		this.crucipixelFactory=crucipixelFactory;
		this.crucipixelRepository=crucipixelRepository;
	}
	
	@Transactional
	public CrucipixelResource salva(CrucipixelDto crucipixelDto, Long id) {
		Crucipixel crucipixel = crucipixelFactory.toModel(crucipixelDto);
		if (id!=null) {
			crucipixel.setId(id);
		}
		crucipixel.setDataOra(new Timestamp(System.currentTimeMillis()));
		crucipixel = crucipixelRepository.save(crucipixel);
		return crucipixelFactory.toResource(crucipixel);
	}

	
	@Transactional
	public void cancella(Long id) {
		crucipixelRepository.deleteById(id);
	}
	
	public List<CrucipixelResource> allCrucipixel() {
		List<Crucipixel> crucipixel = crucipixelRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		return crucipixelFactory.toResource(crucipixel);
	}
	
}
