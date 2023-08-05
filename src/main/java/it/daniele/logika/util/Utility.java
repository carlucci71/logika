package it.daniele.logika.util;

import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class Utility {

	static ObjectMapper mapper=null;

	private static ObjectMapper getMapper() {
		if (mapper==null) {
			mapperGetInstance();
		}
		return mapper;
	}


	private static synchronized void mapperGetInstance() {
		if (mapper==null) {
			mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.registerModule(new JavaTimeModule());
			mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		}
	}


	public static <T> T fromJson(String json, Class<T> clazz)
	{
		try
		{
			return getMapper().readValue(json, clazz);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public static String toJson(Object o)
	{
		try
		{
			byte[] data = getMapper().writeValueAsBytes(o);
			return new String(data, StandardCharsets.ISO_8859_1);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}


}
