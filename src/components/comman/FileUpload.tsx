import { uploadFile } from "@/services/apiServices/uploadServices";
import { ErrorType } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, DragEvent } from "react";
import { useToast } from "../ui/use-toast";

interface FileUploadProps {
	handleDrop: (file: string) => void;
	children: React.ReactNode;
	className?: string;
	acceptType?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
	handleDrop,
	children,
	className,
	acceptType,
}) => {
	const { toast } = useToast();
	const { mutate: upload_file, isPending: FileUploadPending } = useMutation({
		mutationFn: (file: any) => uploadFile(file),
		onSuccess: (data) => {
			handleDrop(data.data.file);
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const [dragging, setDragging] = React.useState(false);

	const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setDragging(true);
	};

	const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
		setDragging(false);
		event.preventDefault();
	};

	const handleDropEvent = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setDragging(false);
		const file = event.dataTransfer.files[0];
		if (file) {
			upload_file(file);
		}
	};

	const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const file = event.target.files && event.target.files[0];
		if (file) {
			upload_file(file);
		}
	};

	return (
		<label
			className={`flex flex-col rounded-lg border-[1px] border-dashed border-[#D9D9D9] p-10 group text-center ${className} ${dragging ? "border-blue-500" : ""
				}`}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDropEvent}>
			{!FileUploadPending ? (
				<>
					{children}
					<input
						type="file"
						className="hidden"
						accept={acceptType}
						onChange={(e) => handleFileSelect(e)}
					/>
				</>
			) : (
				<h1>loading....</h1>
			)}
		</label>
	);
};

export default FileUpload;
