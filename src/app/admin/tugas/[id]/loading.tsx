import { Card, ListGroup } from 'flowbite-react';
import React from 'react';

const LoadingSkeletonGetOneTugas = () => {
    return (
        <div className="p-4">
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    <ListGroup>
                        {Array(3).fill('').map((_, index) => (
                            <ListGroup.Item key={index} className="flex justify-between">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="mt-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoadingSkeletonGetOneTugas;
