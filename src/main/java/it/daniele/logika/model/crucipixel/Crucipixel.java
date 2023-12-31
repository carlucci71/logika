package it.daniele.logika.model.crucipixel;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "crucipixel")
public class Crucipixel	 {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;	
	 private String nome;
	 private String note;
	 @Column(columnDefinition = "TEXT")
	 private String board;
	 @Column(columnDefinition = "TEXT")
	 private String testoBoard;
	 @Column(columnDefinition = "TEXT")
	 private String datiColonnaBoard;
	 @Column(columnDefinition = "TEXT")
	 private String datiRigaBoard;
	 @Column(columnDefinition = "TEXT")
	 private String historyBoard;
	 @Column(columnDefinition = "TEXT")
	 private String historyRedo;
	 @Column(name = "data_ora")
	 private Timestamp dataOra;
     private String historyPhoto;
	public Crucipixel(Long id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}
	
     
     
}
