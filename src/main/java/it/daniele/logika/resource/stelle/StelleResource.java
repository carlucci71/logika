package it.daniele.logika.resource.stelle;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class StelleResource {
	private Long id;
	private Integer stellePerZona;
	private String nome;
	private List board;
	private List boardGioco;
	private Integer zone;
	private Timestamp dataOra;
	
}
