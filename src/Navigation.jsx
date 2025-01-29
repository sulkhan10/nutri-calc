import { Link } from "react-router-dom";
import { ChartPieIcon, TableCellsIcon, UserIcon } from '@heroicons/react/24/solid'

const Navigation = () => {
  return (
    <div className="bg-[#4CAF50] w-screen h-16 px-4 absolute top-0  z-10 max-w-sm ">
      <div className="  py-4 flex justify-between items-center w-full">
        <Link
        to={"/"}
        className="text-xl font-bold text-gray-50 w-1/3">Nutri Calc</Link>
        <div className="flex space-x-2 text-sm">
          <div className="flex items-center space-x-1 justify-center">
            <span>
            <ChartPieIcon className="h-4 w-4 " color="#1B5E20" aria-hidden="true" />

            </span>
            <span className="text-gray-50 text-xs">
              AKG{" "}
              {localStorage.getItem("tdee") ? Number(localStorage.getItem("tdee")).toFixed(0) : 0} Kal
            </span>
          </div>
          <div className="flex items-center space-x-1 justify-center">
            <span>
            <UserIcon className="h-4 w-4 " color="#1B5E20" aria-hidden="true" />

            </span>
            <span className="text-gray-50 text-xs">
              BMI{" "}
              {localStorage.getItem("bmi") ? Number(localStorage.getItem("bmi")).toFixed(1) : ""}
            </span>
          </div>
          <Link className="flex items-center space-x-1 cursor-pointer"
          to={"/tdee"}
          >
            <span>
            <TableCellsIcon className="h-4 w-4 " color="#1B5E20" aria-hidden="true" />

            </span>
            <span className="text-gray-50 text-xs">Data</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
