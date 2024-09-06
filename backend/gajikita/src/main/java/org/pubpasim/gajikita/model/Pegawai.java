package org.pubpasim.gajikita.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class Pegawai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "npwp", length=16)
    private String npwp;

    private String nama;
    private String gender;
    private String alamat;
    private String telepon;
    private String email;
    private LocalDate tanggalMasuk;
    private String namaRekeneing;
    private String nomorRekening;

    @ManyToOne
    @JoinColumn(name="id_jabatan", referencedColumnName = "id")
    private Jabatan jabatan;
}
