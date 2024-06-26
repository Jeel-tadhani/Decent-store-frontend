import building from "/assets/icons/building.svg";
import usersqure from "/assets/icons/usersqure.svg";
import twouser from "/assets/icons/twouser.svg";
import book from "/assets/icons/book.svg";
import { useState } from "react";
import DashboardPage from "./DashboardPage";
import CompaniesChartPage from "./CompaniesChartPage";

const TotalCountPage = () => {

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);

  };

  return (
    <div className="flex items-center gap-[21px] justify-between">
      <button
        className={`py-[21px] bg-${activeButton === 'companies' ? 'primary text-white' : 'primary-foreground '} rounded-[10px] flex flex-col items-center w-[300px] hover:bg-primary hover:text-primary-foreground`}
        onClick={() => handleClick('companies')}
      >
        <div className="bg-background w-[76px] h-[73px] rounded-full">
          <img src={building} alt="" className="px-[18px] pt-[15px] pb-[18px]" />
        </div>
        <h2 className="mt-[10px] text-[32px] font-bold">100</h2>
        <p className="text-[16px] mt-[4px]">Total Seller</p>
      </button>

      <button
        className={`w-[300px] py-[21px] rounded-[10px] flex flex-col items-center ${activeButton === 'trainingProviders' ? 'bg-primary text-white' : 'bg-primary-foreground'} hover:bg-primary hover:text-primary-foreground`}
        onClick={() => handleClick('trainingProviders')}
      >
        <div className="bg-background w-[76px] h-[73px] rounded-full">
          <img src={usersqure} alt="" className="px-[18px] pt-[17px] pb-[25px]" />
        </div>
        <h2 className="mt-[10px] text-[32px] font-bold">₹ 2750</h2>
        <p className="text-[16px] mt-[4px]">Average Sales per User</p>
      </button>

      <button
        className={`w-[300px] py-[21px] rounded-[10px] flex flex-col items-center ${activeButton === 'trainers' ? 'bg-primary text-white' : 'bg-primary-foreground'} hover:bg-primary hover:text-primary-foreground`}
        onClick={() => handleClick('trainers')}
      >
        <div className="bg-background w-[76px] h-[73px] rounded-full">
          <img src={twouser} alt="" className="px-[15px] py-[20px]" />
        </div>
        <h2 className="mt-[10px] text-[32px] font-bold">300</h2>
        <p className="text-[16px] mt-[4px]">Total User</p>
      </button>

      <button
        className={`w-[300px] py-[21px]  rounded-[10px] flex flex-col items-center ${activeButton === 'courses' ? 'bg-primary text-white' : 'bg-primary-foreground'} hover:bg-primary hover:text-primary-foreground`}
        onClick={() => handleClick('courses')}
      >
        <div className="bg-background w-[76px] h-[73px] rounded-full">
          <img src={book} alt="" className="px-[18px] pt-[21px] pb-[20px]" />
        </div>
        <h2 className="mt-[10px] text-[32px] font-bold">50</h2>
        <p className="text-[16px] mt-[4px]">Total Products</p>
      </button>

    </div>
  );
};
export default TotalCountPage;
