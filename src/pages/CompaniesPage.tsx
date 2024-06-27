import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { Companies } from "@/types/Companies";
import { ColumnDef } from "@tanstack/react-table";
import eye from "/assets/icons/eye.svg";
import pencil from "/assets/icons/pencil.svg";
import delet from "/assets/icons/delet.svg";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessModel from "@/components/Modal/SuccessModel";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import Loading from "@/components/comman/Loading";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/Errors";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import moment from "moment";
import { deleteUser, fetchUsers } from "@/services/apiServices/userServices";

const CompaniesPage = () => {
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openDelete, setOpenDelete] = useState<any>(false);
	// const [companyId, setCompanyId] = useState<string>("");
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.userList, page],
		queryFn: () => fetchUsers(page.toString(), "10"),
	});

	const { mutate: deletecompany, isPending: deletePanding } = useMutation({
		mutationFn: (companyId: string) => deleteUser(companyId),
		onSuccess: () => {
			toast({ title: "User delete Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userList] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		name: z.string().min(1, "Name is required"),
		address: z.string().min(1, "Address is required"),
		county: z.string().min(1, "County is required"),
		averageNumberOfEmployees: z.string().min(1, "Employees is required"),
		sector: z.string().min(1, "Sector is required"),
		parentCompanyAddress: z
			.string()
			.min(1, "Parent Company Address is required"),
		parentCompanyName: z.string().min(1, "Parent Company Name is required"),
		parentCompanyCounty: z.string().min(1, "Parent Company County is required"),
		status: z.string().min(1, "status is required"),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const { setValue } = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

	const colums: ColumnDef<any>[] = [
		{
			accessorKey: "user_id",
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
			accessorKey: "user_name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						User Name
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
			accessorKey: "first_name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						First name
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
			accessorKey: "last_name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Last name
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
			accessorKey: "role",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Role
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
			accessorKey: "createdAt",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Registered Date
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
				return moment(row.original.createdAt).format("DD-MM-YYYY");
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
						className={`${row.original.status === "Active"
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
					<div className="flex items-center gap-[12px] ">
						<Button
							variant={"ghost"}
							className="p-0"
							onClick={() => handleShowForm(row.original)}>
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
											name: row.original.user_name,
											link: `/user-details/${row.original?.user_id}`,
										},
									])
								)
							}
							variant={"ghost"}
							className="p-0">
							<img src={pencil} alt="" />
						</Button>

						<Button
							variant={"ghost"}
							className="p-0"
							onClick={() => {
								setOpenDelete(row.original);
							}}>
							<img src={delet} alt="" />
						</Button>
					</div>
				);
			},
		},
	];

	const handleDelete = () => {
		deletecompany(openDelete.user_id);
		setOpenDelete(false);
	};

	const handleShowForm = (data: any | undefined) => {
		(Object.keys(data) as Array<keyof Companies>).forEach((key: any) => {
			setValue(key, data[key]);
		});

		dispatch(
			setPath([
				{ name: "User Management", link: null },
				,
				{
					name: "Users",
					link: "/users",
				},
				{
					name: data.user_name,
					link: `/user-details/${data.user_id}`,
				},
			])
		);
	};

	return (
		<div className=" bg-primary-foreground rounded-[10px] font-nunitoSans">
			<div className="border-b-2 pb-[25px]">
				<h2 className="text-base font-bold pt-[22px] pl-[23px]">Users</h2>
			</div>
			<div>
				<DataTable
					columns={colums}
					data={data?.data?.data?.data || []}
					totalCount={data?.data?.data?.metadata?.totalItems}
					pagination={{ pageIndex: page, pageSize: 10 }}
					setPage={setPage}
				/>
			</div>
			<SuccessModel
				open={openSuccess}
				onClose={() => setOpenSuccess(false)}
				title="Company has been Update successfully"
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

export default CompaniesPage;
