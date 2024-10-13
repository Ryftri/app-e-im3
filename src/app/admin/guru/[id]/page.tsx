"use client";

import { Button, Spinner, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserControllerFinOneGuruQuery, useUserControllerDeleteMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { ToastNotificationProps } from "@/types/Toas";
import ToastNotification from "@/components/ToastNotification";
import { getCookie } from "cookies-next";

export default function GuruDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data, error, isLoading, refetch, isError, isFetching } = useUserControllerFinOneGuruQuery({
        id: Number(id),
        authorization: `Bearer ${getCookie('refreshToken')}`
    });
    const [deleteGuru, { isLoading: isLoadingDelete }] = useUserControllerDeleteMutation();
    const router = useRouter();

    const [toast, setToast] = useState<ToastNotificationProps | null>(null);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = async () => {
        try {
            await deleteGuru({
                id: Number(id),
                authorization: `Bearer ${getCookie('refreshToken')}`
            }).unwrap();
            setToast({
                message: "Guru berhasil dihapus!",
                type: "success",
                onClose: () => setToast(null),
            });
            router.back(); // Redirect setelah menghapus
        } catch (err) {
            console.error("Failed to delete guru:", err);
            setToast({
                message: "Terjadi kesalahan saat menghapus guru.",
                type: "error",
                onClose: () => setToast(null),
            });
        }
    };

    if (isLoading || isFetching) {
        return <div className="text-center"><Spinner size="xl" /></div>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Detail Guru</h1>
            <Card>
                <h5 className="text-xl font-bold">{data?.guru.nama_lengkap}</h5>
                <p className="mt-2"><strong>Username:</strong> {data?.guru.username}</p>
                <p className="mt-2"><strong>Email:</strong> {data?.guru.email}</p>
                <p className="mt-2"><strong>Asal Sekolah:</strong> {data?.guru.asal_sekolah}</p>
                <p className="mt-2"><strong>Status:</strong> {data?.guru.isActive ? "Aktif" : "Tidak Aktif"}</p>
                <div className="flex mt-4 space-x-2">
                    <Button onClick={() => router.push(`/admin/guru/edit/${id}`)} color="warning">
                        Edit
                    </Button>
                    <Button onClick={handleDelete} color="failure" disabled={isLoadingDelete}>
                        {isLoadingDelete ? "Menghapus..." : "Hapus"}
                    </Button>
                </div>
            </Card>

            {/* Render Toast Notification */}
            {toast && (
                <div className="fixed bottom-4 right-4">
                    <ToastNotification
                        message={toast.message}
                        type={toast.type}
                        onClose={toast.onClose}
                    />
              </div>
            )}
        </div>
    );
}
