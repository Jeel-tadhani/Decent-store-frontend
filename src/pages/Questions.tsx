import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { Companies } from "@/types/Companies";
import { ColumnDef } from "@tanstack/react-table";
import eye from "/assets/icons/eye.svg";
// import search from "/assets/icons/search.svg";
import pencil from "/assets/icons/pencil.svg";
import delet from "/assets/icons/delet.svg";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { deleteQuestion, fetchQuestion } from "@/services/apiServices/questionServices";
import { ErrorType } from "@/types/Errors";
import SuccessModel from "@/components/Modal/SuccessModel";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import Loading from "@/components/comman/Loading";
import { Question } from "@/types/Questions";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";

function Questions() {
	const [active, setActive] = useState("Table");
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openDelete, setOpenDelete] = useState<boolean | Question>(false);
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.questionList, page],
		queryFn: () => fetchQuestion(page.toString(), "10"),

	});

	console.log(data);


	const { mutate: deletequestion, isPending: deletePanding } = useMutation({
		mutationFn: (QuestionId: string) => deleteQuestion(QuestionId),
		onSuccess: () => {
			toast({ title: "Question delete Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.questionList] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const colums: ColumnDef<Companies>[] = [
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
						Questions
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
			accessorKey: "maxPoint",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Points
						<div className="flex flex-col ">
							<TriangleUpIcon
								className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
								viewBox="0,0,15,5"
							/>
							<TriangleDownIcon
								className="ml-1 h-[14px] w-[14px] text-[#A3A3A3] "
								viewBox="0,5,15,15"
							/>
						</div>
					</Button>
				);
			},
		},
		{
			accessorKey: "pillar.pillarName",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Category/Pillar
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
			cell: ({ row }: { row: any }) => {
				return (
					<div className="flex items-center gap-[12px] ">
						<Button variant={"ghost"} className="p-0"
							onClick={() =>
								dispatch(
									setPath([
										{ name: "Maturity Assessment", link: null },
										{
											name: "Questions",
											link: `/add-question?QuestionId=${row.original.id}&active=${active}`,
										},
									]),
									setActive("view")
								)
							}
						>

							<img src={eye} alt="" />
						</Button>

						<Button variant={"ghost"} className="p-0"
							onClick={() =>
								dispatch(
									setPath([
										{ name: "Maturity Assessment", link: null },
										{
											name: "Questions",
											link: `/add-question?QuestionId=${row.original.id}`,
										},
									])
								)
							}>

							<img src={pencil} alt="" />
						</Button>

						<Button variant={"ghost"} className="p-0"
							onClick={() => {
								setOpenDelete(row.original);
							}}
						>
							<img src={delet} alt="" />
						</Button>
					</div>
				);
			},
		},
	];

	const handleDelete = () => {
		deletequestion((openDelete as Question).id as string);
		setOpenDelete(false);
	};


	return (
		<div className="bg-primary-foreground rounded-[6px]">
			{
				active === "Table" && (
					<>
						<div className="border-b-2 h-[71px] flex items-center justify-between">
							<h2 className="text-base font-bold  pl-[23px] font-nunitoSans">
								Questions
							</h2>
							<Button
								onClick={() =>
									dispatch(
										setPath([
											{ name: "Maturity Assessment", link: null },
											{
												name: "Questions",
												link: "questions",
											},
											,
											{
												name: "Add Question",
												link: "add-question",
											},
										])
									)
								}
								className="w-[162px] h-[42px] mr-[15px]">
								Add Question
							</Button>
						</div>
						<div>

							<DataTable columns={colums}
								data={data?.data?.data || []}
								totalCount={data?.data?.metadata?.totalItems}
								pagination={{ pageIndex: page, pageSize: 10 }}
								setPage={setPage}
							/>
						</div>
					</>
				)
			}

			<SuccessModel
				open={openSuccess}
				onClose={() => setOpenSuccess(false)}
				title="Client has been added successfully"
			/>
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.name}
			/>
			<Loading
				isLoading={isPending || deletePanding}
			/>


		</div >
	);
}

export default Questions;
