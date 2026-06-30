'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IJadwal } from "../jadwal/page";
import { IPenumpang } from "../penumpang/page";

export interface ITiket {
    nomor_kursi: string
    harga: number
    image: string
    jadwal: IJadwal
    penumpang: IPenumpang
}

export default function AdminTiketPage () {

    const [tiket, setTiket] = useState<ITiket[]>([])

    const getData = async () => {
        try {
            const res = await api.get('tiket/get-all')
            setTiket(res.data) 
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
                <h4>Data Movie</h4>
                <Link href={'/admin/tiket/create'}>
                    <button type="button" className="btn btn-primary">Tambah Tiket</button>
                </Link>
            </div>

            <table className="table table mt-4 table- hover table-striped">
                <thead>
                    <tr>
                    
                        <td>nomor_kursi</td>
                        <td>harga</td>
                        <td>image</td>
                        <td>aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {tiket.map((tiket, index) => {
                        return(
                            <tr key={index}>
                            
                                <td>{tiket.nomor_kursi}</td>
                                <td>{tiket.harga}</td>
                                <td>
                                    <Image width={300} height={300} src={`${baseURL}/image/${tiket.image}`} alt=""
                                    unoptimized
                                    /> 
                                </td>
                                <td>aksi</td>
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