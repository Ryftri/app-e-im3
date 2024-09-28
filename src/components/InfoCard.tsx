import { Card } from "flowbite-react";

export const InfoCard = ({ title, count } : { title: string, count: number }) => {
    return (
        <Card className="w-full text-center">
        <h5 className="text-2xl font-bold">{count}</h5>
        <p className="text-gray-500">{title}</p>
        </Card>
    );
};