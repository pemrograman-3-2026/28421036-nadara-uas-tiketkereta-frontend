'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IPenumpang } from "../../penumpang/page"
import { IJadwal } from "../../jadwal/page"

export default function CreateTiketPage () {
    const router = useRouter()
    const [penumpangs, setPenumpangs] = useState<IPenumpang[]>([])
    const [id_penumpang, setId_Penumpangs]= useState('')
    const [jadwals, setJadwals] = useState<IJadwal[]>([])
    const [id_jadwal, setId_Jadwals]= useState('')
    const [nomor_kursi, setNomor_kursi] = useState ('')
    const [harga, setHarga] = useState ('')
    const [image, setImage] = useState<File | null>(null)

    const getPenumpang = async () => {
        try {
            const res = await api.get('penumpang/get-all')
            setPenumpangs (res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getPenumpang()
    }, [])

    const getJadwal = async () => {
        try {
            const res = await api.get('jadwal/get-all')
            setJadwals (res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getJadwal()
    }, [])
    

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('id_penumpang', id_penumpang)
            formData.append('id_jadwal', id_jadwal)
            formData.append('nomor_kursi', nomor_kursi )
            formData.append('harga', harga)
            

            if (!image) {
                showToast('mohon pilih gambar','danger')
                return
            }
            
            formData.append('image', image)

          const res = await api.post('tiket/create', formData)  
          showToast(res.data.message, 'success')
          router.push('/admin/tiket')
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>{
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    }

    return(
        <div>
            <h4>Input Tiket</h4>
            <form onSubmit={onSubmit}>
                <div>
                        <label className="form-label small fw-semibold">Penumpang</label>
                        <select name="id_penumpang" 
                        className="form-control"
                         onChange={(e) => setId_Penumpangs(e.target.value)}>
                            <option disabled value="">Select Penumpang</option>
                            {penumpangs.map(penumpang =>{
                                return (
                                    <option
                                    key={penumpang.id_penumpang}
                                    value={penumpang.id_penumpang}
                                    >
                                        {penumpang.nama}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                <div>
                        <label className="form-label small fw-semibold">Jadwal</label>
                        <select name="id_jadwal" 
                        className="form-control"
                         onChange={(e) => setId_Jadwals(e.target.value)}>
                            <option disabled value="">Select Jadwal</option>
                            {jadwals.map(jadwal =>{
                                return (
                                    <option
                                    key={jadwal.id_jadwal}
                                    value={jadwal.id_jadwal}
                                    >
                                        {jadwal.waktu_berangkat}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Nomor Kursi</label>
                    <input
                    type="text" 
                    name="Nomor_kursi"
                    className="form-control form-control-sm py2"
                    value={nomor_kursi}
                    onChange={(e) => setNomor_kursi(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Harga</label>
                    <input
                    type="text" 
                    name="harga"
                    className="form-control form-control-sm py2"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    />
                </div>
                 <div className="mb3">
                        <label className="form-label small fw-semibold">Poster Image</label>
                        <input 
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                         />
                    </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}