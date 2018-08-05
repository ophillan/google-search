package com.google.search.service.impl;

import com.google.search.db.repositories.GoogleQueryRepository;
import com.google.search.model.GoogleQuery;
import com.google.search.rest.model.GoogleQueryRestModel;
import com.google.search.service.GoogleQueryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoogleQueryServiceImpl implements GoogleQueryService {

  @Resource
  private GoogleQueryRepository googleQueryRepository;

  @Override
  public List<GoogleQueryRestModel> getGoogleQueriesByKeyword(String keyword) {
    return googleQueryRepository.findAllByKeyword(keyword).stream()
        .map(this::transformQuery)
        .collect(Collectors.toList());
  }

  @Override
  public List<GoogleQueryRestModel> getGoogleQueriesBySearchTime(Date date) {
    return googleQueryRepository.findAllBySearchTime(date).stream()
        .map(this::transformQuery)
        .collect(Collectors.toList());
  }

  @Override
  public List<GoogleQueryRestModel> getGoogleQueriesBySearchTimeAndKeyword(Date date, String keyword) {
    return googleQueryRepository.findAllBySearchTimeAndKeyword(date, keyword).stream()
        .map(this::transformQuery)
        .collect(Collectors.toList());
  }

  @Override
  public List<String> getDistinctKeywords() {
    return new ArrayList<>(googleQueryRepository.findDistinctKeywords());
  }

  private GoogleQueryRestModel transformQuery(GoogleQuery query) {
    GoogleQueryRestModel result = new GoogleQueryRestModel();
    result.keyword = query.getKeyword();
    result.searchTime = query.getSearchTime();
    return result;
  }
}
