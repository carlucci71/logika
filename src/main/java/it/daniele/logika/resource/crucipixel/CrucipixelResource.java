package it.daniele.logika.resource.crucipixel;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class CrucipixelResource {
	private Long id;
	private String nome;
	private String note;
	private Integer[] historyPhoto;
	private List board;
	private List testoBoard;
	private List datiColonnaBoard;
	private List datiRigaBoard;
	private List historyBoard;
	private List historyRedo;
	private Timestamp dataOra;
	
}
