package com.google.search.service;

import java.util.Set;

public interface SystemVariablesService {

  Set<String> getScheduledKeywords();

  void addScheduledKeyword(String keyword);

  void deleteScheduledKeyword(String keyword);

}
