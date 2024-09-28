import { InfoCard } from './InfoCard';

const DashboardLayoutAdmin = ({ data } : { data : {
    jumlahGuru: number;
    jumlahSiswa: number;
    jumlahPelajaran: number; 
}}) => {
  const { jumlahGuru, jumlahSiswa, jumlahPelajaran } = data;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoCard title="Jumlah Guru" count={jumlahGuru} />
      <InfoCard title="Jumlah Siswa" count={jumlahSiswa} />
      <InfoCard title="Jumlah Pelajaran" count={jumlahPelajaran} />
    </div>
  );
};

export default DashboardLayoutAdmin;
