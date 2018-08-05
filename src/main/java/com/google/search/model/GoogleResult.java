package com.google.search.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "GOOGLE_RESULT", schema = "martm")
public class GoogleResult implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID", unique = true, nullable = false)
  private Long id;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @Column(name = "DESCRIPTION")
  private String description;

  @Column(name = "LINK", nullable = false)
  private String link;

  @Column(name = "GOOGLE_LINK")
  private String googleLink;

  protected GoogleResult() {
  }

  public GoogleResult(String title,
                      String description,
                      String link,
                      String googleLink) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.googleLink = googleLink;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getLink() {
    return link;
  }

  public String getGoogleLink() {
    return googleLink;
  }

  @Override
  public String toString() {
    return "GoogleResultRestModel: " + title;
  }
}
