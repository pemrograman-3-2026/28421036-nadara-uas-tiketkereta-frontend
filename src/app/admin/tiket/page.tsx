'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IPenumpang } from "../penumpang/page";
import { IJadwal } from "../jadwal/page";
import { showToast } from "@/app/components/toast/toast";

export interface ITiket {
    id_tiket: number
    id_penumpang: number
    id_jadwal: number
    nomor_kursi: string
    harga: string
    image: string
    penumpang: IPenumpang
    jadwal: IJadwal
}

export default function AdmintiketPage () {

    const [tikets, setTikets] = useState<ITiket[]>([])

    const getData = async () => {
        try {
            const res = await api.get('tiket/get-all')
            setTikets(res.data) 
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteData = async (id: number) => {
            const isAgree = confirm('Are you sure?')
    
            if (isAgree) {
                try {
                  const res =  await api.delete(`tiket/delete/${id}`)
                  showToast(res.data.message, 'success')
                  getData()
                } catch (error: any) {
                    showToast(error.response.data.message, 'danger')
                    
                }
            }
        }


    return (
        <div>
            <div className="flex justtify-content-between">
                <h4>Data Tiket</h4>
                <Link href={'/admin/tiket/create'}>
                    <button type="button" className="btn btn-primary">Tambah Tiket</button>
                </Link>
            </div>

            <table className="table table mt-4 table- hover table-striped">
                <thead>
                    <tr>
                        <td>Nama Penumpang</td>
                        <td>Jadwal</td>
                        <td>No Kursi</td>
                        <td>Harga</td>
                        <td>image</td>
                        <td>aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {tikets.map((tiket) => {
                        return(
                            <tr key={tiket.id_tiket}>
                                <td>{tiket.penumpang.nama}</td>
                                <td>{tiket.jadwal.waktu_berangkat}</td>
                                <td>{tiket.nomor_kursi}</td>
                                <td>{tiket.harga}</td>
                                <td>
                                    <Image width={300} height={300} src={`${baseURL}/image/${tiket.image}`} alt=""
                                    unoptimized
                                    /> 
                                </td>
                                <td>
                                     <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button onClick={() => deleteData(tiket.id_tiket)} type="button" className="btn btn-danger">Delete</button>

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