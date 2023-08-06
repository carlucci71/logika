package it.daniele.logika.factory.grattacieli;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import it.daniele.logika.dto.grattacieli.GrattacieliDto;
import it.daniele.logika.model.grattacieli.Grattacieli;
import it.daniele.logika.resource.grattacieli.GrattacieliResource;
import it.daniele.logika.util.Utility;


@Mapper(componentModel = "spring")
public interface GrattacieliFactory {

	@Mapping(source = "board", target = "board", qualifiedByName = "boardToJson")
	Grattacieli toModel(GrattacieliDto grattacieliDTO);

	
	@Mapping(source = "board", target = "board", qualifiedByName = "jsonToboard")
	GrattacieliResource toResource(Grattacieli grattacieli);

	List<GrattacieliResource> toResource(List<Grattacieli> grattacieli);
	
	
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



