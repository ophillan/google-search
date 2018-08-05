package com.google.search.db.repositories;

import com.google.search.model.ScheduledKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduledKeywordsRepository extends JpaRepository<ScheduledKeyword, Long> {

  List<ScheduledKeyword> findAll();

  ScheduledKeyword findByKeyword(String keyword);

}
