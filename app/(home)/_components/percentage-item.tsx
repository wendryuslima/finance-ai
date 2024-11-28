import { ReactNode } from "react";

interface PercentageTypeProps {
  title: string;
  icon: ReactNode;
  value: number;
}

const PercentageType = ({ title, icon, value }: PercentageTypeProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-white bg-opacity-[3%] rounded-lg p-2">{icon}</div>
        <p>{title}</p>
      </div>
      <p className="font-bold text-sm"> {value}%</p>
    </div>
  );
};

export default PercentageType;
