import { Link } from "react-router-dom";
import { ChartPieIcon, TableCellsIcon, UserIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { tdeeAtom, bmiAtom } from './atoms'; // Import the atoms

const Navigation = () => {
  // Use the atoms to get tdee and bmi
  const [tdee] = useAtom(tdeeAtom);
  const [bmi] = useAtom(bmiAtom);

  return (
    <>
      {/* Navbar */}
      <div className="bg-[#4CAF50] w-screen h-16 px-4 absolute top-0 z-10 max-w-sm">
        <div className="py-4 flex justify-between items-center w-full">
          <Link to={"/"} className="text-xl font-bold text-gray-50 w-1/3">
            Nutri Calc
          </Link>
          <div className="flex space-x-2 text-sm">
            <div className="flex items-center space-x-1 justify-center">
              <span>
                <ChartPieIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
              </span>
              <span className="text-gray-50 text-xs">
                AKG {tdee ? Number(tdee).toFixed(0) : 0} Kal
              </span>
            </div>
            <div className="flex items-center space-x-1 justify-center">
              <span>
                <UserIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
              </span>
              <span className="text-gray-50 text-xs">
                BMI {bmi ? Number(bmi).toFixed(1) : 0}
              </span>
            </div>
            <Link className="flex items-center space-x-1 cursor-pointer" to={"/tdee"}>
              <span>
                <TableCellsIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
              </span>
              <span className="text-gray-50 text-xs">Data</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Prompt Message (Conditional Rendering) */}
      {!bmi && (
        <div className="absolute top-16 left-0 w-full bg-yellow-100 p-2 h-12 text-center text-sm text-yellow-800 z-10">
          <p>
            Please complete your data to calculate your BMI.{" "}
          </p>
            <Link to="/tdee" className="text-blue-500 underline">
              Go to Input Data
            </Link>
        </div>
      )}
    </>
  );
};

export default Navigation;