import { Card, Spinner } from "flowbite-react";

export default function LoadingSkeletonDashboardGuru() {
  return (
    <>
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse max-w-sm">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="flex w-full justify-between space-x-4">
              <div className="h-10 bg-gray-300 rounded flex-grow"></div>
              <div className="h-10 bg-gray-300 rounded flex-grow"></div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
