'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreateStasiunPage () {

    const [nama, setNama] = useState ('')
    const [kota, setKota] = useState ('')
    const [asal_jadwal, setAsal_jadwal] = useState ('')
    const [tujuan_jadwal, setTujuan_jadwal] = useState ('')
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('kereta/create',{
                nama,
                kota,
                asal_jadwal,
                tujuan_jadwal
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
                    <label className="from-label small fw-semibold">Nama Stasiun</label>
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
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Asal_Jadwal</label>
                    <input
                    type="text" 
                    name="asal_jadwal"
                    className="form-control form-control-sm py2"
                    value={asal_jadwal}
                    onChange={(e) => setAsal_jadwal(e.target.value)}
                    />
                </div>
                    <div className="mb-3">
                    <label className="from-label small fw-semibold">Tujuan Jadwal</label>
                    <input
                    type="text" 
                    name="tujuan_jadwal"
                    className="form-control form-control-sm py2"
                    value={tujuan_jadwal}
                    onChange={(e) => setTujuan_jadwal(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}