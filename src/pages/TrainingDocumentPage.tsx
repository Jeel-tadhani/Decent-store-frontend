import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import delet from "/assets/icons/delet.svg";
import DocumentModel from "@/components/Modal/DocumentModel";
import { Document } from "@/types/Document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteDocument,
	fetchDocument,
} from "@/services/apiServices/documentServices";
import { QUERY_KEYS } from "@/lib/constants";
import Loading from "@/components/comman/Loading";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/Errors";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import { useSelector } from "react-redux";

const TrainingDocumentPage = () => {
	const [openSuccess, setOpenSuccess] = useState(false);
	const [page, setPage] = useState(1);
	const [openDelete, setOpenDelete] = useState<boolean | Document>(false);

	const { isClient, clientId } = useSelector((state: any) => state.user);

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const {
		data: documentList,
		isPending,
		refetch,
	} = useQuery({
		queryKey: [QUERY_KEYS.documentList, page],
		queryFn: () => fetchDocument(page.toString(), "10", isClient, clientId),
	});
	const { mutate: deletedocument, isPending: deletePanding } = useMutation({
		mutationFn: (id: string) => deleteDocument(id),
		onSuccess: () => {
			toast({ title: "Document delete Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.documentList] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const handleDelete = () => {
		deletedocument((openDelete as Document).id as string);
		setOpenDelete(false);
	};

	const colums: ColumnDef<Document>[] = [
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
			accessorKey: "title",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Document Title
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
				return <span className="text-primary">{row.original.title}</span>;
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
			accessorKey: "targetAudience",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Target Audience
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
			accessorKey: "documentUrl",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Uploaded File
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
					<a
						href={row.original?.documentUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer">
						{row.original?.documentUrl?.split("/").pop()}
					</a>
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
							onClick={() => {
								setOpenDelete(row.original);
							}}
							disabled={isClient && !documentList?.data.clientData}>
							<img src={delet} alt="delete" width={14} height={16.15} />
						</Button>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		refetch();
	}, [clientId]);

	return (
		<div className="bg-white h-full rounded-[6px]">
			<div className="flex justify-between items-center px-5 font-nunitoSans text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
				<h2 className="font-bold">Training Document</h2>
				<Button
					className="font-semibold text-base py-[10px] px-[20px] leading-[22px]"
					onClick={() => setOpenSuccess(true)}>
					ADD NEW
				</Button>
			</div>
			<div>
				<DataTable
					columns={colums}
					data={documentList?.data?.data || []}
					totalCount={documentList?.data?.metadata?.totalItems}
					pagination={{ pageIndex: page, pageSize: 10 }}
					setPage={setPage}
				/>
			</div>
			<DocumentModel open={openSuccess} onClose={() => setOpenSuccess(false)} />
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.title}
			/>
			<Loading isLoading={isPending || deletePanding} />
		</div>
	);
};

export default TrainingDocumentPage;
