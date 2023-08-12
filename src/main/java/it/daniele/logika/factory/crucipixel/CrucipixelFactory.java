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
	@Mapping(source = "historyBoard", target = "historyBoard", qualifiedByName = "boardToJson")
	@Mapping(source = "historyRedo", target = "historyRedo", qualifiedByName = "boardToJson")
	@Mapping(source = "historyPhoto", target = "historyPhoto", qualifiedByName = "arrayToString")
	Crucipixel toModel(CrucipixelDto crucipixelDTO);

	
	@Mapping(source = "board", target = "board", qualifiedByName = "jsonToboard")
	@Mapping(source = "testoBoard", target = "testoBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "datiColonnaBoard", target = "datiColonnaBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "datiRigaBoard", target = "datiRigaBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "historyBoard", target = "historyBoard", qualifiedByName = "jsonToboard")
	@Mapping(source = "historyRedo", target = "historyRedo", qualifiedByName = "jsonToboard")
	@Mapping(source = "historyPhoto", target = "historyPhoto", qualifiedByName = "stringToArray")
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
	
	@Named("stringToArray")
	default Integer[] stringToArray(String s) {
		if (s==null || s.isEmpty()) return new Integer[0];
		String[] split = s.split(",");
		if(split.length==0) return new Integer[0];
		Integer[] integer = new Integer[split.length];
		for(int i=0;i<split.length;i++) {
			integer[i]=Integer.parseInt(split[i]);
		}
		return integer;
	}

	@Named("arrayToString")
	default String arrayToString(Integer[] a) {
		if(a == null) return "";
		String ret="";
		for(int i=0;i<a.length;i++) {
			Integer integer = a[i];
			ret+=String.valueOf(integer);
			if (i<a.length-1) {
				ret+= ",";
			}
		}
		return ret;
	}
	
	
}



