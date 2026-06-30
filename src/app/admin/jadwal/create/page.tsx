'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { IKereta } from "../../kereta/page"
import { IStasiun } from "../../stasiun/page"

export default function CreateJadwalPage () {

    const [waktu_berangkat, setWaktu_berangkat] = useState ('')
    const [waktu_tiba, setWaktu_tiba] = useState ('')
    const [id_kereta, setId_kereta] = useState ('')
    const [id_stasiun, setId_stasiun] = useState ('')
    const [keretas, setKereta] = useState<IKereta[]>([])
    const [stasuins, setStasiun] = useState<IStasiun[]>([])

    const getKereta = async () => {
        try {
            const res = await api.get('kereta/get-all')
            setKereta (res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getKereta()
    }, [])

    const getAsal = async () => {
        try {
            const res = await api.get('stasiun/get-all')
            setStasiun (res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getAsal()
    }, [])
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('jadwal/create',{
                waktu_berangkat,
                waktu_tiba,
                id_kereta,
                id_stasiun
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Jadwal</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">waktu_berangkat</label>
                    <input
                    type="text" 
                    name="waktu_berangkat"
                    className="form-control form-control-sm py2"
                    value={waktu_berangkat}
                    onChange={(e) => setWaktu_berangkat(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">waktu_tiba</label>
                    <input
                    type="text" 
                    name="waktu_tiba"
                    className="form-control form-control-sm py2"
                    value={waktu_tiba}
                    onChange={(e) => setWaktu_tiba(e.target.value)}
                    />
                </div>
                <div>
                    <label className="form-label small fw-semibold">Kereta</label>
                        <select name="id_kereta" 
                        className="form-control"
                         onChange={(e) => setId_kereta(e.target.value)}>
                            <option disabled value="">Select Kereta</option>
                            {keretas.map(kereta =>{
                                return (
                                    <option
                                    key={kereta.id_kereta}
                                    value={kereta.id_kereta}
                                    >
                                        {kereta.nama_kereta}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    
                <div>
                    <label className="form-label small fw-semibold">Stasiun</label>
                        <select name="id_stasiun" 
                        className="form-control"
                         onChange={(e) => setId_stasiun(e.target.value)}>
                            <option disabled value="">Select stasiun</option>
                            {stasuins.map(stasiun =>{
                                return (
                                    <option
                                    key={stasiun.id_stasiun}
                                    value={stasiun.id_stasiun}
                                    >
                                        {stasiun.nama}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}