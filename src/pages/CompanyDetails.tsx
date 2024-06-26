import { InputWithLable } from "@/components/ui/inputwithlable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Companies } from "@/types/Companies";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/Errors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@/components/comman/Loading";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import { fetchOneUserById, updateUserById } from "@/services/apiServices/userServices";



function CompanyDetails({ }) {

	const [companyStatus, setCompanyStatus] = useState("Active");


	const dispatch = useDispatch();

	const { companyId } = useParams();

	console.log("companyid", companyId);


	const { toast } = useToast();

	const queryClient = useQueryClient();
	const { data: companyDetails, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.userFetchById, companyId],
		queryFn: () => fetchOneUserById(companyId as string),
		enabled: !!companyId,
	});

	console.log(companyDetails);


	const { mutate: updateUser, isPending: updatePanding } = useMutation({
		mutationFn: (data: { updatedData: Companies, companyId: string }) => updateUserById(data.updatedData, data.companyId),
		onSuccess: () => {
			toast({ title: "User update Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userList] });
			dispatch(setPath([
				{
					name: "Company Management",
					link: null,
				},
				{
					name: "Companies",
					link: "/companies",
				}
			]))
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});


	const schema = z.object({
		user_name: z.string().min(1, "User Name is required"),
		first_name: z.string().min(1, "First Name is required"),
		last_name: z.string().min(1, "Last Name is required"),
		sector: z.string().min(1, "Sector is required"),
		county: z.string().min(1, "County is required"),
		status: z.string().min(1, "status is required"),
		email: z.string().optional(),
	})

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },

	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});


	useEffect(() => {
		if (companyId && companyDetails?.data.data) {
			const data = companyDetails?.data?.data;
			(Object.keys(data) as Array<keyof Companies>).forEach((key: any) => {
				setValue(key, data[key]);
			});
			setCompanyStatus(data.status);
		}
	}, [companyDetails]);

	const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
		console.log(data);
		const updatedData: any = {
			...data,
			status: companyStatus,
		};
		updateUser({ updatedData, companyId: companyId as string });

	};

	return (

		<div className=" h-[auto] rounded-[10px] bg-[#F2F6F9] mx-[auto] mt-[20px] font-nunitoSans text-[16px]">
			<Tabs defaultValue="account" className="">
				<div className="border-b-2 border-solid gray">
					<TabsList className="bg-[white] h-[80px] font-[Nunito Sans] font-[700] ">
						<TabsTrigger
							className="bg-[white] data-[state=active]:border-b-2 border-[#00778B] border-solid w-[150px] h-[80px] data-[state=active]:text-[#00778B]"
							value="account">
							User Details
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="account">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className=" h-auto w- bg-[white] rounded-[10px] p-[30px]">
							<div className=" grid md:grid-cols-2 gap-x-8 gap-y-4">
								<div className="">
									<InputWithLable
										label="User Name"
										type="name"
										placeholder="10"
										className="h-[52px] mt-[10px] w-[full]"
										{...register("user_name")}
									/>
									{errors.user_name && (
										<ErrorMessage message={errors.user_name.message as string} />
									)}
								</div>
								<div className="">

									<InputWithLable
										label="First Name"
										type="Address"
										placeholder="Jeck"
										className="w-[full] h-[52px] mt-[10px]"
										{...register("first_name")}
									/>
									{errors.first_name && (
										<ErrorMessage message={errors.first_name.message as string} />
									)}
								</div>
								<div className="">
									<InputWithLable
										label="Last Name"
										type="name"
										placeholder="10"
										className="w-[full] h-[52px] mt-[10px]"
										{...register("last_name")}
									/>
									{errors.last_name && (
										<ErrorMessage message={errors.last_name.message as string} />
									)}
								</div>
								<div className="">
									<InputWithLable
										label="Sector"
										type="name"
										placeholder="10"
										className="w-[full] h-[52px] mt-[10px]"
										{...register("sector")}
									/>
									{errors.sector && (
										<ErrorMessage message={errors.sector.message as string} />
									)}
								</div>
								<div className="">
									<InputWithLable
										label="Email Address"
										type="email"
										disabled={true}
										placeholder="10"
										className="w-[full] h-[52px] mt-[10px]"
										{...register("email")}
									/>
									{/* {errors.email && (
													<ErrorMessage message={errors.email.message as string} />
												)} */}
								</div>
								<div className="">
									<InputWithLable
										label="County"
										type="name"
										placeholder="10"
										className="w-[full] h-[52px] mt-[10px]"
										{...register("county")}
									/>
									{errors.county && (
										<ErrorMessage message={errors.county.message as string} />
									)}
								</div>
								<div className="w-[533px] h-[52px]">

									<RadioGroup
										// defaultValue={companyStatus}
										onValueChange={(value) => setCompanyStatus(value)}
										value={companyStatus}
										className="flex items-center gap-[34px]">
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="Active"
												id="r1"
												className={`${companyStatus !== "Active" && "border-[#A3A3A3]"
													}`}
											/>
											<Label
												htmlFor="r1"
												className={`text-[16px] font-normal ${companyStatus !== "Active" && "text-[#A3A3A3]"
													}`}>
												Active
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="Inactive"
												id="r2"
												className={`${companyStatus !== "Inactive" && "border-[#A3A3A3]"
													}`}
											/>
											<Label
												htmlFor="r2"
												className={`text-[16px] font-normal ${companyStatus !== "Inactive" && "text-[#A3A3A3]"
													}`}>
												Inactive
											</Label>
										</div>
									</RadioGroup>


									{
										errors.status && (
											<ErrorMessage message={errors.status.message as string} />
										)
									}
								</div>
								<div className="flex justify-end">
									<button type="submit" className="w-[150px] h-[60px] bg-[#00778B] text-white rounded-[10px]" >
										Edit User
									</button>
								</div>

							</div>

						</div>
					</form>
				</TabsContent>
			</Tabs>

			<Loading
				isLoading={isLoading || updatePanding}
			/>
		</div>



	);
}

export default CompanyDetails;
