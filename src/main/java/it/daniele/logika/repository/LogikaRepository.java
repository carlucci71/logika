package it.daniele.logika.repository;

//@Repository
public interface LogikaRepository {//extends JpaRepository<Quiz, Long>,QuizExtendedRepository{
	/*
	
	@Query(value="select * from quiz where id in (select id_quiz from log where id = (select max(id) from log))", nativeQuery = true)
	public Quiz soluzione();
	*/
	
	
	
}
