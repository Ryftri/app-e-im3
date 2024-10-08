import { Pelajaran } from "@/types/GetAllPelajaran";
import { Pelajaran as PelajaranSiswa } from "@/types/response/GetPelajaranByQueryParams";

export interface DataPelajaran {
    pelajaran: Pelajaran[];
}

export interface DataPelajaranSiswa {
    pelajaran: PelajaranSiswa[]
}