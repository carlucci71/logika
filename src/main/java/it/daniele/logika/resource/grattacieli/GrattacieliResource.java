package it.daniele.logika.resource.grattacieli;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class GrattacieliResource {
	private Long id;	
	private Integer piani;	
	private String nome;
	private List board;
	private Timestamp dataOra;

}
