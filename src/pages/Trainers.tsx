import { DataTable } from "@/components/comman/DataTable";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import eye from "/assets/icons/eye.svg";
import delet from "/assets/icons/delet.svg";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import pencil from "/assets/icons/pencil.svg";
import { Trainer } from "@/types/Trainers";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchTrainers } from "@/services/apiServices/trainers";
import { useState } from "react";
import Loading from "@/components/comman/Loading";



function Trainers() {

    const dispatch = useDispatch();


    const [page, setPage] = useState(1);


    const { data, isPending } = useQuery({
        queryKey: [QUERY_KEYS.trainersList],
        queryFn: () => fetchTrainers(),
    });


    console.log(data);


    const colums: ColumnDef<Trainer>[] = [
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
            accessorKey: "companyName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Trainer Name
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
            accessorKey: "country",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Country
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
            accessorKey: "address",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Provider Name
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
            accessorKey: "providertype",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Provider Type
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
            accessorKey: "employees",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Mobile Number
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
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Status
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
            cell: () => {
                return <Badge className="">Active</Badge>;
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-[12px] ">
                        <Button
                            variant={"ghost"}
                            className="p-0"
                            onClick={() =>
                                dispatch(
                                    setPath([
                                        {
                                            name: "Training Management",
                                            link: null,
                                        },
                                        {
                                            name: "Training Organisations",
                                            link: "/training-organisations",
                                        },
                                        {
                                            name: row.original,
                                            link: "/training-organisations-details",
                                        },
                                    ])
                                )
                            }>
                            <img src={eye} alt="" />
                        </Button>

                        <Button
                            onClick={() =>
                                dispatch(
                                    setPath([
                                        { name: "User Management", link: null },
                                        ,
                                        {
                                            name: "Users",
                                            link: "/users",
                                        },
                                        {
                                            name: row.original.name,
                                            link: `/user-details/${row.original.id}`,
                                        },
                                    ])
                                )
                            }
                            variant={"ghost"}
                            className="p-0">
                            <img src={pencil} alt="" />
                        </Button>

                        <Button variant={"ghost"} className="p-0">
                            <img src={delet} alt="" />
                        </Button>
                    </div>
                );
            },
        },
    ];
    // const rows: Trainer[] = [
    //     {
    //         id: "#01",
    //         name: "Training Company 1",
    //         providerCity: "",
    //         providerType: "",
    //         providerCounty: "",
    //     },
    //     {
    //         id: "#02",
    //         name: "Training Company 2",
    //         providerCity: "",
    //         providerType: "",
    //         providerCounty: "",
    //     },
    // ];

    return (
        <div className="bg-primary-foreground rounded-[6px]">
            <div className="border-b-2 pb-[25px] flex justify-between">
                <h2 className="text-base font-bold mt-[22px] pl-[23px] first-line:font-nunitoSans">
                    Training Organisations
                </h2>
            </div>
            <DataTable columns={colums}
                data={data?.data?.data || []}
            />


            <Loading
                isLoading={isPending}
            />
        </div>
    );
}

export default Trainers;