package it.daniele.logika.dto;

import java.util.List;

import lombok.Data;

@Data
public class StelleDto {
	private Integer stellePerZona;
	private String nome;
	private List board;
	private List boardGioco;
	private Integer zone;
	
}
