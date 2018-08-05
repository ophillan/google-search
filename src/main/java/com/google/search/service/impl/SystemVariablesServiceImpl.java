package com.google.search.service.impl;

import com.google.search.db.repositories.ScheduledKeywordsRepository;
import com.google.search.model.ScheduledKeyword;
import com.google.search.service.SystemVariablesService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SystemVariablesServiceImpl implements SystemVariablesService {

  @Resource
  private ScheduledKeywordsRepository scheduledKeywordsRepository;

  @Override
  public Set<String> getScheduledKeywords() {
    return scheduledKeywordsRepository.findAll().stream().map(ScheduledKeyword::getKeyword).collect(Collectors.toSet());
  }

  @Override
  public void addScheduledKeyword(String keyword) {
    scheduledKeywordsRepository.save(new ScheduledKeyword(keyword));
  }

  @Override
  public void deleteScheduledKeyword(String keyword) {
    scheduledKeywordsRepository.delete(scheduledKeywordsRepository.findByKeyword(keyword));
  }
}
