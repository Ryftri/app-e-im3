import { InfoCard } from './InfoCard';

const DashboardLayoutGuru = ({ data } : { data : {
    jumlahPelajaran: number; 
}}) => {
  const { jumlahPelajaran } = data;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoCard title="Jumlah Pelajaran" count={jumlahPelajaran} />
    </div>
  );
};

export default DashboardLayoutGuru;
