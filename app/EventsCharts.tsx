"use client";
import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface Props {
  onGoing: number;
  ended: number;
  cancelled: number;
}

const EventsCharts = ({ onGoing, ended, cancelled }: Props) => {
  const data = [
    { label: "On Going", value: onGoing },
    { label: "Ended", value: ended },
    { label: "Cancelled", value: cancelled },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        {/* <BarChart width={500} height={300} data={data}> */}
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={60} />
          {/* <Bar dataKey="Ended" fill="#82ca9d" />
          <Bar dataKey="Cancelled" fill="#FF0000" /> */}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EventsCharts;
