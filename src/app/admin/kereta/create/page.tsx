'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreateKeretaPage () {

    const [nama_kereta, setNama_kereta] = useState ('')
    const [kelas, setKelas] = useState ('')
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('kereta/create',{
                nama_kereta,
                kelas,
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Kereta</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Nama Kereta</label>
                    <input
                    type="text" 
                    name="nama_kereta"
                    className="form-control form-control-sm py2"
                    value={nama_kereta}
                    onChange={(e) => setNama_kereta(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Kelas</label>
                    <input
                    type="text" 
                    name="Kelas"
                    className="form-control form-control-sm py2"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}