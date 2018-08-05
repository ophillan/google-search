package com.google.search.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "GOOGLE_QUERY", schema = "martm")
public class GoogleQuery implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID", unique = true, nullable = false)
  private Long id;

  @Column(name = "KEYWORD", nullable = false)
  private String keyword;

  @Temporal(TemporalType.DATE)
  @DateTimeFormat(pattern = "DD-MM-YYYY")
  @Column(name = "SEARCH_TIME", nullable = false)
  private Date searchTime;

  @Column(name = "RESULT_ID", nullable = false)
  private Long resultId;

  public GoogleQuery() {
  }

  public GoogleQuery(String keyword, Date searchTime, Long resultId) {
    this.keyword = keyword;
    this.searchTime = searchTime;
    this.resultId = resultId;
  }

  public String getKeyword() {
    return keyword;
  }

  public Date getSearchTime() {
    return searchTime;
  }

  @Override
  public String toString() {
    return "GoogleQuery{" + "id=" + id + ", keyword='" + keyword + '\'' + ", searchTime=" + searchTime + ", resultId='"
        + resultId + '\'' + '}';
  }
}
