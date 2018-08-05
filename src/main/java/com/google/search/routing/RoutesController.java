package com.google.search.routing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RoutesController {

  @RequestMapping(value = "/")
  public String index() {
    return "index";
  }

  @RequestMapping(value = "/landing")
  public String landing() {
    return "landing";
  }

  @RequestMapping(value = "/saved")
  public String saved() {
    return "saved";
  }

  @RequestMapping(value = "/keywords")
  public String keywords() {
    return "keywords";
  }

  @RequestMapping(value = "/query-details")
  public String queryDetails() {
    return "query-details";
  }

}
