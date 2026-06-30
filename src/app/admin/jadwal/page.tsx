'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IStasiun } from "../stasiun/page";
import { IKereta } from "../kereta/page";

export interface IJadwal {
    id_jadwal: number
    waktu_berangkat: String
    waktu_tiba: String
    kereta: IKereta
    asal: IStasiun
}

export default function AdminJadwalPage () {

    const [jadwal, setJadwal] = useState<IJadwal[]>([])

    const getData = async () => {
        try {
            const res = await api.get('jadwal/get-all')
            setJadwal(res.data) 
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <div className="flex justtify-content-between">
                <h4>Data Jadwal</h4>
                <Link href={'/admin/jadwal/create'}>
                    <button type="button" className="btn btn-primary">Tambah Jadwal</button>
                </Link>
            </div>

            <table className="table table mt-4 table- hover table-striped">
                <thead>
                    <tr>
                        <td>nama_kereta</td>
                        <td>waktu_berangkat</td>
                        <td>waktu_tiba</td>
                        <td>nama stasiun</td>
                        <td>aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {jadwal.map((jadwal) => {
                        return(
                            <tr key={jadwal.id_jadwal}>
                                <td>{jadwal.kereta.nama_kereta}</td>
                                <td>{jadwal.waktu_berangkat}</td>
                                <td>{jadwal.waktu_tiba}</td>
                                <td>{jadwal.asal.nama}</td>
                                
                                <td>
                                     <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>

                                    </div>
                                </td>
                            </tr>
                        )               
                    })}
                </tbody>
            </table>
        </div>
    )
}