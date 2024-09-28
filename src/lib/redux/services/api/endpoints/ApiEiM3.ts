import { GetAllGuru } from "@/types/GetAllGuru";
import { ApiEiM3Slice as api } from "../ApiEiM3Slice";
import { GetAllSiswa } from "@/types/GetAllSiswa";
import { GetAllPelajaran } from "@/types/GetAllPelajaran";
import { GetMeResponse } from "@/types/GetMeResponse";
import { RegisterResponse } from "@/types/RegisterResponse";
import { getCookie } from "cookies-next";
import { GlobalResponse } from "@/types/GlobalResponse";



export const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userControllerGetAllGuru: build.query<
      UserControllerGetAllGuruApiResponse,
      UserControllerGetAllGuruApiArg
    >({
      query: () => ({ url: `/users/get-all-guru` }),
    }),
    userControllerGetAllSiswa: build.query<
      UserControllerGetAllSiswaApiResponse,
      UserControllerGetAllSiswaApiArg
    >({
      query: () => ({ url: `/users/get-all-siswa` }),
    }),
    userControllerCreate: build.mutation<
      UserControllerCreateApiResponse,
      UserControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/create`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    userControllerGetAll: build.query<
      UserControllerGetAllApiResponse,
      UserControllerGetAllApiArg
    >({
      query: () => ({ url: `/users/get-all` }),
    }),
    userControllerFinOneGuru: build.query<
      UserControllerFinOneGuruApiResponse,
      UserControllerFinOneGuruApiArg
    >({
      query: (queryArg) => ({ url: `/users/find-one-guru/${queryArg.id}` }),
    }),
    userControllerFinOneSiswa: build.query<
      UserControllerFinOneSiswaApiResponse,
      UserControllerFinOneSiswaApiArg
    >({
      query: (queryArg) => ({ url: `/users/find-one-siswa/${queryArg.id}` }),
    }),
    userControllerUpdate: build.mutation<
      UserControllerUpdateApiResponse,
      UserControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
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
      }),
    }),
    userControllerDelete: build.mutation<
      UserControllerDeleteApiResponse,
      UserControllerDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/users/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    userControllerUserGetMe: build.query<
      UserControllerUserGetMeApiResponse,
      UserControllerUserGetMeApiArg
    >({
      query: () => ({ url: `/users/get-me` }),
    }),
    userControllerUpdateProfileUSer: build.mutation<
      UserControllerUpdateProfileUSerApiResponse,
      UserControllerUpdateProfileUSerApiArg
    >({
      query: (queryArg) => ({
        url: `/users/update-profile`,
        method: "PATCH",
        body: queryArg.updateUserDto,
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
        headers: {
          "Authorization": `Bearer ${getCookie('refreshToken')}`
        },
      }),
    }),
    pelajaranControllerFindAll: build.query<
      PelajaranControllerFindAllApiResponse,
      PelajaranControllerFindAllApiArg
    >({
      query: () => ({
        url: `/pelajaran/get-all`,
        headers: {
          "Authorization": `Bearer ${getCookie('refreshToken')}`
        },
      }),
    }),
    pelajaranControllerFindOne: build.query<
      PelajaranControllerFindOneApiResponse,
      PelajaranControllerFindOneApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/get-by-id/${queryArg.id}`,
        headers: {
          "Authorization": `Bearer ${getCookie('refreshToken')}`
        },
      }),
    }),
    pelajaranControllerFindBySekolahAndJenjang: build.query<
      PelajaranControllerFindBySekolahAndJenjangApiResponse,
      PelajaranControllerFindBySekolahAndJenjangApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/get-by-sekolah-jenjang`,
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
      }),
    }),
    pelajaranControllerRemove: build.mutation<
      PelajaranControllerRemoveApiResponse,
      PelajaranControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/pelajaran/delete/${queryArg.id}`,
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${getCookie('refreshToken')}`
        }
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
      }),
    }),
    materiControllerFindAll: build.query<
      MateriControllerFindAllApiResponse,
      MateriControllerFindAllApiArg
    >({
      query: () => ({ url: `/materi/get-all` }),
    }),
    materiControllerFindOne: build.query<
      MateriControllerFindOneApiResponse,
      MateriControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/materi/get-by-id/${queryArg.id}` }),
    }),
    materiControllerUpdate: build.mutation<
      MateriControllerUpdateApiResponse,
      MateriControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateMateriDto,
      }),
    }),
    materiControllerRemove: build.mutation<
      MateriControllerRemoveApiResponse,
      MateriControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/materi/delete/${queryArg.id}`,
        method: "DELETE",
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
      }),
    }),
    tugasControllerFindAll: build.query<
      TugasControllerFindAllApiResponse,
      TugasControllerFindAllApiArg
    >({
      query: () => ({ url: `/tugas/get-all` }),
    }),
    tugasControllerFindOne: build.query<
      TugasControllerFindOneApiResponse,
      TugasControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/tugas/get-by-id/${queryArg.id}` }),
    }),
    tugasControllerUpdate: build.mutation<
      TugasControllerUpdateApiResponse,
      TugasControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateTugasDto,
      }),
    }),
    tugasControllerRemove: build.mutation<
      TugasControllerRemoveApiResponse,
      TugasControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/tugas/delete/${queryArg.id}`,
        method: "DELETE",
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
      query: (queryArg) => ({ url: `/pengumpulan/get-by-id/${queryArg.id}` }),
    }),
    pengumpulanControllerUpdate: build.mutation<
      PengumpulanControllerUpdateApiResponse,
      PengumpulanControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/pengumpulan/update/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updatePengumpulanDto,
      }),
    }),
    pengumpulanControllerRemove: build.mutation<
      PengumpulanControllerRemoveApiResponse,
      PengumpulanControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/pengumpulan/delete/${queryArg.id}`,
        method: "DELETE",
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
    userOnMateriControllerCreate: build.mutation<
      UserOnMateriControllerCreateApiResponse,
      UserOnMateriControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user-on-materi/create`,
        method: "POST",
        body: queryArg.createUserOnMateriDto,
      }),
    }),
    userOnMateriControllerFindAll: build.query<
      UserOnMateriControllerFindAllApiResponse,
      UserOnMateriControllerFindAllApiArg
    >({
      query: () => ({ url: `/user-on-materi/get-all` }),
    }),
    userOnMateriControllerFindOneByMateriId: build.query<
      UserOnMateriControllerFindOneByMateriIdApiResponse,
      UserOnMateriControllerFindOneByMateriIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user-on-materi/get-by-materi-id/${queryArg.materiId}`,
      }),
    }),
    userOnMateriControllerFindOneByUserId: build.query<
      UserOnMateriControllerFindOneByUserIdApiResponse,
      UserOnMateriControllerFindOneByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user-on-materi/get-by-user-id/${queryArg.userId}`,
      }),
    }),
    userOnMateriControllerRemove: build.mutation<
      UserOnMateriControllerRemoveApiResponse,
      UserOnMateriControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/user-on-materi/delete/${queryArg.userId}/${queryArg.materiId}`,
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
      query: () => ({
        url: `/auth/logout`, method: "POST",
        headers: {
          'Authorization': `Bearer ${getCookie('refreshToken')}`,
        }
      }),
    }),
    authControllerAutoLogin: build.mutation<
      AuthControllerAutoLoginApiResponse,
      AuthControllerAutoLoginApiArg
    >({
      query: () => ({ url: `/auth/autologin`, method: "POST" }),
    }),
    authControllerGetMe: build.query<
      AuthControllerGetMeApiResponse,
      AuthControllerGetMeApiArg
    >({
      query: () => ({ url: `/auth/get-me` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as ApiEiM3 };
export type UserControllerGetAllGuruApiResponse = GetAllGuru;
export type UserControllerGetAllGuruApiArg = void;
export type UserControllerGetAllSiswaApiResponse = GetAllSiswa;
export type UserControllerGetAllSiswaApiArg = void;
export type UserControllerCreateApiResponse = unknown;
export type UserControllerCreateApiArg = {
  /** Create a new User */
  createUserDto: CreateUserDto;
};
export type UserControllerGetAllApiResponse = unknown;
export type UserControllerGetAllApiArg = void;
export type UserControllerFinOneGuruApiResponse = unknown;
export type UserControllerFinOneGuruApiArg = {
  id: number;
};
export type UserControllerFinOneSiswaApiResponse = unknown;
export type UserControllerFinOneSiswaApiArg = {
  id: number;
};
export type UserControllerUpdateApiResponse = unknown;
export type UserControllerUpdateApiArg = {
  id: number;
  /** Update User */
  updateUserDto: UpdateUserDto;
};
export type UserControllerToggleActiveStatusApiResponse = unknown;
export type UserControllerToggleActiveStatusApiArg = {
  id: number;
  updateIsActiveDto: UpdateIsActiveDto;
};
export type UserControllerDeleteApiResponse = unknown;
export type UserControllerDeleteApiArg = {
  id: number;
};
export type UserControllerUserGetMeApiResponse = unknown;
export type UserControllerUserGetMeApiArg = void;
export type UserControllerUpdateProfileUSerApiResponse = unknown;
export type UserControllerUpdateProfileUSerApiArg = {
  /** Update User */
  updateUserDto: UpdateUserDto;
};
export type PelajaranControllerCreateApiResponse = GlobalResponse;
export type PelajaranControllerCreateApiArg = {
  createPelajaranDto: CreatePelajaranDto;
};
export type PelajaranControllerFindAllApiResponse = GetAllPelajaran;
export type PelajaranControllerFindAllApiArg = void;
export type PelajaranControllerFindOneApiResponse = unknown;
export type PelajaranControllerFindOneApiArg = {
  id: number;
};
export type PelajaranControllerFindBySekolahAndJenjangApiResponse = unknown;
export type PelajaranControllerFindBySekolahAndJenjangApiArg = {
  sekolah: string;
  jenjang: number;
};
export type PelajaranControllerUpdateApiResponse = unknown;
export type PelajaranControllerUpdateApiArg = {
  id: number;
  updatePelajaranDto: UpdatePelajaranDto;
};
export type PelajaranControllerRemoveApiResponse = unknown;
export type PelajaranControllerRemoveApiArg = {
  id: number;
};
export type MateriControllerCreateApiResponse = unknown;
export type MateriControllerCreateApiArg = {
  createMateriDto: CreateMateriDto;
};
export type MateriControllerFindAllApiResponse = unknown;
export type MateriControllerFindAllApiArg = void;
export type MateriControllerFindOneApiResponse = unknown;
export type MateriControllerFindOneApiArg = {
  id: number;
};
export type MateriControllerUpdateApiResponse = unknown;
export type MateriControllerUpdateApiArg = {
  id: number;
  updateMateriDto: UpdateMateriDto;
};
export type MateriControllerRemoveApiResponse = unknown;
export type MateriControllerRemoveApiArg = {
  id: number;
};
export type TugasControllerCreateApiResponse = unknown;
export type TugasControllerCreateApiArg = {
  createTugasDto: CreateTugasDto;
};
export type TugasControllerFindAllApiResponse = unknown;
export type TugasControllerFindAllApiArg = void;
export type TugasControllerFindOneApiResponse = unknown;
export type TugasControllerFindOneApiArg = {
  id: number;
};
export type TugasControllerUpdateApiResponse = unknown;
export type TugasControllerUpdateApiArg = {
  id: number;
  updateTugasDto: UpdateTugasDto;
};
export type TugasControllerRemoveApiResponse = unknown;
export type TugasControllerRemoveApiArg = {
  id: number;
};
export type PengumpulanControllerCreateApiResponse = unknown;
export type PengumpulanControllerCreateApiArg = {
  createPengumpulanDto: CreatePengumpulanDto;
};
export type PengumpulanControllerFindAllApiResponse = unknown;
export type PengumpulanControllerFindAllApiArg = void;
export type PengumpulanControllerFindOneApiResponse = unknown;
export type PengumpulanControllerFindOneApiArg = {
  id: number;
};
export type PengumpulanControllerUpdateApiResponse = unknown;
export type PengumpulanControllerUpdateApiArg = {
  id: number;
  updatePengumpulanDto: UpdatePengumpulanDto;
};
export type PengumpulanControllerRemoveApiResponse = unknown;
export type PengumpulanControllerRemoveApiArg = {
  id: number;
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
export type UserOnMateriControllerCreateApiResponse = unknown;
export type UserOnMateriControllerCreateApiArg = {
  createUserOnMateriDto: CreateUserOnMateriDto;
};
export type UserOnMateriControllerFindAllApiResponse = unknown;
export type UserOnMateriControllerFindAllApiArg = void;
export type UserOnMateriControllerFindOneByMateriIdApiResponse = unknown;
export type UserOnMateriControllerFindOneByMateriIdApiArg = {
  materiId: number;
};
export type UserOnMateriControllerFindOneByUserIdApiResponse = unknown;
export type UserOnMateriControllerFindOneByUserIdApiArg = {
  userId: number;
};
export type UserOnMateriControllerRemoveApiResponse = unknown;
export type UserOnMateriControllerRemoveApiArg = {
  userId: number;
  materiId: number;
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
export type AuthControllerLogoutApiArg = void;
export type AuthControllerAutoLoginApiResponse = unknown;
export type AuthControllerAutoLoginApiArg = void;
export type AuthControllerGetMeApiResponse = unknown;
export type AuthControllerGetMeApiArg = void;
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
  /** ID materi yang terkait dengan tugas */
  materiId: number;
  /** Nama tugas */
  nama_tugas: string;
  /** Isi tugas dalam format JSON */
  isi_tugas: string[];
  /** Tanggal batas waktu tugas */
  deadline: string;
};
export type UpdateTugasDto = {
  /** ID materi yang terkait dengan tugas */
  materiId: number;
  /** Nama tugas */
  nama_tugas: string;
  /** Isi tugas dalam format JSON */
  isi_tugas: string[];
  /** Tanggal batas waktu tugas */
  deadline: string;
};
export type CreatePengumpulanDto = {
  /** ID tugas yang terkait dengan pengumpulan */
  tugasId: number;
  /** Isi pengumpulan dalam format JSON */
  isi_pengumpulan: string[];
};
export type UpdatePengumpulanDto = {
  /** ID tugas yang terkait dengan pengumpulan */
  tugasId: number;
  /** Isi pengumpulan dalam format JSON */
  isi_pengumpulan: string[];
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
export type CreateUserOnMateriDto = {
  /** ID materi yang terkait dengan pengguna */
  materiId: number;
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
  useUserOnMateriControllerCreateMutation,
  useUserOnMateriControllerFindAllQuery,
  useUserOnMateriControllerFindOneByMateriIdQuery,
  useUserOnMateriControllerFindOneByUserIdQuery,
  useUserOnMateriControllerRemoveMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerLoginMutation,
  useAuthControllerLogoutMutation,
  useAuthControllerAutoLoginMutation,
  useAuthControllerGetMeQuery,
} = injectedRtkApi;
