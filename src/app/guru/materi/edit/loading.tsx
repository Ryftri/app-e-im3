import React from 'react';

const LoadingSkeletonUpdateMateri = () => {
  return (
    <div className="max-w-lg mx-auto p-5 space-y-4">
      <h2 className="h-8 w-48 bg-gray-200 rounded animate-pulse"></h2>

      {/* Skeleton for the error alert */}
      <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>

      {/* Skeleton for Nama Pelajaran */}
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
      </div>

      {/* Skeleton for Nama Materi */}
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
      </div>

      {/* Skeleton for Isi Materi */}
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-24 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
      </div>

      {/* Skeleton for File Upload */}
      <div>
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
        <ul className="mt-2 space-y-2">
          {Array(2).fill(0).map((_, index) => (
            <li key={index} className="h-6 w-full bg-gray-200 rounded animate-pulse"></li>
          ))}
        </ul>
      </div>

      {/* Skeleton for Submit Button */}
      <div className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default LoadingSkeletonUpdateMateri;
