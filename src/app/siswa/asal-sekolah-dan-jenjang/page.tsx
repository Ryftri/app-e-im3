"use client"

import FlexibleLoadingText from "@/components/animations/FlexibleLoadingTextToPage";
import ToastNotification from "@/components/ToastNotification";
import { daftarSekolah } from "@/types/ListSekolah";
import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AsalSekolahDanJenjang() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        jenjang_kelas: 1,
        asal_sekolah: '',
    });

    const [isSekolahModalOpen, setIsSekolahModalOpen] = useState(false);
    const [isJenjangModalOpen, setIsJenjangModalOpen] = useState(false);

    // State untuk Toast Notification
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Validasi form
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

        // Redirect to siswa/pelajaran route
        router.push(
            `/siswa/pelajaran?asalSekolah=${encodeURIComponent(formData.asal_sekolah)}&jenjang=${formData.jenjang_kelas}`
        );

        setIsLoading(false);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Pilih Asal Sekolah dan Jenjang</h1>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Asal Sekolah */}
                <div>
                    <Label className="block mb-2 text-sm font-medium text-gray-900">Asal Sekolah</Label>
                    <TextInput
                        type="text"
                        value={formData.asal_sekolah}
                        placeholder="Asal sekolah"
                        disabled
                        required
                    />
                    <Button onClick={handleOpenSekolahModal} className="mt-2">Pilih Sekolah</Button>
                </div>

                {/* Jenjang Kelas */}
                <div>
                    <Label className="block mb-2 text-sm font-medium text-gray-900">Jenjang Kelas</Label>
                    <TextInput
                        type="text"
                        value={`Kelas ${formData.jenjang_kelas}`}
                        disabled
                        required
                    />
                    <Button onClick={handleOpenJenjangModal} className="mt-2">Pilih Jenjang</Button>
                </div>

                {/* Submit Button */}
                <div>
                    <Button type="submit">
                        {isLoading ? 
                        <FlexibleLoadingText
                            textMessage="Menyiapkan halaman"
                        /> :
                        'Lanjutkan'
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
                        onClose={() => setToastMessage(null)}
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