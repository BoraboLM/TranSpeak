"use client";

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 flex flex-col bg-white gap-4 rounded-lg shadow-lg border-2 border-indigo-500">
                <p className="text-medium text-lg">{label}: Account Created</p>
                <p className="text-sm text-indigo-600">
                    Users:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
            </div>
        )
    }
}
export default function AreaChartComponent(user_chart_data) {
    const data = user_chart_data.data;
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={300} data={data} border-2 margin={{ right: 50 }}>
                <YAxis />
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="5 5" />
                <Legend />
                <Tooltip content={customTooltip} />

                <Area type={"monotone"} dataKey='users' fill="#C4B5FD" stackId={1} />
            </AreaChart>
        </ResponsiveContainer>
    )
}