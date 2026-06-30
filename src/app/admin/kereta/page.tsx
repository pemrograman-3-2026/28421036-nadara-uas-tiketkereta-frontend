'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IJadwal } from "../jadwal/page"

export interface IKereta {
    id_kereta: number
    nama_kereta: string
    kelas: string
    created_at: string
    updated_at: string
}

export default function KeretaPage () {

    const [data, setData] = useState<IKereta[]>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await api.get('kereta/get-all')
            setData(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }
    
    const deleteData = async (id: number) => {
        const isAgree = confirm('Are you sure?')

        if (isAgree) {
            try {
              const res =  await api.delete(`kereta/delete/${id}`)
              showToast(res.data.message, 'success')
              getData()
            } catch (error: any) {
                showToast(error.response.data.message, 'danger')
                
            }
        }
    }

    return (
        <div>
            <h4>Data Kereta</h4>
            <Link href={'/admin/kereta/create'}>
                <button type="button" className="btn btn-primary">Tambah Kereta</button>
            </Link>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>Kelas</td>
                        <td>aksi</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d =>{
                        return (
                            <tr key={d.id_kereta}>
                                <td>{d.nama_kereta}</td>
                                <td>{d.kelas}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button onClick={() => deleteData(d.id_kereta)} type="button" className="btn btn-danger">Delete</button>

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