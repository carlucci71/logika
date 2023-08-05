package it.daniele.logika.resource;

import java.util.List;

import lombok.Data;

@Data
public class StelleResource {
	private Long id;
	private String stellePerZona;
	private String nome;
	private List board;
	private List boardGioco;
	private int zone;
	
}
