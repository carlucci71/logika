package it.daniele.logika.resource.crucipixel;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class CrucipixelResource {
	private Long id;
	private String nome;
	private int historyPhoto;
	private List board;
	private List testoBoard;
	private List datiColonnaBoard;
	private List datiRigaBoard;
	private List historyBoard;
	private Timestamp dataOra;
	
}
