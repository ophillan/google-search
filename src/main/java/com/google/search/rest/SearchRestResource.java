package com.google.search.rest;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.search.rest.model.GoogleResultRestModel;
import com.google.search.service.GoogleResultService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.ws.rs.QueryParam;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
public class SearchRestResource {

  @Resource
  private GoogleResultService googleResultService;

  /*
  @RequestMapping(value = "/save-search", method = RequestMethod.POST)
  public void save(@RequestParam("title") String title,
                   @RequestParam("keyword") String keyword,
                   @RequestParam("description") String description,
                   @RequestParam("link") String link,
                   @RequestParam(value = "googleLink", required = false) String googleLink) {
    GoogleResult document = new GoogleResult(title, keyword, description, link, googleLink, new Date());
    googleResultRepository.save(document);
  }

  @RequestMapping(value = "/saved-searches", method = RequestMethod.GET)
  public String getSavedSearches(@RequestParam(name = "date1") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate date1,
                                 @RequestParam(name = "date2") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate date2) {
    List<GoogleResult> bySearchTimeIsBetween = googleResultRepository.findBySearchTimeIsBetween(toDate(date1), toDate(date2));
    GsonBuilder builder = new GsonBuilder().setDateFormat("dd.MM.yyyy");
    Gson gson = builder.create();
    return gson.toJson(bySearchTimeIsBetween);
  }
  */

  /*
  @RequestMapping(value = "/get-saved-results-by-keyword", method = RequestMethod.GET)
  public String getSavedSearchesByKeyword(@RequestParam("keyword") String keyword)
      throws IOException {
    List<GoogleResultRestModel> googleResults = googleResultService.getGoogleResultsByKeyword(keyword);
    return new ObjectMapper().writeValueAsString(googleResults);
  }
  */

  @JsonAnyGetter
  @RequestMapping(value = "/get-google-results", method = RequestMethod.GET)
  public String getGoogleResults(@QueryParam("q") String q) throws IOException {
    List<GoogleResultRestModel> googleResults = googleResultService.getGoogleResults(q);
    return new ObjectMapper().writeValueAsString(googleResults);
  }

  private Date toDate(LocalDate localDate) {
    return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
  }

}
