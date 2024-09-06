package org.pubpasim.gajikita.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Jabatan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String namaJabatan;
    private Double gajiPokok;
}
