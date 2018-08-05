package com.google.search.db.repositories;

import com.google.search.model.GoogleQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface GoogleQueryRepository extends JpaRepository<GoogleQuery, Long> {

  List<GoogleQuery> findAllByKeyword(String keyword);

  List<GoogleQuery> findAllBySearchTime(Date date);

  List<GoogleQuery> findAllBySearchTimeAndKeyword(Date date, String keyword);

  @Query(value = "SELECT DISTINCT KEYWORD FROM GOOGLE_QUERY", nativeQuery = true)
  List<String> findDistinctKeywords();

}
