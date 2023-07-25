import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar,Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type Transaction = {
  from: string,
  name: string,
  message: string,
  amount: number,
  timestamp: number
}

import { contractAddress, contractAbi } from "@/constants";
import { useContractRead, useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
type Props = {};
const Chart = (props: Props) => {
  const { address } = useAccount();
  const getTx = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getTx",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  const [chartData, setChartData] = useState<any>({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

 

  useEffect(() => {
    if (getTx?.data && Array.isArray(getTx.data)) {
      const transactions = getTx.data;
      const amounts = transactions.map((transaction: Transaction) => ethers.utils.formatEther(transaction.amount));
      setChartData({
        labels: transactions.map((transaction: Transaction) => new Date(Number(transaction.timestamp) * 1000).getDate()),
        datasets: [
          {
            label: "Amount in MATIC",
            data:  amounts,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgb(53, 162, 235, 0.4)",
          },
        ],
      });
      setChartOptions({
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Donations",
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      });
    }
  }, [getTx?.data]);

  return (
    <div className="w-full  relative lg:h-[70vh] h-[10px] m-auto rounded-lg bg-white">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
export default Chart;
