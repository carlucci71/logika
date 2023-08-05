package it.daniele.logika.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.daniele.logika.model.Stelle;

@Repository
public interface StelleRepository extends JpaRepository<Stelle, Long>,StelleExtendedRepository{
	/*
	
	@Query(value="select * from quiz where id in (select id_quiz from log where id = (select max(id) from log))", nativeQuery = true)
	public Quiz soluzione();
	*/
	
	
	
}
