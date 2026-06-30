'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { IKereta } from "../admin/kereta/page"
import Image from "next/image"

export default function useDashboardPage () {

    const [keretas, setKeretas] = useState<IKereta[]>([])

    const getData = async () => {
        try {
            const res = await api.get('kereta/get-all')
            setKeretas(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
       <div>
        <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>Kelas</td>
                        <td>aksi</td>
                    </tr>
                </thead>
                <tbody>
                    {keretas.map(d =>{
                        return (
                            <tr key={d.id_kereta}>
                                <td>{d.nama_kereta}</td>
                                <td>{d.kelas}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Detail</button>
                                        <button type="button" className="btn btn-success">Pesan</button>

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