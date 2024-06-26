import { Button } from "@/components/ui/button";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const CourseEnrollmentPage = () => {

  const Chartdata = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [
        { month: 'Jan', enrollmentsCount: 10 },
        { month: 'Feb', enrollmentsCount: 20 },
        { month: 'Mar', enrollmentsCount: 30 },
        { month: 'Apr', enrollmentsCount: 40 },
        { month: 'May', enrollmentsCount: 50 },
        { month: 'Jun', enrollmentsCount: 60 },
        { month: 'Jul', enrollmentsCount: 70 },
        { month: 'Aug', enrollmentsCount: 80 },
        { month: 'Sep', enrollmentsCount: 90 },
        { month: 'Oct', enrollmentsCount: 100 },
        { month: 'Nov', enrollmentsCount: 110 },
        { month: 'Dec', enrollmentsCount: 120 },
      ],
      backgroundColor: [
        'rgba(2, 99, 255, 1)',
        'rgba(255, 119, 35, 1)',
        'rgba(142, 48, 255, 1)',
        'rgba(164, 70, 170, 1)',
        'rgba(169, 141, 70, 1)',
        'rgba(150, 230, 227, 1)',
        'rgba(94, 169, 214, 1)',
        'rgba(75, 22, 255, 1)',
        'rgba(3, 98, 37, 1)',
        'rgba(255, 34, 203, 1)',
        'rgba(57, 167, 222, 1)'
      ],
      barThickness: 20
    }]
  };

  const config = {
    type: 'bar',
    data: [
      { month: 'Jan', enrollmentsCount: 10 },
      { month: 'Feb', enrollmentsCount: 20 },
      { month: 'Mar', enrollmentsCount: 30 },
      { month: 'Apr', enrollmentsCount: 40 },
      { month: 'May', enrollmentsCount: 50 },
      { month: 'Jun', enrollmentsCount: 60 },
      { month: 'Jul', enrollmentsCount: 70 },
      { month: 'Aug', enrollmentsCount: 80 },
      { month: 'Sep', enrollmentsCount: 90 },
      { month: 'Oct', enrollmentsCount: 100 },
      { month: 'Nov', enrollmentsCount: 110 },
      { month: 'Dec', enrollmentsCount: 120 },
    ],
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 25,
          }
        }
      }
    },
  };

  return (
    <div className="bg-primary-foreground rounded-[10px] pl-[19px] pr-[11px] py-[13px] font-nunitoSans w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-bold">
          Course Enrollment Trends Over Time
        </h2>
        <Button className="py-[13px] pr-[15px] pl-[20px] rounded-[6px]">
          EXPORT REPORT
        </Button>
      </div>
      <div className="mt-[14px]">
        <Bar
          data={Chartdata}
          options={config.options}
        />
      </div>
    </div>
  );
};
export default CourseEnrollmentPage;
