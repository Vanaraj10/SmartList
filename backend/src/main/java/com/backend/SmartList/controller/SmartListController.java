package com.backend.SmartList.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.SmartList.model.Entry;
import com.backend.SmartList.model.SmartList;
import com.backend.SmartList.repository.EntryRepository;
import com.backend.SmartList.repository.ListRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class SmartListController {

    private final ListRepository listRepository;
    private final EntryRepository entryRepository;

    public SmartListController(ListRepository listRepository, EntryRepository entryRepository) {
        this.listRepository = listRepository;
        this.entryRepository = entryRepository;
    }

    @PostMapping("/lists")
    public ResponseEntity<SmartList> createList(@RequestBody SmartList list) {
        try {
            // Validate input
            if (list.getTitle() == null || list.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            list.setTitle(list.getTitle().trim());
            if (list.getDescription() != null) {
                list.setDescription(list.getDescription().trim());
            }
            
            list.setCreatedAt(java.time.Instant.now());
            SmartList saved = listRepository.save(list);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/lists/{id}")
    public ResponseEntity<SmartList> getListById(@PathVariable String id) {
        try {
            Optional<SmartList> opt = listRepository.findById(id);
            return opt.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/lists/{id}/entries")
    public ResponseEntity<Entry> submitEntry(@PathVariable String id, @RequestBody Entry entry) {
        try {
            // Validate list exists
            if (!listRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            // Validate input
            if (entry.getName() == null || entry.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (entry.getRollNo() == null || entry.getRollNo().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Check for duplicate entry
            List<Entry> existingEntries = entryRepository.findByListIdOrderBySubmittedAtDesc(id);
            boolean isDuplicate = existingEntries.stream()
                .anyMatch(e -> e.getRollNo().trim().equalsIgnoreCase(entry.getRollNo().trim()));
            
            if (isDuplicate) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            entry.setListId(id);
            entry.setName(entry.getName().trim());
            entry.setRollNo(entry.getRollNo().trim().toUpperCase());
            entry.setSubmittedAt(java.time.Instant.now());
            
            Entry saved = entryRepository.save(entry);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/lists/{id}/entries")
    public ResponseEntity<List<Entry>> getEntriesByListId(@PathVariable String id) {
        try {
            // Validate list exists
            if (!listRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            List<Entry> entries = entryRepository.findByListIdOrderBySubmittedAtDesc(id);
            return ResponseEntity.ok(entries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
