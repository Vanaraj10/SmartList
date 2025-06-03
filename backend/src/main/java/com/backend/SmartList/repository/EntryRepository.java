package com.backend.SmartList.repository;

import com.backend.SmartList.model.Entry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EntryRepository extends MongoRepository<Entry,String> {
    List<Entry>findByListIdOrderBySubmittedAtDesc(String listId);
}
