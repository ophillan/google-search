package com.google.search.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.search.service.GoogleQueryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;

@RestController
public class GoogleQueryRestResource {

  @Resource
  private GoogleQueryService googleQueryService;

  @RequestMapping(value = "/get-saved-results-by-keyword", method = RequestMethod.GET)
  public String getSavedSearchesByKeyword(@RequestParam("keyword") String keyword) throws JsonProcessingException {
    return new ObjectMapper().writeValueAsString(googleQueryService.getGoogleQueriesByKeyword(keyword));
  }

  @RequestMapping(value = "/get-saved-results-by-search-time", method = RequestMethod.GET)
  public String getSavedSearchesByKeyword(@RequestParam("keyword") Date date) throws JsonProcessingException {
    return new ObjectMapper().writeValueAsString(googleQueryService.getGoogleQueriesBySearchTime(date));
  }

  @RequestMapping(value = "/get-distinct-keywords", method = RequestMethod.GET)
  public String getDistinctKeywords() throws JsonProcessingException {
    return new ObjectMapper().writeValueAsString(googleQueryService.getDistinctKeywords());
  }

}
