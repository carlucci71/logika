package it.daniele.logika.factory.stelle;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import it.daniele.logika.dto.stelle.StelleDto;
import it.daniele.logika.model.stelle.Stelle;
import it.daniele.logika.resource.stelle.StelleResource;
import it.daniele.logika.util.Utility;


@Mapper(componentModel = "spring")
public interface StelleFactory {

	@Mapping(source = "board", target = "board", qualifiedByName = "boardToJson")
	@Mapping(source = "boardGioco", target = "boardGioco", qualifiedByName = "boardToJson")
	Stelle toModel(StelleDto stelleDTO);

	
	@Mapping(source = "board", target = "board", qualifiedByName = "jsonToboard")
	@Mapping(source = "boardGioco", target = "boardGioco", qualifiedByName = "jsonToboard")
	StelleResource toResource(Stelle stelle);

	List<StelleResource> toResource(List<Stelle> stelle);
	
	
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



