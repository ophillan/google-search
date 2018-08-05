package com.google.search.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.search.rest.model.GoogleQueryRestModel;
import com.google.search.service.GoogleQueryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
public class GoogleResultsRestService {

  @Resource
  private GoogleQueryService googleQueryService;

  @RequestMapping(value = "/get-saved-results-by-date-and-keyword", method = RequestMethod.GET)
  public String getSavedSearchesByDateAndKeyword(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate date,
                                                 @RequestParam("keyword") String keyword)
      throws JsonProcessingException {
    List<GoogleQueryRestModel> googleQueriesBySearchTimeAndKeyword =
        googleQueryService.getGoogleQueriesBySearchTimeAndKeyword(toDate(date),
                                                                  keyword);
    return new ObjectMapper().writeValueAsString(googleQueryService.getGoogleQueriesBySearchTimeAndKeyword(toDate(date),
                                                                                                           keyword));
  }

  private Date toDate(LocalDate localDate) {
    return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
  }


}
