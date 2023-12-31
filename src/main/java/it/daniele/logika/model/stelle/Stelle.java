package it.daniele.logika.model.stelle;

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
@Table(name = "stelle")
public class Stelle	 {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;	
	 private Integer stellePerZona;
	 private String nome;
     private Integer zone;
	 @Column(columnDefinition = "TEXT")
	 private String board;
	 @Column(columnDefinition = "TEXT")
	 private String boardGioco;
	 @Column(name = "data_ora")
	 private Timestamp dataOra;
	
}
