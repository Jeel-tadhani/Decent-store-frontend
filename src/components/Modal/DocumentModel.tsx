import { PropsWithChildren, useState } from "react";
import Modal from "../comman/Modal";
import { InputWithLable } from "../ui/inputwithlable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import FileUpload from "../comman/FileUpload";
import Imageupload from "/assets/icons/Imageupload.svg";
import { createDocument } from "@/services/apiServices/documentServices";
import { QUERY_KEYS } from "@/lib/constants";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { Document } from "@/types/Document";
import Loading from "../comman/Loading";
import { useSelector } from "react-redux";

interface DocumentModelProps extends PropsWithChildren {
	open: boolean;
	onClose: () => void;
}

const DocumentModel = ({ open, onClose }: DocumentModelProps) => {
	const [file, setFile] = useState("");

	const { isClient, clientId } = useSelector((state: any) => state.user);

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate: create_document, isPending: createPanding } = useMutation({
		mutationFn: (document: Document) =>
			createDocument(document, isClient, clientId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.documentList] });
			closeModel();
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});
	const schema = z.object({
		title: z.string().min(1, "Title is required"),
		type: z.string().min(1, "Type is required"),
		targetAudience: z.string().min(1, "Audience is required"),
		documentUrl: z.string().min(1, "File is required"),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		create_document(data);
	};

	const closeModel = () => {
		reset();
		onClose();
		setFile("");
	};
	return (
		<Modal
			open={open}
			onClose={closeModel}
			className="z-50 items-start py-[26px] pt-5 pb-[14px] bg-white font-nunitoSans text-[16px] leading-[22px] font-normal text-[#000000] sm:min-w-[590px] rounded-[15px] p-3 sm:p-5">
			<h2 className="font-bold">Add New Document</h2>

			<form
				className="flex flex-col gap-[18px] mt-5"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
					<InputWithLable
						label="Document Title"
						type="name"
						placeholder="Enter document title"
						className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
						{...register("title")}
					/>
					{errors.title && (
						<ErrorMessage message={errors.title.message as string} />
					)}
				</div>
				<div className="sm:flex-row flex-col flex gap-x-8 gap-y-[18px]">
					<div className="flex flex-col gap-2 sm:w-1/2">
						<label className="">Document Type</label>
						<Select onValueChange={(e) => setValue("type", e)} name="type">
							<SelectTrigger className={`w-full h-[52px] rounded-[6px]`}>
								<SelectValue
									placeholder="User Manual"
									className="placeholder:text-[red]"
								/>
							</SelectTrigger>
							<SelectContent className="z-[99999]">
								<SelectItem value="User Manual">User Manual</SelectItem>
							</SelectContent>
						</Select>
						{errors.type && (
							<ErrorMessage message={errors.type.message as string} />
						)}
					</div>
					<div className="flex flex-col gap-2 sm:w-1/2">
						<label className="">Target Audience</label>

						<Select
							name="targetAudience"
							onValueChange={(e) => setValue("targetAudience", e)}>
							<SelectTrigger className="w-full h-[52px] rounded-[6px]">
								<SelectValue placeholder="Select audience" />
							</SelectTrigger>
							<SelectContent className="z-[99999]">
								<SelectItem value="SME Admin">SME Admin</SelectItem>
								<SelectItem value="Trainer Admin">Trainer Admin</SelectItem>
								<SelectItem value="Client">Client</SelectItem>
							</SelectContent>
						</Select>
						{errors.targetAudience && (
							<ErrorMessage message={errors.targetAudience.message as string} />
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label className="">Upload Document file</label>
					<FileUpload
						handleDrop={(file) => {
							setValue("documentUrl", file);
							setFile(file);
						}}
						acceptType=".pdf">
						<div className="flex flex-col items-center w-full ">
							{file ? (
								<a href={file} target="_blank" rel="noreferrer">
									{file}
								</a>
							) : (
								<>
									<img
										src={Imageupload}
										alt="upload image"
										className="mb-[10px] h-8"
									/>
									<h3 className="mb-[6.56px]">Drag and drop or Upload PDF</h3>
									<p className="text-[#A3A3A3] text-[12px] font-normal leading-4">
										(only pdf format allowed)
									</p>
								</>
							)}
						</div>
					</FileUpload>
					{errors.documentUrl && (
						<ErrorMessage message={errors.documentUrl.message as string} />
					)}
				</div>

				<div className="flex justify-end mt-[2px]">
					<Button
						type="submit"
						className="bg-[#58BA66] text-[16px] leading-[22px] font-semibold rounded-[6px] h-[52px] w-[121px]">
						SUBMIT
					</Button>
				</div>
			</form>
			<Loading isLoading={createPanding} />
		</Modal>
	);
};
export default DocumentModel;
