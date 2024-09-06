package org.pubpasim.gajikita.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Penggajian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate periode;

    @ManyToOne
    @JoinColumn(name = "id_pegawai", referencedColumnName = "id")
    private Pegawai pegawai;

    private Long gajiPokok;
    private Long tunjanganTransport;
    private Long tunjanganMakan;
    private Long potonganGaji;
    private Long bpjsKesehatan;
    private Long jht;
    private Long thr;
    private Long bonus;
    private Long gajiBersih;

    @PrePersist
    @PreUpdate
    public void hitungTunjangan() {
        if (pegawai != null && pegawai.getJabatan() != null) {
            double gajiPokok = pegawai.getJabatan().getGajiPokok();
            setGajiPokok(Math.round(gajiPokok));

            // Hitung Tunjangan Makan (15% dari Gaji Pokok)
            double presentaseTunjanganMakan = 0.15;
            double hitungTunjanganMakan = gajiPokok * presentaseTunjanganMakan;
            setTunjanganMakan(Math.round(hitungTunjanganMakan));

            // Hitung Tunjangan Transport (10% dari Gaji Pokok)
            double presentaseTunjanganTransport = 0.10;
            double hitungTunjanganTransport = gajiPokok * presentaseTunjanganTransport;
            setTunjanganTransport(Math.round(hitungTunjanganTransport));

            // Hitung BPJS Kesehatan (1% dari Gaji Pokok)
            double presentaseBpjsKesehatan = 0.01;
            double hitungBpjsKesehatan = gajiPokok * presentaseBpjsKesehatan;
            setBpjsKesehatan(Math.round(hitungBpjsKesehatan));

            // Hitung JHT (2% dari Gaji Pokok)
            double presentaseJht = 0.02;
            double hitungJht = gajiPokok * presentaseJht;
            setJht(Math.round(hitungJht));

            // Hitung Gaji Bersih
            long totalTunjangan = getTunjanganMakan() + getTunjanganTransport() + getThr();
            long totalPotongan = getPotonganGaji() + getBpjsKesehatan() + getJht();
            long gajiBersih = getGajiPokok() + totalTunjangan + getBonus() - totalPotongan;
            setGajiBersih(gajiBersih);
        }
    }
}