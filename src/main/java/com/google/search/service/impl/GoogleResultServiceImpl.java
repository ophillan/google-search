package com.google.search.service.impl;

import com.google.search.db.repositories.GoogleQueryRepository;
import com.google.search.db.repositories.GoogleResultRepository;
import com.google.search.model.GoogleQuery;
import com.google.search.model.GoogleResult;
import com.google.search.rest.model.GoogleResultRestModel;
import com.google.search.service.GoogleResultService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class GoogleResultServiceImpl implements GoogleResultService {

  @Resource
  private GoogleResultRepository googleResultRepository;
  @Resource
  private GoogleQueryRepository googleQueryRepository;

  private static final String GOOGLE_SEARCH_URL = "https://www.google.ee/search";

  @Override
  public List<GoogleResultRestModel> getGoogleResults(String queryParam) throws IOException {
    String searchURL = GOOGLE_SEARCH_URL + "?q=" + queryParam + "&num=20";

    //without proper User-Agent, we will get 403 error
    Document doc = Jsoup.connect(searchURL).userAgent("Mozilla/5.0").get();

    //below will print HTML data, save it to a file and open in browser to compare
    //System.out.println(doc.html());

    //If google search results HTML change the <h3 class="r" to <h3 class="r1"
    //we need to change below accordingly
    Elements results = doc.select("h3.r > a");

    Elements relevantResults = doc.select("#ires > ol > .g");
    List<GoogleResultRestModel> bla = new ArrayList<>();

    for (Element relevantResult : relevantResults) {
      Elements snippet = relevantResult.getElementsByClass("st");
      List<Element> links = relevantResult.getElementsByClass("r");
      Elements cite = relevantResult.getElementsByTag("cite");
      Element element = links.get(0);
      String hrefTemp = element.getElementsByTag("a").attr("href");
      String title = element.text();
      String description = snippet.text();
      String googleLink = hrefTemp.substring(7, hrefTemp.length());
      String link = cite.text();
      GoogleResultRestModel googleResultRestModel = new GoogleResultRestModel();
      googleResultRestModel.title = title;
      googleResultRestModel.description = description;
      googleResultRestModel.googleLink = googleLink;
      googleResultRestModel.link = link;
      googleResultRestModel.searchTime = new Date();
      GoogleResult save = googleResultRepository.save(new GoogleResult(title, description, link, googleLink));
      GoogleQuery save1 = googleQueryRepository.save(new GoogleQuery(queryParam, new Date(), save.getId()));
      bla.add(googleResultRestModel);
    }

    return bla;
  }

  @Override
  public GoogleResult getGoogleResultById(Long id) {
    return googleResultRepository.findById(id);
  }

}
