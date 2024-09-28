export default interface CreateMateriFormData {
    pelajaranId: number;
    nama_materi: string;
    file: FileList; // FileList karena input file mengembalikan FileList
}
  