import { PropsWithChildren } from "react";
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
import { Textarea } from "../ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaqs } from "@/services/apiServices/faqsServices";
import { QUERY_KEYS } from "@/lib/constants";
import { useToast } from "../ui/use-toast";
import { ErrorType } from "@/types/Errors";
import Loading from "../comman/Loading";
import { useSelector } from "react-redux";
import { FAQS } from "@/types/Faqs";

interface FaqModelProps extends PropsWithChildren {
	open: boolean;
	onClose: () => void;
}

const FaqModel = ({ open, onClose }: FaqModelProps) => {
	const { toast } = useToast();

	const { isClient, clientId } = useSelector((state: any) => state.user);

	const queryClient = useQueryClient();

	const { mutate: create_faqs, isPending: createPanding } = useMutation({
		mutationFn: (data: FAQS) => createFaqs(data, isClient, clientId),
		onSuccess: () => {
			toast({
				title: "Faq's Create successfully",
			});
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.faqsList] });
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
		targetAudience: z.string().optional(),
		question: z.string().min(1, "Question is required"),
		answer: z.string().min(1, "Answer is required"),
		hyperlink: z.string().min(1, "Hyperlink is required"),
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
		create_faqs(data);
	};

	const closeModel = () => {
		onClose();
		reset();
	};

	return (
		<Modal
			open={open}
			onClose={closeModel}
			className="z-50 items-start py-[26px] pt-5 pb-[14px] bg-white font-nunitoSans text-[16px] leading-[22px] font-normal text-[#000000] sm:min-w-[590px] p-3 sm:p-5 rounded-[15px]">
			<h2 className="font-bold">Add New FAQ</h2>

			<form
				className="flex flex-col gap-[18px] mt-[19px]"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
					<label className="">Target Audience</label>
					<Select onValueChange={(val) => setValue("targetAudience", val)}>
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
				<div>
					<InputWithLable
						label="Enter Question"
						type="name"
						placeholder="Enter Question"
						className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
						{...register("question")}
					/>
					{errors.question && (
						<ErrorMessage message={errors.question.message as string} />
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label className="">
						Enter Answer{" "}
						<span className="text-[#FF5252] text-[12px] leading-4">
							(Only 1000 character allowed)
						</span>
					</label>
					<Textarea
						placeholder=" Write your answer"
						rows={6}
						className="bg-white"
						{...register("answer")}
					/>
					{errors.answer && (
						<ErrorMessage message={errors.answer.message as string} />
					)}
				</div>

				<div>
					<InputWithLable
						label="Enter Hyperlink"
						type="name"
						placeholder="Enter hyperlink"
						className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
						{...register("hyperlink")}
					/>
					{errors.hyperlink && (
						<ErrorMessage message={errors.hyperlink.message as string} />
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
export default FaqModel;
