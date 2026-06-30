'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IStasiun {
    nama : String
    kota: String
    created_at: string
    updated_at: string
}

export default function AdminStasiunPage () {

    const [stasiun, setStasiun] = useState<IStasiun[]>([])

    const getData = async () => {
        try {
            const res = await api.get('Stasiun/get-all')
            setStasiun(res.data) 
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
                <h4>Data Stasiun</h4>
                <Link href={'/admin/stasiun/create'}>
                    <button type="button" className="btn btn-primary">Tambah Stasiun</button>
                </Link>
            </div>

            <table className="table table mt-4 table- hover table-striped">
                <thead>
                    <tr>
                        <td>nama</td>
                        <td>kota</td>
                        <td>aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {stasiun.map((stasiun, index) => {
                        return(
                            <tr key={index}>
                                <td>{stasiun.nama}</td>
                                <td>{stasiun.kota}</td>
                                
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