package com.google.search.rest;

import com.google.search.service.SystemVariablesService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Set;

@RestController
public class KeywordsRestResource {

  @Resource
  private SystemVariablesService systemVariablesService;

  @RequestMapping(value = "/get-scheduled-keywords", method = RequestMethod.GET)
  public Set<String> getScheduledKeywords() {
    return systemVariablesService.getScheduledKeywords();
  }

  @RequestMapping(value = "/save-scheduled-keyword", method = RequestMethod.POST)
  public void save(@RequestParam("keyword") String keyword) {
    systemVariablesService.addScheduledKeyword(keyword);
  }

  @RequestMapping(value = "/delete-scheduled-keyword", method = RequestMethod.POST)
  public void delete(@RequestParam("keyword") String keyword) {
    systemVariablesService.deleteScheduledKeyword(keyword);
  }

}
