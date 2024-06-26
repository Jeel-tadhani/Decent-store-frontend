import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTable } from "@/components/comman/DataTable";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import pencil from "/assets/icons/pencil.svg";
import delet from "/assets/icons/delet.svg";
import eye from "/assets/icons/eye.svg";
import { Client } from "@/types/Client";
import SuccessModel from "@/components/Modal/SuccessModel";
import Loading from "@/components/comman/Loading";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteClient,
	fetchClient,
} from "@/services/apiServices/clientServices";
import { QUERY_KEYS } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/Errors";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import { setNewClientCreate } from "@/redux/Reducer/ClientReducer";

const ClientsPage = () => {
	const { newClientCreate } = useSelector((state: any) => state.client);

	const [openSuccess, setOpenSuccess] = useState(newClientCreate);
	const [openDelete, setOpenDelete] = useState<boolean | Client>(false);
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.clientList, page],
		queryFn: () => fetchClient(page.toString(), "10"),
	});
	const { mutate: delete_client, isPending: deletePanding } = useMutation({
		mutationFn: (clientId: string) => deleteClient(clientId),
		onSuccess: () => {
			toast({ title: "Client delete Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientList] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const colums: ColumnDef<Client>[] = [
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
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Client Name
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
			accessorKey: "region",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Region
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
			accessorKey: "number",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Contact Number
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
			accessorKey: "type",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Type
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
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Email ID
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
			cell: ({ row }) => {
				return (
					<Badge
						className={`${
							row.original.status === "Active"
								? "bg-[#58BA66] hover:bg-[#58BA66]/80"
								: row.original.status === "Inactive"
								? "bg-[#FF5252] hover:bg-[#FF5252]/80"
								: "bg-[#FFA25E] hover:bg-[#FFA25E]/80"
						} w-20 p-auto h-8 flex items-center justify-center`}>
						{row.original.status}
					</Badge>
				);
			},
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-[12px] w-[72px]">
						<Button
							variant={"ghost"}
							className="p-0"
							onClick={() =>
								dispatch(
									setPath([
										{ name: "Client Management", link: null },
										{
											name: "Client details",
											link: `client-details/${row.original.id}`,
										},
									])
								)
							}>
							<img src={eye} alt="view" width={18} height={12.38} />
						</Button>

						<Button
							variant={"ghost"}
							className="p-0"
							onClick={() =>
								dispatch(
									setPath([
										{ name: "Client Management", link: null },
										{
											name: "Update Client",
											link: `add-client?clientId=${row.original.id}`,
										},
									])
								)
							}>
							<img src={pencil} alt="edit" width={16} height={16} />
						</Button>

						<Button
							variant={"ghost"}
							className="p-0"
							onClick={() => {
								setOpenDelete(row.original);
							}}>
							<img src={delet} alt="delete" width={14} height={16.15} />
						</Button>
					</div>
				);
			},
		},
	];

	const handleDelete = () => {
		delete_client((openDelete as Client).id as string);
		setOpenDelete(false);
	};

	return (
		<div className="bg-white h-full rounded-[6px]">
			<div className="flex justify-between items-center px-5 font-nunitoSans text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
				<h2 className="font-bold">Client Management</h2>
				<Button
					onClick={() =>
						dispatch(
							setPath([
								{ name: "Client Management", link: null },
								{
									name: "Add Client",
									link: "add-client",
								},
							])
						)
					}
					className="font-semibold text-base py-[10px] px-[20px] leading-[22px]">
					ADD NEW
				</Button>
			</div>
			<div>
				<DataTable
					columns={colums}
					data={data?.data?.data || []}
					totalCount={data?.data?.metadata?.totalCount}
					pagination={{ pageIndex: page, pageSize: 10 }}
					setPage={setPage}
				/>
			</div>

			<SuccessModel
				open={openSuccess}
				onClose={() => {
					setOpenSuccess(false), dispatch(setNewClientCreate());
				}}
				title="Client has been added successfully"
			/>
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.name}
			/>
			<Loading isLoading={isPending || deletePanding} />
		</div>
	);
};

export default ClientsPage;
