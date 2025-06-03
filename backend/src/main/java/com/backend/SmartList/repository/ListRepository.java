package com.backend.SmartList.repository;

import com.backend.SmartList.model.SmartList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ListRepository  extends MongoRepository<SmartList, String> {
}
