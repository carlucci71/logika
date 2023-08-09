package it.daniele.logika.factory.crucipixel;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import it.daniele.logika.dto.crucipixel.CrucipixelDto;
import it.daniele.logika.model.crucipixel.Crucipixel;
import it.daniele.logika.resource.crucipixel.CrucipixelResource;
import it.daniele.logika.util.Utility;


@Mapper(componentModel = "spring")
public interface CrucipixelFactory {


	
	
	@Mapping(source = "board", target = "board", qualifiedByName = "boardToJson")
	@Mapping(source = "testoBoard", target = "testoBoard", qualifiedByName = "boardToJson")
	@Mapping(source = "datiColonnaBoard", target = "datiColonnaBoard", qualifiedByName = "boardToJson")
	@Mapping(source = "datiRigaBoard", target = "datiRigaBoard", qualifiedByName = "boardToJson")
	Crucipixel toModel(CrucipixelDto crucipixelDTO);

	
	@Mapping(source = "board", target = "board", qualifiedByName = "jsonToboard")
	@Mapping(source = "testoBoard", target = "testoBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "datiColonnaBoard", target = "datiColonnaBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "datiRigaBoard", target = "datiRigaBoard", qualifiedByName = "jsonToboard")
	CrucipixelResource toResource(Crucipixel crucipixel);

	List<CrucipixelResource> toResource(List<Crucipixel> crucipixel);
	
	
	@Named("boardToJson")
	default String boardToJson(List l) {
		return Utility.toJson(l);
	}

	@Named("jsonToboard")
	default List jsonToboard(String json) {
		if(json == null || json.isEmpty()) return new ArrayList<>();
		return Utility.fromJson(json, List.class);
	}
	
	
}



