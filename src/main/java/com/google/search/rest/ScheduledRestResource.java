package com.google.search.rest;

import com.google.search.service.GoogleResultService;
import com.google.search.service.SystemVariablesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;

@Component
public class ScheduledRestResource {

  @Resource
  private GoogleResultService googleResultService;
  @Resource
  private SystemVariablesService systemVariablesService;

  private static final Logger LOGGER = LoggerFactory.getLogger(ScheduledRestResource.class);

  @Scheduled(fixedRate = 300000)
  public void reportCurrentTime() {
    /* try {
      for (String keyword : systemVariablesService.getScheduledKeywords()) {
        List<GoogleResultRestModel> googleResults = googleResultService.getGoogleResults(keyword);

      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    */
    LOGGER.info("CurrentTime: " + new Date());
  }

}
