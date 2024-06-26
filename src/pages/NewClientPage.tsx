import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Loading";
import { Button } from "@/components/ui/button";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { setNewClientCreate } from "@/redux/Reducer/ClientReducer";
import { setPath } from "@/redux/Reducer/PathReducer";
import {
	createClient,
	fetchClientById,
	updateClient,
} from "@/services/apiServices/clientServices";
import { Client } from "@/types/Client";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { z } from "zod";

const NewClientPage = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const clientId = queryParams.get("clientId");
	const [clientStatus, setClientStatus] = useState("");

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();
	const { data: clientDetails } = useQuery({
		queryKey: [QUERY_KEYS.clientList, clientId],
		queryFn: () => fetchClientById(clientId as string),
		enabled: !!clientId,
	});

	const { mutate: create_client, isPending: createPanding } = useMutation({
		mutationFn: createClient,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientList] });
			dispatch(setPath([{ name: "Client Management", link: "/clients" }]));
			dispatch(setNewClientCreate());
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});
	const { mutate: update_client, isPending: updatePanding } = useMutation({
		mutationFn: (data: Client) => updateClient(data, clientId as string),
		onSuccess: () => {
			toast({ title: "Client update Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientList] });
			dispatch(setPath([{ name: "Client Management ", link: "/clients" }]));
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
		sector: z.string().min(1, "Sector is required"),
		region: z.string().min(1, "Region is required"),
		promoter: z.string().min(1, "Promoter is required"),
		email: z
			.string()
			.min(1, "Email is required")
			.email("Please enter a valid email"),
		number: z
			.string()
			.min(1, "Number is required")
			.min(10, "Number is too short")
			.max(10, "Number is too long"),
		address: z.string().min(1, "Address is required"),
		type: z.string().min(1, "Type is required"),
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
		if (clientId && clientDetails?.data.data) {
			const data = clientDetails?.data?.data;
			(Object.keys(data) as Array<keyof Client>).forEach((key: any) => {
				setValue(key, data[key]);
			});
			console.log(data.status, "data.status");
			setClientStatus(data.status);
		}
	}, [clientDetails]);
	console.log(clientStatus, "clinetStatus");

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		if (clientId) {
			update_client({ ...data, status: clientStatus });
		} else {
			create_client({ ...data, status: clientStatus });
		}
	};
	return (
		<div className="bg-white h-full rounded-[6px]">
			<div className="font-nunitoSans text-[16px] leading-[22px] text-black">
				<div className="flex justify-between items-center px-5 text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
					<h2 className="font-bold">
						{clientId ? "Update Client" : "Add New Client"}
					</h2>
					<Button
						className="bg-transparent text-black font-semibold text-[16px]"
						onClick={() =>
							dispatch(
								setPath([
									{
										name: "Client Management",
										link: "/clients",
									},
								])
							)
						}>
						<IoIosArrowRoundBack size={26} className="mr-4" />
						Back
					</Button>
				</div>

				<form
					className="px-5 py-[17px] grid md:grid-cols-2 gap-x-9 gap-y-7"
					onSubmit={handleSubmit(onSubmit)}>
					<div>
						<InputWithLable
							label="Client Contact"
							type="name"
							placeholder="Jane Doe"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("name")}
						/>
						{errors.name && (
							<ErrorMessage message={errors.name.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Sector"
							type="name"
							placeholder="Multi Sector"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("sector")}
						/>
						{errors.sector && (
							<ErrorMessage message={errors.sector.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Region"
							type="name"
							placeholder="South East"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("region")}
						/>
						{errors.region && (
							<ErrorMessage message={errors.region.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Promoter"
							type="name"
							placeholder="County Wexford Chamber of Commerce"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("promoter")}
						/>
						{errors.promoter && (
							<ErrorMessage message={errors.promoter.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Email ID"
							type="name"
							placeholder="email@example.com"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("email")}
						/>
						{errors.email && (
							<ErrorMessage message={errors.email.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Phone Number"
							type="number"
							placeholder="XXXX XXXX XX"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							{...register("number")}
						/>
						{errors.number && (
							<ErrorMessage message={errors.number.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Address"
							type="name"
							placeholder="--"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("address")}
						/>
						{errors.address && (
							<ErrorMessage message={errors.address.message as string} />
						)}
					</div>
					<div>
						<InputWithLable
							label="Type"
							type="name"
							placeholder="Skillnet gov bodies"
							className="text-[16px] h-[52px] bg-white px-5 py-[15px]"
							{...register("type")}
						/>
						{errors.type && (
							<ErrorMessage message={errors.type.message as string} />
						)}
					</div>

					<div className="">
						<div className="flex flex-row items-center">
							<RadioGroup
								onValueChange={(value) => setClientStatus(value)}
								value={clientStatus}
								className="flex items-center gap-[34px]">
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Active"
										id="r1"
										className={`${
											clientStatus !== "Active" && "border-[#A3A3A3]"
										}`}
									/>
									<Label
										htmlFor="r1"
										className={`text-[16px] font-normal ${
											clientStatus !== "Active" && "text-[#A3A3A3]"
										}`}>
										Active
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Inactive"
										id="r2"
										className={`${
											clientStatus !== "Inactive" && "border-[#A3A3A3]"
										}`}
									/>
									<Label
										htmlFor="r2"
										className={`text-[16px] font-normal ${
											clientStatus !== "Inactive" && "text-[#A3A3A3]"
										}`}>
										Inactive
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
					<div className="flex flex-row-reverse gap-4">
						<Button
							className="px-[30px] py-[15px] text-[16px] font-semibold bg-[#FF5252] text-white rounded-[6px]"
							onClick={(e) => {
								e.preventDefault();
								dispatch(
									setPath([
										{
											name: "Client Management",
											link: "/clients",
										},
									])
								);
							}}>
							CANCLE
						</Button>
						<Button
							type="submit"
							className="px-[30px] py-[15px] text-[16px] font-semibold  bg-[#58BA66] text-white rounded-[6px]">
							{clientId ? "UPDATE" : "SUBMIT"}
						</Button>
					</div>
				</form>
			</div>
			<Loading isLoading={createPanding || updatePanding} />
		</div>
	);
};

export default NewClientPage;
