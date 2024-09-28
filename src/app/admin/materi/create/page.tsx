"use client"

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMateriControllerCreateMutation } from "@/lib/redux/services/api/endpoints/ApiEiM3";
import TiptapEditor from "@/components/TiptapEditor";
import { TextInput } from "flowbite-react";

interface CreateMateriFormData {
  pelajaranId: number;
  nama_materi: string;
  file: FileList; // Assuming the file input is a FileList
}

const CreateMateri = () => {
  const { register, handleSubmit, reset } = useForm<CreateMateriFormData>();
  const [createMateri] = useMateriControllerCreateMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");

  const onSubmit = async (data: CreateMateriFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pelajaranId", `${data.pelajaranId}`);
      formData.append("nama_materi", data.nama_materi);
      formData.append("file", data.file[0]); // Assuming the file is selected
      formData.append("file_url", ''); // Or get URL from file upload response
      formData.append("isi_materi", editorContent);

      // Mengirim data materi ke server
      // await createMateri({
      //   createMateriDto: formData
      // });
      reset();
    //   router.push('/admin/materi'); // Arahkan pengguna ke halaman materi setelah submit
    } catch (error) {
      console.error("Error creating materi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buat Materi Baru</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="pelajaranId">
            ID Pelajaran
          </label>
          <TextInput
            id="pelajaranId"
            type="text"
            required={true}
          />
        </div>

        <div>
          <label htmlFor="nama_materi">
            Nama Materi
          </label>
          <TextInput
            id="nama_materi"
            type="text"
            required={true}
          />
        </div>

        <div>
          <label htmlFor="file">
            Upload File (PDF/Word)
          </label>
          <input
            id="file"
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("file", { required: true })}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="isi_materi">
            Isi Materi
          </label>
          <TiptapEditor content="" onChange={(content) => setEditorContent(content)} />
        </div>

        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Buat Materi"}
        </button>
      </form>
    </div>
  );
};

export default CreateMateri;
