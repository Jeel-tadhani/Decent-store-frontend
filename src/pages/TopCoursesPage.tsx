import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { TopCourses } from "@/types/TopCourses";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

const TopCoursesPage = () => {

  // const { data } = useQuery({
  //   queryKey: [QUERY_KEYS.courseTopFive],
  //   queryFn: () => courseTopFive(),
  // });


  // let newData: any = data && data.data

  const columns: ColumnDef<TopCourses>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            ID
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "productname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Product Name
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Category
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Price
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "sell",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Sell
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
  ];

  const rows: any[] = [
    {
      id: "01",
      productname: "Smart Home Hub: Control Your Home with Ease",
      category: "Electronics",
      price: "₹7,500",
      sell: "120",
    },
    {
      id: "02",
      productname: "Organic Skin Care: Natural Beauty Solutions",
      category: "Beauty",
      price: "₹2,000",
      sell: "85",
    },
    {
      id: "03",
      productname: "Yoga Mat: Non-Slip, Eco-Friendly Exercise Mat",
      category: "Fitness",
      price: "₹1,200",
      sell: "200",
    },
    {
      id: "04",
      productname: "Wireless Earbuds: High-Quality Sound on the Go",
      category: "Electronics",
      price: "₹3,500",
      sell: "150",
    },
    {
      id: "05",
      productname: "Cooking with Love: Gourmet Recipe Collection",
      category: "Books",
      price: "₹500",
      sell: "95",
    }
  ];


  return (
    <div className="bg-primary-foreground rounded-[10px] w-full">
      <div className="flex justify-between pt-[25px] pb-[15px] pl-[18px] pr-[13px]">
        <h2 className="text-base font-bold">Top 5 Products</h2>
        <Button variant={"ghost"} className="text-base text-primary">
          View all
        </Button>
      </div>
      <DataTable data={rows} columns={columns} inputbox pagenationbox />
    </div>
  );
};
export default TopCoursesPage;
