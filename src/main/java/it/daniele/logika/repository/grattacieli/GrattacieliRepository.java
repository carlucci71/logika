package it.daniele.logika.repository.grattacieli;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.daniele.logika.model.grattacieli.Grattacieli;

@Repository
public interface GrattacieliRepository extends JpaRepository<Grattacieli, Long>,GrattacieliExtendedRepository{
	/*
	
	@Query(value="select * from quiz where id in (select id_quiz from log where id = (select max(id) from log))", nativeQuery = true)
	public Quiz soluzione();
	*/
	
	
	
}
