package org.pubpasim.gajikita.controller;

import java.util.List;

import org.pubpasim.gajikita.model.Penggajian;
import org.pubpasim.gajikita.repository.PenggajianRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/penggajian")
public class PenggajianController {
    PenggajianRepository repository;

    public PenggajianController(PenggajianRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Penggajian> getAll() {
        return repository.findAll();
    }

    @RequestMapping("{id}")
    public Object getById(@PathVariable Long id) {
        Penggajian penggajian = repository.findById(id).orElse(null);
        if (penggajian != null) {
            return penggajian;
        } else {
            return "Penggajian dengan ID " + id + " tidak ditemukan";
        }
    }

    @PostMapping
    public String add(@RequestBody Penggajian penggajian){
        repository.save(penggajian);
        return "Penggajian berhasil disimpan";
    }

    @PutMapping("{id}")
    public String editById(@PathVariable Long id, @RequestBody Penggajian penggajian) {
        Penggajian existingpenggajian = repository.findById(id).orElse(null);
        if (existingpenggajian != null) {
            penggajian.setId(id); 
            repository.save(penggajian);
            return "Penggajian berhasil di edit.";
        } else {
            return "Penggajian dengan ID " + id + " tidak ditemukan";
        }
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Penggajian berhasil dihapus";
    }
}
