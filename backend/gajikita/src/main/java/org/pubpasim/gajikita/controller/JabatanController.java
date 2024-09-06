package org.pubpasim.gajikita.controller;

import java.util.List;

import org.pubpasim.gajikita.model.Jabatan;
import org.pubpasim.gajikita.repository.JabatanRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/jabatan")
public class JabatanController {
    JabatanRepository repository;

    public JabatanController(JabatanRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Jabatan> getAll() {
        return repository.findAll();
    }

    @RequestMapping("{id}")
    public Object getById(@PathVariable Long id) {
        Jabatan jabatan = repository.findById(id).orElse(null);
        if (jabatan != null) {
            return jabatan;
        } else {
            return "Jabatan dengan ID " + id + " tidak ditemukan";
        }
    }

    @PostMapping
    public String add(@RequestBody Jabatan jabatan){
        repository.save(jabatan);
        return "Jabatan berhasil disimpan";
    }

    @PutMapping("{id}")
    public String editById(@PathVariable Long id, @RequestBody Jabatan jabatan) {
        Jabatan existingjabatan = repository.findById(id).orElse(null);
        if (existingjabatan != null) {
            jabatan.setId(id); 
            repository.save(jabatan);
            return "Jabatan berhasil di edit.";
        } else {
            return "Jabatan dengan ID " + id + " tidak ditemukan";
        }
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Jabatan berhasil dihapus";
    }

}
