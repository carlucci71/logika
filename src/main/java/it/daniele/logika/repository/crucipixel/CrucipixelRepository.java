package it.daniele.logika.repository.crucipixel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.daniele.logika.model.crucipixel.Crucipixel;

@Repository
public interface CrucipixelRepository extends JpaRepository<Crucipixel, Long>,CrucipixelExtendedRepository{
	/*
	
	@Query(value="select * from quiz where id in (select id_quiz from log where id = (select max(id) from log))", nativeQuery = true)
	public Quiz soluzione();
	*/
	
	
	
}
