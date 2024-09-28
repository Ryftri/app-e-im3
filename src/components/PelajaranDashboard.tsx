import { InfoCardPelajaran } from "./InfoCardPelajaran";
import { DataPelajaran } from "@/lib/interfaces/DataPelajaran";

const PelajaranDashboard = ({ 
  data,
  refetchPelajaran
}: { 
  data: DataPelajaran;
  refetchPelajaran: () => void
}) => {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pelajaran.map((pelajaran, index) => (
          <InfoCardPelajaran
            key={index}
            pelajaran={pelajaran}
            refetchPelajaran={refetchPelajaran}
          />
        ))}
      </div>
    );
  };
  
  export default PelajaranDashboard;