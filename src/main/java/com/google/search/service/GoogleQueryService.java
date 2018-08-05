package com.google.search.service;

import com.google.search.rest.model.GoogleQueryRestModel;

import java.util.Date;
import java.util.List;

public interface GoogleQueryService {

  List<GoogleQueryRestModel> getGoogleQueriesByKeyword(String keyword);

  List<GoogleQueryRestModel> getGoogleQueriesBySearchTime(Date date);

  List<GoogleQueryRestModel> getGoogleQueriesBySearchTimeAndKeyword(Date date, String keyword);

  List<String> getDistinctKeywords();

}
