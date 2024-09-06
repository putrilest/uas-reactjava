package org.pubpasim.gajikita.controller;

import java.util.List;
import org.pubpasim.gajikita.model.Pegawai;
import org.pubpasim.gajikita.repository.PegawaiRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/pegawai")
public class PegawaiController {
    PegawaiRepository repository;

    public PegawaiController(PegawaiRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Pegawai> getAll() {
        return repository.findAll();
    }

    @RequestMapping("{id}")
    public Object getById(@PathVariable Long id) {
        Pegawai pegawai = repository.findById(id).orElse(null);
        if (pegawai != null) {
            return pegawai;
        } else {
            return "Pegawai dengan ID " + id + " tidak ditemukan";
        }
    }

    @PostMapping
    public String add(@RequestBody Pegawai pegawai){
        repository.save(pegawai);
        return "Pegawai berhasil disimpan";
    }

    @PutMapping("{id}")
    public String editById(@PathVariable Long id, @RequestBody Pegawai pegawai) {
        Pegawai existingpegawai = repository.findById(id).orElse(null);
        if (existingpegawai != null) {
            pegawai.setId(id); 
            repository.save(pegawai);
            return "Pegawai berhasil di edit.";
        } else {
            return "Pegawai dengan ID " + id + " tidak ditemukan";
        }
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Pegawai berhasil dihapus";
    }
}
