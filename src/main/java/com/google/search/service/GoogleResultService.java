package com.google.search.service;

import com.google.search.model.GoogleResult;
import com.google.search.rest.model.GoogleResultRestModel;

import java.io.IOException;
import java.util.List;

public interface GoogleResultService {

  List<GoogleResultRestModel> getGoogleResults(String query) throws IOException;

  GoogleResult getGoogleResultById(Long id);

}
