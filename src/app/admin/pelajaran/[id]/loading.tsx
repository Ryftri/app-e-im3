import { Card } from "flowbite-react";

export default function LoadingSkeletonGetOnePelajaran() {
    return (
      <>
        <Card className="animate-pulse mb-6">
          <h5 className="text-2xl font-bold">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          </h5>
          <p className="text-gray-500">
            <strong>Sekolah :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </p>
          <p className="text-gray-500">
            <strong>Kelas :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </p>
          <p className="text-gray-500">
            <strong>Dibuat :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </p>
          <p className="text-gray-500">
            <strong>Diubah :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </p>
          <p className="text-gray-500">
            <strong>Kreator :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </p>
          {/* Tombol Edit Pelajaran Skeleton */}
          <div className="h-10 bg-gray-300 rounded w-1/4 mt-4"></div>
        </Card>

        {/* Skeleton untuk judul dan tombol list materi */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </h3>
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Skeleton untuk list materi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="max-w-sm animate-pulse">
              <h5 className="text-xl font-bold">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </h5>
              <p className="text-gray-500">
                <strong>Isi Materi :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </p>
              <p className="text-gray-500">
                <strong>Kreator :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </p>
              <p className="text-gray-500">
                <strong>Dibuat :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </p>
              <p className="text-gray-500">
                <strong>Diubah :</strong> <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </p>
              {/* Tombol Edit Materi Skeleton */}
              <div className="h-10 bg-gray-300 rounded w-1/2 mt-4"></div>
            </Card>
          ))}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-4">
              <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Skeleton untuk Previous */}
              <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Skeleton untuk Page Number */}
              <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Skeleton untuk Next */}
            </div>
          </div>
        </div>
      </>
    );
  }
  