package com.backend.SmartList.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "entries")
public class Entry {

    @Id
    private String id;
    private String listId;
    private String name;
    private String rollNo;
    private Instant submittedAt;

    public Entry() {}

    public Entry(String listId, String name, String rollNo) {
        this.listId = listId;
        this.name = name;
        this.rollNo = rollNo;
        this.submittedAt = Instant.now();
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getListId() { return listId; }
    public void setListId(String listId) { this.listId = listId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}
