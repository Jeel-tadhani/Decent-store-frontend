import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Loading";
import { Button } from "@/components/ui/button";
import { InputWithLable } from "@/components/ui/inputwithlable";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/Reducer/PathReducer";
import { fetchPillar } from "@/services/apiServices/pillar";
import { createQuestion, fetchOneQuestion, fetchQuestion, updateQuestion } from "@/services/apiServices/questionServices";
import { ErrorType } from "@/types/Errors";
import { Question } from "@/types/Questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function AddQuestion() {
	const queryParams = new URLSearchParams(window.location.search);
	const QuestionId = queryParams.get("QuestionId");
	const active = queryParams.get('active');

	console.log(active);
	
	const { isClient, clientId } = useSelector((state: any) => state.user);
	const [selectedPillarValue, setSelectedPillarValue] = useState("");


	const navigate = useNavigate();
	const [openSuccess, setOpenSuccess] = useState(false);
	const dispatch = useDispatch();


	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data: questionDetails } = useQuery({
		queryKey: [QUERY_KEYS.oneQuestion, QuestionId],
		queryFn: () => fetchOneQuestion(QuestionId as string),
		enabled: !!QuestionId,
	});

	console.log(questionDetails);
	

	const {
		data: pillarList,
		isPending,
		refetch,
	} = useQuery({
		queryKey: [QUERY_KEYS.bannerList],
		queryFn: () => fetchPillar(isClient, clientId),
	});

	// console.log(pillarList);





	const { mutate: createquestion, isPending: createPanding } = useMutation({
		mutationFn: createQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.questionList] });
			dispatch(
				setPath([
					{ name: "Maturity Assessment", link: null },
					{
						name: "Questions",
						link: `/questions`,
					},
				])
			)
			setOpenSuccess(true);
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});


	const { mutate: updatequestion, isPending: updatePanding } = useMutation({
		mutationFn: (data: Question) => updateQuestion(data, QuestionId as string),
		onSuccess: () => {
			toast({ title: "Question update Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.questionList] });
			dispatch(
				setPath([
					{ name: "Maturity Assessment", link: null },
					{
						name: "Questions",
						link: `/questions`,
					},
				])
			)
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		pillar: z.string().min(1, "Pillar is required"),
		title: z.string().min(1, "Question is required"),
		maxPoint: z.string().min(1, "Question Point must be a number greater than 0"),
		options: z.array(z.object({
			name: z.string().min(1, "Option Name is required"),
			point: z.string().min(1, "Option Point must be a number greater than 0"),
		})),
	});


	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});



	useEffect(() => {
		if (QuestionId && questionDetails?.data.data) {
			const data = questionDetails?.data?.data;
			(Object.keys(data) as Array<keyof Question>).forEach((key: any) => {
				if (key === "pillar") {
					setValue(key, data[key]?.id.toString());
				} else {
					setValue(key, data[key]);
				}
			});
			setSelectedPillarValue(data.pillar?.id.toString());
		}
	}, [questionDetails]);


	useEffect(() => {
		refetch();
	}, [clientId]);



	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		console.log(data);

		const totalOptionPoints = data.options.reduce((total, option) => total + parseInt(option.point), 0);

		if (totalOptionPoints > parseInt(data.maxPoint)) {
			toast({
				variant: "destructive",
				title: "Total option points cannot exceed maximum point value",
			});
			return;
		}

		const options = data.options.map((option, index) => ({
			...option,
			optionId: (index + 1).toString(),
		}));

		if (QuestionId) {
			updatequestion({ ...data, options: options, pillarid: data.pillar });
		} else {
			createquestion({ ...data, options: options, pillarid: data.pillar }); 
		}


	};

	return (

		<div className="max-w-[1500px] h-[850px] rounded-[10px] bg-[white] font-nunitoSans">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="font-[700] text-[16px]">Add Question</h2>
				<button
					onClick={() => navigate(-1)}
					className="text-[16px] font-[600] flex items-center gap-[15px] ">
					<HiOutlineArrowNarrowLeft />
					Back
				</button>
			</div>
			<div className="m-[22px]">
				<form onSubmit={handleSubmit(onSubmit)}>

					<Select onValueChange={(e) => {
						setValue("pillar", e);
						setSelectedPillarValue(e);
					}}
						{...register("pillar")}
						value={selectedPillarValue}
						disabled={active === "Table"} 
						>

						<SelectGroup>
							<SelectLabel className="text-[16px] font-[400]">
								Select Category / Pillar
							</SelectLabel>

							<SelectTrigger className="max-w-[547px] h-[52px]">
								<SelectValue placeholder="Select Pillar" />
							</SelectTrigger>
						</SelectGroup>
						<SelectContent>
							{
								pillarList?.data.data.map((pillar: any) => {
									return (
										<SelectItem value={String(pillar.id)}>{pillar.pillarName}</SelectItem>
									)
								})
							}
						</SelectContent>
					</Select>


					<div className="flex gap-[20px]">
						<div className="w-full">
							<InputWithLable
								label="Enter Question"
								placeholder="How aware is your organisation of the concept and importance of achieving Net Zero emissions by 2050."
								className="bg-[white]  h-[52px]"
								{...register("title")}
								disabled={active === "Table"} 
							/>
							<div className="flex justify-between">
								{errors.title && (
									<ErrorMessage message={errors.title.message as string} />
								)}
								{errors.maxPoint && (
									<ErrorMessage message={errors.maxPoint.message as string} />
								)}
							</div>

						</div>
						<InputWithLable
							placeholder="3"
							label="Point"
							disabled={active === "Table"} 
							className="bg-[white] w-[62px] h-[52px] text-center"
							{...register("maxPoint")}
						/>

					</div>

					{[0, 1, 2].map((index) => (
						<div key={index}>
							<div className="flex gap-[20px] justify-center sm:mt-[28px] mt-[12px]">
								<h2 className="w-[80px] mt-[15px] sm:block hidden">{`Option ${index + 1}`}</h2>
								<div className="w-full">
									<InputWithLable
										placeholder={`Option ${index + 1}`}
										className="bg-[white] h-[52px]"
										disabled={active === "Table"} 
										{...register(`options.${index}.name`)} 
									/>
									<div className="flex justify-between">
										{errors?.options?.[index]?.name && <ErrorMessage message={errors.options[index].name.message as string} />}
										{errors?.options?.[index]?.point && <ErrorMessage message={errors.options[index].point.message as string} />}
									</div>
									<InputWithLable
										placeholder="Measures"
										className="bg-[white] h-[52px] mt-[18px]"
										disabled={active === "Table"} 
										{...register(`options.${index}.name`)} 
									/>

								</div>
								<InputWithLable
									placeholder="1"
									className="bg-[white] w-[62px] h-[52px] text-center"
									disabled={active === "Table"}  
									{...register(`options.${index}.point`)}
								/>
							</div>
						</div>
					))}

					{
						active === "Table" ? (null) : (
							<div className="flex justify-end  mt-[25px] gap-[20px]">
								<Button className="bg-[#FF5252] text-[16px] w-[100px] h-[50px]">
									CENCEL
								</Button>
								<Button type="submit" className="bg-[#58BA66] text-[16px] w-[100px] h-[50px]">
									{QuestionId ? "UPDATE" : "SUBMIT"}
								</Button>
							</div>
						)
					}		

					
				</form>
			</div>

			<Loading
				isLoading={isPending || createPanding || updatePanding}
			/>

		</div>
	);
}

export default AddQuestion;
