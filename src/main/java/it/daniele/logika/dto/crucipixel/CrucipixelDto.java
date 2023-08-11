package it.daniele.logika.dto.crucipixel;

import java.util.List;

import lombok.Data;

@Data
public class CrucipixelDto {
	private String nome;
	private List board;
	private List testoBoard;
	private List datiColonnaBoard;
	private List datiRigaBoard;
	private List historyBoard;
	private int historyPhoto;
}
