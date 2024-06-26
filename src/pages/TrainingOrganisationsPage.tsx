import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { TainingOrganisation } from "@/types/TainingOrganisation";
import { ColumnDef } from "@tanstack/react-table";
import eye from "/assets/icons/eye.svg";
import delet from "/assets/icons/delet.svg";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
	deleteTrainerOrganisation,
	fetchTrainerOrganisationList,
} from "@/services/apiServices/trainerOrganisationServices";
import Loading from "@/components/comman/Loading";
import { QUERY_KEYS } from "@/lib/constants";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import { ErrorType } from "@/types/Errors";

const TrainingManagementPage = () => {
	const [page, setPage] = useState(1);
	const [openDelete, setOpenDelete] = useState<boolean | TainingOrganisation>(
		false
	);
	const { id } = useSelector((state: any) => state.user);

	const dispatch = useDispatch();
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.trainerOrganisationList, page],
		queryFn: () => fetchTrainerOrganisationList(page.toString(), "10", id),
	});
	const { mutate: delete_trainer_organisation, isPending: deletePanding } =
		useMutation({
			mutationFn: (id: string) => deleteTrainerOrganisation(id),
			onSuccess: () => {
				toast({ title: "Training organisation delete successfully" });
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.trainerOrganisationList],
				});
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});
	const colums: ColumnDef<TainingOrganisation>[] = [
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
			accessorKey: "providerName",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Company Name
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
			accessorKey: "providerCounty",
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
			accessorKey: "providerAddress",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Address
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
			accessorKey: "providerType",
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
			accessorKey: "employee",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Employees
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
											name: row.original.providerName,
											link: `/training-organisations-details/${row.original.id}`,
										},
									])
								)
							}>
							<img src={eye} alt="" />
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
		delete_trainer_organisation(
			(openDelete as TainingOrganisation).id as string
		);
		setOpenDelete(false);
	};

	return (
		<div className="bg-primary-foreground rounded-[6px]">
			<div className="border-b-2 pb-[25px] flex justify-between">
				<h2 className="text-base font-bold mt-[22px] pl-[23px] first-line:font-nunitoSans">
					Training Organisations
				</h2>
			</div>
			<DataTable
				columns={colums}
				data={data?.data.data || []}
				totalCount={data?.data?.metadata?.totalItems}
				pagination={{ pageIndex: page, pageSize: 10 }}
				setPage={setPage}
			/>
			<Loading isLoading={isPending || deletePanding} />
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.providerName}
			/>
		</div>
	);
};
export default TrainingManagementPage;
