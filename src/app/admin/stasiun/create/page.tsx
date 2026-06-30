'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreateStasiunPage () {

    const [nama, setNama] = useState ('')
    const [kota, setKota] = useState ('')
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('stasiun/create',{
                nama,
                kota
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Stasiun</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Nama</label>
                    <input
                    type="text" 
                    name="nama"
                    className="form-control form-control-sm py2"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Kota</label>
                    <input
                    type="text" 
                    name="Kelas"
                    className="form-control form-control-sm py2"
                    value={kota}
                    onChange={(e) => setKota(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}