import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";


import {
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Legend,
  Title,
  Chart,
  Tooltip
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Legend,
  Tooltip
);


const CompaniesChartPage = () => {


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      data: [50, 25, 37, 50, 15, 75, 90, 60, 30],
      fill: false,
      borderColor: 'rgba(14, 156, 255, 1)',
      tension: 0.1
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
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
    <div className="w-full bg-primary-foreground rounded-[10px] mt-[20px] px-[12px] pb-[11px] pt-[17px]">
      <div className="flex justify-between">
        <h2 className="ml-[7px] text-base font-bold traning-organisations font-nunitoSans">
          Total Companies
        </h2>
        <Button className="py-[13px] pr-[15px] pl-[20px] rounded-[6px]">
          EXPORT REPORT
        </Button>
      </div>
      <div className="mt-[14px] ">
        <Line data={data} options={config.options} />

      </div>
    </div>
  );
};
export default CompaniesChartPage;
