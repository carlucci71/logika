package it.daniele.logika.resource.crucipixel;

import java.util.List;

import lombok.Data;

@Data
public class CrucipixelResource {
	private Long id;
	private String nome;
	private List board;
	private List testoBoard;
	private List datiColonnaBoard;
	private List datiRigaBoard;
	
}
