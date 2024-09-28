"use client";

import { Button, Card, Modal, Spinner } from "flowbite-react";
import moment from "moment";
import "moment/locale/id";
import "moment-timezone";
import {
  useUserControllerDeleteMutation,
  useUserControllerFinOneSiswaQuery,
} from "@/lib/redux/services/api/endpoints/ApiEiM3";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useUserControllerFinOneSiswaQuery({
    id: Number(params.id),
  });
  const [deleteSiswa, { isLoading: loadingDelete }] = useUserControllerDeleteMutation();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteSiswa({ id: Number(params.id) });
      setShowModal(false);
      router.push("/admin/siswa"); // Arahkan kembali ke halaman utama setelah menghapus
    } catch (error) {
      console.error("Failed to delete siswa:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    // <>
    //   {isLoading || isFetching ? (
    //     <div className="text-center">
    //       <Spinner size="xl" />
    //     </div>
    //   ) : isError ? (
    //     <h1>{`${error}`}</h1>
    //   ) : data !== undefined && data.siswa !== null ? (
    //     <>
    //       <Card>
    //         <h2 className="text-xl font-semibold">{data.siswa.nama_lengkap}</h2>
    //         <p className="text-white">
    //           Kelas: {data.siswa.kelas.map((k) => k.kelas.nama_kelas).join(", ")}
    //         </p>
    //         <p className="text-white">Email: {data.siswa.email}</p>
    //         <p className="text-white">Username: {data.siswa.username}</p>
    //         <p className="text-white">
    //           Dibuat Pada:{" "}
    //           {moment(data.siswa.createdAt)
    //             .tz("Asia/Jakarta")
    //             .format("DD MMMM YYYY")}
    //         </p>
    //         <p className="text-white">
    //           Diubah Pada:{" "}
    //           {moment(data.siswa.updatedAt)
    //             .tz("Asia/Jakarta")
    //             .format("DD MMMM YYYY")}
    //         </p>

    //         {/* Menambahkan pengumpulan tugas */}
    //         <div className="mt-4">
    //           <h3 className="text-lg font-semibold">Pengumpulan Tugas</h3>
    //           {data.siswa.pengumpulan.length > 0 ? (
    //             <ul>
    //               {data.siswa.pengumpulan.map((pengumpulanItem) => (
    //                 <li key={pengumpulanItem.id} className="mb-2">
    //                   <p>Tugas ID: {pengumpulanItem.id}</p>
    //                   <p>Jawaban: {pengumpulanItem.isi_pengumpulan.map((isi) => isi.answer).join(", ")}</p>
    //                   <p>
    //                     Nilai:{" "}
    //                     {pengumpulanItem.nilai !== null
    //                       ? pengumpulanItem.nilai
    //                       : "Belum dinilai"}
    //                   </p>
    //                 </li>
    //               ))}
    //             </ul>
    //           ) : (
    //             <p className="text-white">Belum ada tugas yang dikumpulkan.</p>
    //           )}
    //         </div>

    //         <div className="flex gap-2 mt-4">
    //           <Button onClick={() => router.push(`edit/${params.id}`)}>Edit</Button>
    //           <Button color="failure" onClick={() => setShowModal(true)}>
    //             Hapus
    //           </Button>
    //         </div>
    //       </Card>

    //       <Modal show={showModal} onClose={() => setShowModal(false)}>
    //         <Modal.Header>Konfirmasi Hapus</Modal.Header>
    //         <Modal.Body>
    //           <p>Apakah Anda yakin ingin menghapus siswa ini?</p>
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <Button onClick={handleDelete}>Hapus</Button>
    //           <Button color="gray" onClick={() => setShowModal(false)}>
    //             Batal
    //           </Button>
    //         </Modal.Footer>
    //       </Modal>
    //     </>
    //   ) : (
    //     <h1>User tidak ditemukan</h1>
    //   )}
    // </>
    <></>
  );
}
