package it.daniele.logika.repository.crucipixel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.daniele.logika.model.crucipixel.Crucipixel;

@Repository
public interface CrucipixelRepository extends JpaRepository<Crucipixel, Long>,CrucipixelExtendedRepository{

	@Query(value="select new it.daniele.logika.model.crucipixel.Crucipixel(c.id, c.nome) from Crucipixel c order by c.id")
	public List<Crucipixel> idNomeFromCrucipixel();
	
	
	

	
	
}
