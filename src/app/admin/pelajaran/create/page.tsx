'use client';

import { useState } from 'react';
import { Button, Modal, Card, Select, TextInput, Label, Spinner } from 'flowbite-react';
import { CreatePelajaranDto, usePelajaranControllerCreateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { daftarSekolah } from '@/types/ListSekolah';
import ToastNotification from '@/components/ToastNotification';
import { isGlobalResponse } from '@/lib/utils/isGlobalResponse';
import { GlobalResponse } from '@/types/GlobalResponse';
import { useRouter } from 'next/navigation';

export default function CreatePelajaranPage() {
    const router = useRouter();
    const [createPelajaran, { isLoading: isLoadingCreatePelajaran, error: errorCreatePelajaran }] = usePelajaranControllerCreateMutation()
    const [formData, setFormData] = useState<CreatePelajaranDto>({
        jenjang_kelas: 1,
        asal_sekolah: '',
        nama_pelajaran: '',
    });

    const [isSekolahModalOpen, setIsSekolahModalOpen] = useState(false);
    const [isJenjangModalOpen, setIsJenjangModalOpen] = useState(false);

    // State untuk Toast Notification
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | null>(null);

    const handleOpenSekolahModal = () => setIsSekolahModalOpen(true);
    const handleCloseSekolahModal = () => setIsSekolahModalOpen(false);

    const handleOpenJenjangModal = () => setIsJenjangModalOpen(true);
    const handleCloseJenjangModal = () => setIsJenjangModalOpen(false);

    const handleSelectSekolah = (sekolah: string) => {
    setFormData({
        ...formData,
        asal_sekolah: sekolah,
    });
    handleCloseSekolahModal();
    };

    const handleSelectJenjang = (jenjang: number) => {
    setFormData({
        ...formData,
        jenjang_kelas: jenjang,
    });
    handleCloseJenjangModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        // Validasi form
        if (!formData.nama_pelajaran) {
            setToastMessage('Nama pelajaran harus diisi!');
            setToastType('error');
            return;
        }

        if (!formData.asal_sekolah) {
            setToastMessage('Asal sekolah harus dipilih!');
            setToastType('error');
            return;
        }

        if (!formData.jenjang_kelas) {
            setToastMessage('Jenjang kelas harus dipilih!');
            setToastType('error');
            return;
        }

        try {
            const response = await createPelajaran({
                createPelajaranDto: formData
            }).unwrap()

            setToastMessage(response.message as string)
            setToastType('success');
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.back()
        } catch (err) {
            if (isGlobalResponse(err)) {
                const error: GlobalResponse = err;
                setToastMessage(`Error: ${error.message}`);
            } else {
                setToastMessage('Error');
            }
            setToastType('error');
        }
    };
    
    return (
    <>
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tambah Pelajaran</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nama Pelajaran */}
        <div>
            <Label className="block mb-2 text-sm font-medium text-gray-900">Nama Pelajaran</Label>
            <TextInput
            type="text"
            name="nama_pelajaran"
            value={formData.nama_pelajaran}
            onChange={handleInputChange}
            placeholder="Masukkan nama pelajaran"
            required
            />
        </div>

        {/* Asal Sekolah */}
        <div>
            <Label className="block mb-2 text-sm font-medium text-gray-900">Asal Sekolah</Label>
            <div className="flex items-center">
            <TextInput
                type="text"
                name="asal_sekolah"
                value={formData.asal_sekolah}
                onChange={handleInputChange}
                placeholder="Pilih asal sekolah"
                disabled
                required
            />
            <Button onClick={handleOpenSekolahModal} className="ml-2">Pilih Sekolah</Button>
            </div>
        </div>

        {/* Jenjang Kelas */}
        <div>
            <Label className="block mb-2 text-sm font-medium text-gray-900">Jenjang Kelas</Label>
            <div className="flex items-center">
            <TextInput
                type="text"
                name="jenjang_kelas"
                value={`Kelas ${formData.jenjang_kelas}`}
                onChange={handleInputChange}
                placeholder="Pilih jenjang kelas"
                disabled
                required
            />
            <Button onClick={handleOpenJenjangModal} className="ml-2">Pilih Jenjang</Button>
            </div>
        </div>

        {/* Submit Button */}
        <div>
            <Button type="submit" disabled={isLoadingCreatePelajaran}>
                {isLoadingCreatePelajaran ?
                <Spinner />
                :
                "Simpan Pelajaran"
                }
            </Button>
        </div>
        </form>

        {/* Tampilkan Toast jika ada pesan */}
        {toastMessage && (
        <div className="fixed bottom-4 right-4">
            <ToastNotification
            message={toastMessage}
            type={toastType!}
            onClose={() => setToastMessage(null)} // Hilangkan toast setelah ditutup
            />
        </div>
        )}

        {/* Modal Daftar Sekolah */}
        <Modal show={isSekolahModalOpen} onClose={handleCloseSekolahModal}>
        <Modal.Header>Pilih Asal Sekolah</Modal.Header>
        <Modal.Body>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {daftarSekolah.map((sekolah, index) => (
                <Card key={index} onClick={() => handleSelectSekolah(sekolah)} className="cursor-pointer">
                <p className="text-center font-medium">{sekolah}</p>
                </Card>
            ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCloseSekolahModal}>Tutup</Button>
        </Modal.Footer>
        </Modal>

        {/* Modal Jenjang Kelas */}
        <Modal show={isJenjangModalOpen} onClose={handleCloseJenjangModal}>
        <Modal.Header>Pilih Jenjang Kelas</Modal.Header>
        <Modal.Body>
            <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((jenjang) => (
                <Card key={jenjang} onClick={() => handleSelectJenjang(jenjang)} className="cursor-pointer">
                <p className="text-center font-medium">Kelas {jenjang}</p>
                </Card>
            ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCloseJenjangModal}>Tutup</Button>
        </Modal.Footer>
        </Modal>
    </>
    );
}
