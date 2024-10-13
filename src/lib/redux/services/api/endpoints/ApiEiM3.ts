import { GetAllGuru } from "@/types/GetAllGuru";
import { ApiEiM3Slice as api } from "../ApiEiM3Slice";
import { GetAllSiswa } from "@/types/GetAllSiswa";
import { GetAllPelajaran } from "@/types/GetAllPelajaran";
import { GetMeResponse } from "@/types/GetMeResponse";
import { RegisterResponse } from "@/types/RegisterResponse";
import { getCookie } from "cookies-next";
import { GlobalResponse } from "@/types/GlobalResponse";
import { GetOnePelajaran } from "@/types/response/GetOnePelajaran";
import { GetOneMateri } from "@/types/GetMateriByIdResponse";
import { AutoLoginResponse } from "@/types/AutoLoginResponse";
import { GetPelajaranbyQueryParams } from "@/types/response/GetPelajaranByQueryParams";
import { GetGuruByID } from "@/types/getGuruById";
import { GetSiswaByID } from "@/types/GetSiswaById";
import { GetTugasByID } from "@/types/response/GetTugasById";
import { GetPengumpulanByID } from "@/types/response/GetPengumpulanById";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userControllerGetAllGuru: build.query<
      UserControllerGetAllGuruApiResponse,
      UserControllerGetAllGuruApiArg
    >({
      query: (queryArg) => ({
        url: `/users/get-all-guru`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerGetAllSiswa: build.query<
      UserControllerGetAllSiswaApiResponse,
      UserControllerGetAllSiswaApiArg
    >({
      query: (queryArg) => ({
        url: `/users/get-all-siswa`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerCreate: build.mutation<
      UserControllerCreateApiResponse,
      UserControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/create`,
        method: "POST",
        body: queryArg.createUserDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerGetAll: build.query<
      UserControllerGetAllApiResponse,
      UserControllerGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/users/get-all`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerFinOneGuru: build.query<
      UserControllerFinOneGuruApiResponse,
      UserControllerFinOneGuruApiArg
    >({
      query: (queryArg) => ({
        url: `/users/find-one-guru/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerFinOneSiswa: build.query<
      UserControllerFinOneSiswaApiResponse,
      UserControllerFinOneSiswaApiArg
    >({
      query: (queryArg) => ({
        url: `/users/find-one-siswa/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerUpdate: build.mutation<
      UserControllerUpdateApiResponse,
      UserControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerToggleActiveStatus: build.mutation<
      UserControllerToggleActiveStatusApiResponse,
      UserControllerToggleActiveStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/users/toggle-active/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateIsActiveDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerDelete: build.mutation<
      UserControllerDeleteApiResponse,
      UserControllerDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/users/delete/${queryArg.id}`,
        method: "DELETE",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerUserGetMe: build.query<
      UserControllerUserGetMeApiResponse,
      UserControllerUserGetMeApiArg
    >({
      query: (queryArg) => ({
        url: `/users/get-me`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    userControllerUpdateProfileUSer: build.mutation<
      UserControllerUpdateProfileUSerApiResponse,
      UserControllerUpdateProfileUSerApiArg
    >({
      query: (queryArg) => ({
        url: `/users/update-profile`,
        method: "PATCH",
        body: queryArg.updateUserDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pelajaranControllerCreate: build.mutation<
      PelajaranControllerCreateApiResponse,
      PelajaranControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/create`,
        method: "POST",
        body: queryArg.createPelajaranDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pelajaranControllerFindAll: build.query<
      PelajaranControllerFindAllApiResponse,
      PelajaranControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/get-all`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pelajaranControllerFindOne: build.query<
      PelajaranControllerFindOneApiResponse,
      PelajaranControllerFindOneApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/get-by-id/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pelajaranControllerFindBySekolahAndJenjang: build.query<
      PelajaranControllerFindBySekolahAndJenjangApiResponse,
      PelajaranControllerFindBySekolahAndJenjangApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/get-by-sekolah-jenjang`,
        headers: { Authorization: queryArg.authorization },
        params: { sekolah: queryArg.sekolah, jenjang: queryArg.jenjang },
      }),
    }),
    pelajaranControllerUpdate: build.mutation<
      PelajaranControllerUpdateApiResponse,
      PelajaranControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updatePelajaranDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pelajaranControllerRemove: build.mutation<
      PelajaranControllerRemoveApiResponse,
      PelajaranControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/delete/${queryArg.id}`,
        method: "DELETE",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    materiControllerCreate: build.mutation<
      MateriControllerCreateApiResponse,
      MateriControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/create`,
        method: "POST",
        body: queryArg.createMateriDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    materiControllerFindAll: build.query<
      MateriControllerFindAllApiResponse,
      MateriControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/get-all`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    materiControllerFindOne: build.query<
      MateriControllerFindOneApiResponse,
      MateriControllerFindOneApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/get-by-id/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    materiControllerUpdate: build.mutation<
      MateriControllerUpdateApiResponse,
      MateriControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateMateriDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    materiControllerRemove: build.mutation<
      MateriControllerRemoveApiResponse,
      MateriControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/delete/${queryArg.id}`,
        method: "DELETE",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    tugasControllerCreate: build.mutation<
      TugasControllerCreateApiResponse,
      TugasControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/create`,
        method: "POST",
        body: queryArg.createTugasDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    tugasControllerFindAll: build.query<
      TugasControllerFindAllApiResponse,
      TugasControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/get-all`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    tugasControllerFindOne: build.query<
      TugasControllerFindOneApiResponse,
      TugasControllerFindOneApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/get-by-id/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    tugasControllerUpdate: build.mutation<
      TugasControllerUpdateApiResponse,
      TugasControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateTugasDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    tugasControllerRemove: build.mutation<
      TugasControllerRemoveApiResponse,
      TugasControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/delete/${queryArg.id}`,
        method: "DELETE",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pengumpulanControllerCreate: build.mutation<
      PengumpulanControllerCreateApiResponse,
      PengumpulanControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/pengumpulan/create`,
        method: "POST",
        body: queryArg.createPengumpulanDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pengumpulanControllerFindAll: build.query<
      PengumpulanControllerFindAllApiResponse,
      PengumpulanControllerFindAllApiArg
    >({
      query: () => ({ url: `/pengumpulan/get-all` }),
    }),
    pengumpulanControllerFindOne: build.query<
      PengumpulanControllerFindOneApiResponse,
      PengumpulanControllerFindOneApiArg
    >({
      query: (queryArg) => ({ 
        url: `/pengumpulan/get-by-id/${queryArg.id}`,
        headers: { Authorization: queryArg.authorization }
      }),
    }),
    pengumpulanControllerUpdate: build.mutation<
      PengumpulanControllerUpdateApiResponse,
      PengumpulanControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/pengumpulan/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updatePengumpulanDto,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    pengumpulanControllerRemove: build.mutation<
      PengumpulanControllerRemoveApiResponse,
      PengumpulanControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/pengumpulan/delete/${queryArg.id}`,
        method: "DELETE",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    nilaiControllerCreate: build.mutation<
      NilaiControllerCreateApiResponse,
      NilaiControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/nilai/create`,
        method: "POST",
        body: queryArg.createNilaiDto,
      }),
    }),
    nilaiControllerFindAll: build.query<
      NilaiControllerFindAllApiResponse,
      NilaiControllerFindAllApiArg
    >({
      query: () => ({ url: `/nilai/get-all` }),
    }),
    nilaiControllerFindOne: build.query<
      NilaiControllerFindOneApiResponse,
      NilaiControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/nilai/get-by-id/${queryArg.id}` }),
    }),
    nilaiControllerUpdate: build.mutation<
      NilaiControllerUpdateApiResponse,
      NilaiControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/nilai/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateNilaiDto,
      }),
    }),
    nilaiControllerRemove: build.mutation<
      NilaiControllerRemoveApiResponse,
      NilaiControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/nilai/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.registerDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/logout`,
        method: "POST",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    authControllerAutoLogin: build.mutation<
      AuthControllerAutoLoginApiResponse,
      AuthControllerAutoLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/autologin`,
        method: "POST",
        headers: { Authorization: queryArg.authorization },
      }),
    }),
    authControllerGetMe: build.query<
      AuthControllerGetMeApiResponse,
      AuthControllerGetMeApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/get-me`,
        headers: { Authorization: queryArg.authorization },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as ApiEiM3 };
export type UserControllerGetAllGuruApiResponse = GetAllGuru;
export type UserControllerGetAllGuruApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerGetAllSiswaApiResponse = GetAllSiswa;
export type UserControllerGetAllSiswaApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerCreateApiResponse = GlobalResponse;
export type UserControllerCreateApiArg = {
  /** Bearer [token] */
  authorization: string;
  /** Create a new User */
  createUserDto: CreateUserDto;
};
export type UserControllerGetAllApiResponse = unknown;
export type UserControllerGetAllApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerFinOneGuruApiResponse = GetGuruByID;
export type UserControllerFinOneGuruApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerFinOneSiswaApiResponse = GetSiswaByID;
export type UserControllerFinOneSiswaApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerUpdateApiResponse = GlobalResponse;
export type UserControllerUpdateApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
  /** Update User */
  updateUserDto: UpdateUserDto;
};
export type UserControllerToggleActiveStatusApiResponse = GlobalResponse;
export type UserControllerToggleActiveStatusApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
  updateIsActiveDto: UpdateIsActiveDto;
};
export type UserControllerDeleteApiResponse = GlobalResponse;
export type UserControllerDeleteApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerUserGetMeApiResponse = unknown;
export type UserControllerUserGetMeApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type UserControllerUpdateProfileUSerApiResponse = unknown;
export type UserControllerUpdateProfileUSerApiArg = {
  /** Bearer [token] */
  authorization: string;
  /** Update User */
  updateUserDto: UpdateUserDto;
};
export type PelajaranControllerCreateApiResponse = GlobalResponse;
export type PelajaranControllerCreateApiArg = {
  /** Bearer [token] */
  authorization: string;
  createPelajaranDto: CreatePelajaranDto;
};
export type PelajaranControllerFindAllApiResponse = GetAllPelajaran;
export type PelajaranControllerFindAllApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type PelajaranControllerFindOneApiResponse = GetOnePelajaran;
export type PelajaranControllerFindOneApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type PelajaranControllerFindBySekolahAndJenjangApiResponse = GetPelajaranbyQueryParams;
export type PelajaranControllerFindBySekolahAndJenjangApiArg = {
  sekolah: string;
  jenjang: number;
  /** Bearer [token] */
  authorization: string;
};
export type PelajaranControllerUpdateApiResponse = GlobalResponse;
export type PelajaranControllerUpdateApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
  updatePelajaranDto: UpdatePelajaranDto;
};
export type PelajaranControllerRemoveApiResponse = unknown;
export type PelajaranControllerRemoveApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type MateriControllerCreateApiResponse = GlobalResponse;
export type MateriControllerCreateApiArg = {
  /** Bearer [token] */
  authorization: string;
  createMateriDto: FormData;
};
export type MateriControllerFindAllApiResponse = unknown;
export type MateriControllerFindAllApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type MateriControllerFindOneApiResponse = GetOneMateri;
export type MateriControllerFindOneApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type MateriControllerUpdateApiResponse = GlobalResponse;
export type MateriControllerUpdateApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
  updateMateriDto: FormData;
};
export type MateriControllerRemoveApiResponse = GlobalResponse;
export type MateriControllerRemoveApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type TugasControllerCreateApiResponse = GlobalResponse;
export type TugasControllerCreateApiArg = {
  /** Bearer [token] */
  authorization: string;
  createTugasDto: FormData;
};
export type TugasControllerFindAllApiResponse = unknown;
export type TugasControllerFindAllApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type TugasControllerFindOneApiResponse = GetTugasByID;
export type TugasControllerFindOneApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type TugasControllerUpdateApiResponse = GlobalResponse;
export type TugasControllerUpdateApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
  updateTugasDto: FormData;
};
export type TugasControllerRemoveApiResponse = GlobalResponse;
export type TugasControllerRemoveApiArg = {
  id: number;
  /** Bearer [token] */
  authorization: string;
};
export type PengumpulanControllerCreateApiResponse = GlobalResponse;
export type PengumpulanControllerCreateApiArg = {
  /** Bearer [token] */
  authorization: string;
  createPengumpulanDto: FormData;
};
export type PengumpulanControllerFindAllApiResponse = unknown;
export type PengumpulanControllerFindAllApiArg = void;
export type PengumpulanControllerFindOneApiResponse = GetPengumpulanByID;
export type PengumpulanControllerFindOneApiArg = {
  id: number;
  authorization: string;
};
export type PengumpulanControllerUpdateApiResponse = GlobalResponse;
export type PengumpulanControllerUpdateApiArg = {
  id: number;
  updatePengumpulanDto: FormData;
  authorization: string;
};
export type PengumpulanControllerRemoveApiResponse = GlobalResponse;
export type PengumpulanControllerRemoveApiArg = {
  id: number;
  authorization: string;
};
export type NilaiControllerCreateApiResponse = unknown;
export type NilaiControllerCreateApiArg = {
  createNilaiDto: CreateNilaiDto;
};
export type NilaiControllerFindAllApiResponse = unknown;
export type NilaiControllerFindAllApiArg = void;
export type NilaiControllerFindOneApiResponse = unknown;
export type NilaiControllerFindOneApiArg = {
  id: number;
};
export type NilaiControllerUpdateApiResponse = unknown;
export type NilaiControllerUpdateApiArg = {
  id: number;
  updateNilaiDto: UpdateNilaiDto;
};
export type NilaiControllerRemoveApiResponse = unknown;
export type NilaiControllerRemoveApiArg = {
  id: number;
};
export type AuthControllerRegisterApiResponse = RegisterResponse;
export type AuthControllerRegisterApiArg = {
  registerDto: RegisterDto;
};
export type AuthControllerLoginApiResponse = GetMeResponse;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerLogoutApiResponse = unknown;
export type AuthControllerLogoutApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type AuthControllerAutoLoginApiResponse = AutoLoginResponse;
export type AuthControllerAutoLoginApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type AuthControllerGetMeApiResponse = unknown;
export type AuthControllerGetMeApiArg = {
  /** Bearer [token] */
  authorization: string;
};
export type CreateUserDto = {
  nama_lengkap: string;
  email?: string;
  username: string;
  password: string;
  confPassword: string;
  roleId: number;
  asal_sekolah?: string;
  isActive: boolean;
};
export type UpdateUserDto = {
  nama_lengkap: string;
  email?: string;
  username: string;
  password: string;
  confPassword: string;
  asal_sekolah?: string;
  isActive: boolean;
};
export type UpdateIsActiveDto = {
  isActive: boolean;
};
export type CreatePelajaranDto = {
  jenjang_kelas: number;
  asal_sekolah: string;
  nama_pelajaran: string;
};
export type UpdatePelajaranDto = {
  jenjang_kelas: number;
  asal_sekolah: string;
  nama_pelajaran: string;
};
export type CreateMateriDto = {
  /** ID pelajaran yang terkait dengan materi */
  pelajaranId: number;
  /** Nama materi */
  nama_materi: string;
  /** Isi materi */
  isi_materi: string;
};
export type UpdateMateriDto = {
  /** ID pelajaran yang terkait dengan materi */
  pelajaranId: number;
  /** Nama materi */
  nama_materi: string;
  /** Isi materi */
  isi_materi: string;
};
export type CreateTugasDto = {
  /** ID pelajaran yang terkait dengan tugas */
  pelajaranId: number;
  /** ID dari user yang membuat tugas */
  creatorId: number;
  /** Nama tugas */
  nama_tugas: string;
  /** Isi tugas */
  isi_tugas: string;
  /** Tanggal tugas dibuka */
  openIn: string;
  /** Tanggal batas waktu tugas */
  deadline: string;
};
export type UpdateTugasDto = {
  /** ID pelajaran yang terkait dengan tugas */
  pelajaranId: number;
  /** ID dari user yang membuat tugas */
  creatorId: number;
  /** Nama tugas */
  nama_tugas: string;
  /** Isi tugas */
  isi_tugas: string;
  /** Tanggal tugas dibuka */
  openIn: string;
  /** Tanggal batas waktu tugas */
  deadline: string;
};
export type CreatePengumpulanDto = {
  /** ID tugas yang terkait dengan pengumpulan */
  tugasId: number;
  /** Isi detail pengumpulan */
  detail_pengumpulan: string;
};
export type UpdatePengumpulanDto = {
  /** ID tugas yang terkait dengan pengumpulan */
  tugasId: number;
  /** Isi detail pengumpulan */
  detail_pengumpulan: string;
};
export type CreateNilaiDto = {
  /** ID Pengumpulan yang terkait dengan nilai */
  pengumpulanId: number;
  /** Nilai yang diberikan */
  nilai: number;
};
export type UpdateNilaiDto = {
  /** ID Pengumpulan yang terkait dengan nilai */
  pengumpulanId: number;
  /** Nilai yang diberikan */
  nilai: number;
};
export type RegisterDto = {
  nama_lengkap: string;
  email?: string;
  username: string;
  password: string;
  confPassword: string;
  roleId: number;
  asal_sekolah?: string;
  isActive: boolean;
};
export type LoginDto = {
  username: string;
  password: string;
  rememberMe: boolean;
};
export const {
  useUserControllerGetAllGuruQuery,
  useUserControllerGetAllSiswaQuery,
  useUserControllerCreateMutation,
  useUserControllerGetAllQuery,
  useUserControllerFinOneGuruQuery,
  useUserControllerFinOneSiswaQuery,
  useUserControllerUpdateMutation,
  useUserControllerToggleActiveStatusMutation,
  useUserControllerDeleteMutation,
  useUserControllerUserGetMeQuery,
  useUserControllerUpdateProfileUSerMutation,
  usePelajaranControllerCreateMutation,
  usePelajaranControllerFindAllQuery,
  usePelajaranControllerFindOneQuery,
  usePelajaranControllerFindBySekolahAndJenjangQuery,
  usePelajaranControllerUpdateMutation,
  usePelajaranControllerRemoveMutation,
  useMateriControllerCreateMutation,
  useMateriControllerFindAllQuery,
  useMateriControllerFindOneQuery,
  useMateriControllerUpdateMutation,
  useMateriControllerRemoveMutation,
  useTugasControllerCreateMutation,
  useTugasControllerFindAllQuery,
  useTugasControllerFindOneQuery,
  useTugasControllerUpdateMutation,
  useTugasControllerRemoveMutation,
  usePengumpulanControllerCreateMutation,
  usePengumpulanControllerFindAllQuery,
  usePengumpulanControllerFindOneQuery,
  usePengumpulanControllerUpdateMutation,
  usePengumpulanControllerRemoveMutation,
  useNilaiControllerCreateMutation,
  useNilaiControllerFindAllQuery,
  useNilaiControllerFindOneQuery,
  useNilaiControllerUpdateMutation,
  useNilaiControllerRemoveMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerLoginMutation,
  useAuthControllerLogoutMutation,
  useAuthControllerAutoLoginMutation,
  useAuthControllerGetMeQuery,
} = injectedRtkApi;
