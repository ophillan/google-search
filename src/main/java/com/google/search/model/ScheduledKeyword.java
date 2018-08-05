package com.google.search.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SCHEDULED_KEYWORDS", schema = "martm")
public class ScheduledKeyword {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID", unique = true, nullable = false)
  private Long id;

  @Column(name = "KEYWORD", unique = true, nullable = false)
  private String keyword;

  protected ScheduledKeyword() {
  }

  public ScheduledKeyword(String keyword) {
    this.keyword = keyword;
  }

  public String getKeyword() {
    return keyword;
  }

  @Override
  public String toString() {
    return "Scheduled query keyword: " + keyword;
  }
}
