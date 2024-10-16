import { InfoCard } from './InfoCard';

const DashboardLayoutSiswa = ({ data } : { data : {
    jumlahPenumpulanTugas: number; 
}}) => {
  const { jumlahPenumpulanTugas } = data;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoCard title="Jumlah Pegumpulan Tugas" count={jumlahPenumpulanTugas} />
    </div>
  );
};

export default DashboardLayoutSiswa;
