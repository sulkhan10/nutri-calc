import { Link } from "react-router-dom";
import { ChartPieIcon, TableCellsIcon, UserIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { tdeeAtom, bmiAtom } from './atoms'; // Import the atoms

const Navigation = () => {
  // Use the atoms to get and set tdee and bmi
  const [tdee, setTdee] = useAtom(tdeeAtom);
  const [bmi, setBmi] = useAtom(bmiAtom);

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const storedTdee = localStorage.getItem("tdee");
    const storedBmi = localStorage.getItem("bmi");

    if (storedTdee) {
      setTdee(Number(storedTdee).toFixed(0));
    }

    if (storedBmi) {
      setBmi(Number(storedBmi).toFixed(1));
    }
  }, [setTdee, setBmi]); // Add setTdee and setBmi to the dependency array

  return (
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
              AKG {tdee 
              ? Number(tdee).toFixed(0) : 0
              } Kal
            </span>
          </div>
          <div className="flex items-center space-x-1 justify-center">
            <span>
              <UserIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
            </span>
            <span className="text-gray-50 text-xs">
              BMI {bmi
              ? Number(bmi).toFixed(1) : 0
              }
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
  );
};

export default Navigation;