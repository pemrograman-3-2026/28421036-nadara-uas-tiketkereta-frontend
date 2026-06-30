'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IPenumpang {
    id_penumpang: number
    nama: string
    email: string
    no_telp: string
}

export default function PenumpangPage () {

    const [data, setData] = useState<IPenumpang[]>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await api.get('penumpang/get-all')
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
              const res =  await api.delete(`penumpang/delete/${id}`)
              showToast(res.data.message, 'success')
              getData()
            } catch (error: any) {
                showToast(error.response.data.message, 'danger')
                
            }
        }
    }

    return (
        <div>
            <h4>Data Penumpang</h4>
            <Link href={'/admin/penumpang/create'}>
                <button type="button" className="btn btn-primary">Tambah Penumpang</button>
            </Link>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>email</td>
                        <td>no telp</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d =>{
                        return (
                            <tr key={d.id_penumpang}>
                                <td>{d.nama}</td>
                                <td>{d.email}</td>
                                <td>{d.no_telp}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button onClick={() => deleteData(d.id_penumpang)} type="button" className="btn btn-danger">Delete</button>

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