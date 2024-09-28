export default function LoadingSkeletonAddPelajaran() {
  return (
    <>
      <div className="flex justify-between items-center mb-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>

      <form className="space-y-4">
        {/* Nama Pelajaran */}
        <div className="animate-pulse">
          <div className="block mb-2 h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>

        {/* Asal Sekolah */}
        <div className="animate-pulse">
          <div className="block mb-2 h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex items-center">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-1/6 ml-2"></div>
          </div>
        </div>

        {/* Jenjang Kelas */}
        <div className="animate-pulse">
          <div className="block mb-2 h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex items-center">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-1/6 ml-2"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </form>
    </>
  );
}
