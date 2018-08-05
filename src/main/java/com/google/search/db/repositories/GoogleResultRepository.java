package com.google.search.db.repositories;

import com.google.search.model.GoogleResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoogleResultRepository extends JpaRepository<GoogleResult, Long> {

  GoogleResult findById(Long id);

}
