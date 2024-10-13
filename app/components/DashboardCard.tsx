import { Card, CardContent } from "@/components/ui/card";
// import { FaNewspaper } from "react-icons/fa";
interface DashBoardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement;
}
const DashBoardCard = ({ title, count, icon }: DashBoardCardProps) => {
  return (
    <Card className="bg-slate-100 p-4 pb-0">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-slate-500">
          {title}
        </h3>
        <div className="flex  flex-row gap-5 items-center ">
          <h3 className="text-5xl font-semibold text-slate-500">{count}</h3>
          <div className="ml-2">{icon}</div>
          {/* <FaNewspaper className="inline text-slate-500" size={72} /> */}
          {/* <p className="text-2xl text-slate-500 ml-2">News</p> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashBoardCard;
