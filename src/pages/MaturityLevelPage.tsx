import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
	createMaturityLevel,
	fetchMaturityLevel,
	updateMaturityLevel,
} from "@/services/apiServices/maturityLevelServices";
import { MaturityLevel } from "@/types";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormErrors {
	IntroductoryColor?: string;
	rangeStartIntro?: string;
	rangeEndIntro?: string;
	IntermediateColor?: string;
	rangeStartInter?: string;
	rangeEndInter?: string;
	advanceColor?: string;
	rangeStartAdv?: string;
	rangeEndAdv?: string;
}

const MaturityLevelPage = () => {
	const initalvalue = {
		IntroductoryColor: "#FF5252",
		rangeStartIntro: "0",
		rangeEndIntro: "",
		IntermediateColor: "#FFD56A",
		rangeStartInter: "",
		rangeEndInter: "",
		advanceColor: "#D6F5AC",
		rangeStartAdv: "",
		rangeEndAdv: "",
	};
	const [formData, setFormData] = useState(initalvalue);
	const [update, setUpdate] = useState<MaturityLevel[] | boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const { isClient, clientId, role } = useSelector((state: any) => state.user);

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const {
		data: maturity_level,
		isPending,
		refetch,
	} = useQuery({
		queryKey: [QUERY_KEYS.maturityLevel],
		queryFn: () => fetchMaturityLevel(isClient, clientId),
	});
	const { mutate: create_maturity_level, isPending: createPanding } =
		useMutation({
			mutationFn: (data: MaturityLevel[]) =>
				createMaturityLevel(data, isClient, clientId),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.maturityLevel] });
				toast({ title: "Maturity level created successfully" });
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});
	const { mutate: update_maturity_level, isPending: updatePanding } =
		useMutation({
			mutationFn: updateMaturityLevel,
			onSuccess: () => {
				toast({ title: "Maturity level updated successfully" });
				queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.maturityLevel] });
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});

	useEffect(() => {
		if (maturity_level?.data.data.length) {
			setFormData({
				IntroductoryColor: maturity_level?.data.data[0].color,
				rangeStartIntro: maturity_level?.data.data[0].rangeStart,
				rangeEndIntro: maturity_level?.data.data[0].rangeEnd,
				IntermediateColor: maturity_level?.data.data[1].color,
				rangeStartInter: maturity_level?.data.data[1].rangeStart,
				rangeEndInter: maturity_level?.data.data[1].rangeEnd,
				advanceColor: maturity_level?.data.data[2].color,
				rangeStartAdv: maturity_level?.data.data[2].rangeStart,
				rangeEndAdv: maturity_level?.data.data[2].rangeEnd,
			});
			setUpdate(maturity_level?.data.data);
		}
	}, [maturity_level]);

	useEffect(() => {
		refetch();
	}, [clientId]);

	const onSubmit = async (data: any) => {
		const newErrors: any = {};

		if (!formData.rangeStartIntro) {
			newErrors.rangeStartIntro = "Introductory range start is required";
		}
		if (!formData.rangeEndIntro) {
			newErrors.rangeEndIntro = "Introductory range end is required";
		}
		if (!formData.rangeStartInter) {
			newErrors.rangeStartInter = "Intermediate range start is required";
		}
		if (!formData.rangeEndInter) {
			newErrors.rangeEndInter = "Intermediate range end is required";
		}
		if (!formData.rangeStartAdv) {
			newErrors.rangeStartAdv = "Advance range start is required";
		}
		if (!formData.rangeEndAdv) {
			newErrors.rangeEndAdv = "Advance range end is required";
		}
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			return;
		}
		if (
			(update && !isClient) ||
			(update && isClient && maturity_level?.data.clientData)
		) {
			const maturityLevel = (update as MaturityLevel[])?.map(
				(maturityLevel: MaturityLevel) => {
					return {
						id: maturityLevel.id,
						maturityLevelName: maturityLevel.maturityLevelName,
						color:
							maturityLevel.maturityLevelName === "Introductory"
								? data.IntroductoryColor
								: maturityLevel.maturityLevelName === "Intermediate"
								? data.IntermediateColor
								: data.advanceColor,
						rangeStart:
							maturityLevel.maturityLevelName === "Introductory"
								? data.rangeStartIntro
								: maturityLevel.maturityLevelName === "Intermediate"
								? data.rangeStartInter
								: data.rangeStartAdv,
						rangeEnd:
							maturityLevel.maturityLevelName === "Introductory"
								? data.rangeEndIntro
								: maturityLevel.maturityLevelName === "Intermediate"
								? data.rangeEndInter
								: data.rangeEndAdv,
					};
				}
			);
			update_maturity_level({ data: maturityLevel });
		} else {
			create_maturity_level({
				data: [
					{
						maturityLevelName: "Introductory",
						color: data.IntroductoryColor,
						rangeStart: data.rangeStartIntro,
						rangeEnd: data.rangeEndIntro,
					},
					{
						maturityLevelName: "Intermediate",
						color: data.IntermediateColor,
						rangeStart: data.rangeStartInter,
						rangeEnd: data.rangeEndInter,
					},
					{
						maturityLevelName: "Advance",
						color: data.advanceColor,
						rangeStart: data.rangeStartAdv,
						rangeEnd: data.rangeEndAdv,
					},
				],
			} as any);
		}
	};

	const handleFormValue = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let newErrors: any = { ...errors };

		delete newErrors[name];

		switch (name) {
			case "rangeStartIntro":
				if (!value) {
					newErrors[name] = "Introductory range start is required";
				}
				break;
			case "rangeEndIntro":
				if (!value) {
					newErrors[name] = "Introductory range end is required";
				}
				break;
			case "rangeStartInter":
				if (!value) {
					newErrors[name] = "Intermediate range start is required";
				}
				break;
			case "rangeEndInter":
				if (!value) {
					newErrors[name] = "Intermediate range end is required";
				}
				break;
			case "rangeStartAdv":
				if (!value) {
					newErrors[name] = "Advance range start is required";
				}
				break;
			case "rangeEndAdv":
				if (!value) {
					newErrors[name] = "Advance range end is required";
				}
				break;
			default:
				break;
		}

		let data = {};
		if (name === "rangeEndIntro") {
			data = {
				rangeStartInter: Number(value) + 0.1,
			};
		} else if (name === "rangeEndInter") {
			data = {
				rangeStartAdv: Number(value) + 0.1,
			};
		}

		setFormData({ ...formData, [name]: value, ...data });
		setErrors(newErrors);
	};

	const handleClear = () => {
		if (update) {
			setFormData({
				IntroductoryColor: maturity_level?.data.data[0].color,
				rangeStartIntro: maturity_level?.data.data[0].rangeStart,
				rangeEndIntro: maturity_level?.data.data[0].rangeEnd,
				IntermediateColor: maturity_level?.data.data[1].color,
				rangeStartInter: maturity_level?.data.data[1].rangeStart,
				rangeEndInter: maturity_level?.data.data[1].rangeEnd,
				advanceColor: maturity_level?.data.data[2].color,
				rangeStartAdv: maturity_level?.data.data[2].rangeStart,
				rangeEndAdv: maturity_level?.data.data[2].rangeEnd,
			});
		} else {
			setFormData(initalvalue);
		}
	};

	return (
		<div className="bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
			<div className="border-b-2 pb-[22px]">
				<h2 className="text-base font-bold pt-[22px] pl-[23px]">
					Add Maturity
				</h2>
			</div>
			<div className="flex flex-col gap-[28px] px-[19px] ">
				<div className="mt-[27px] flex items-center gap-[19px]">
					<div>
						<p className="text-[16px]">Introductory</p>
					</div>
					<div className="flex items-center gap-[25px]">
						<div className="h-[52px] w-[100px] rounded-[6px] overflow-hidden">
							<Input
								type="color"
								className="p-0 border-none h-[100%] w-[100%] scale-[1.3]"
								name="IntroductoryColor"
								value={formData.IntroductoryColor}
								onChange={handleFormValue}
							/>
						</div>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeStartIntro"
							value={formData.rangeStartIntro}
							onChange={handleFormValue}
						/>
						{errors.rangeStartIntro && (
							<ErrorMessage message={errors.rangeStartIntro} />
						)}
						<p>To</p>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeEndIntro"
							value={formData.rangeEndIntro}
							onChange={handleFormValue}
						/>
						{errors.rangeEndIntro && (
							<ErrorMessage message={errors.rangeEndIntro} />
						)}
					</div>
				</div>
				<div className="mt-[27px] flex items-center gap-[19px]">
					<div>
						<p className="text-[16px]">Intermediate</p>
					</div>
					<div className="flex items-center gap-[25px]">
						<div className="rounded-[6px] h-[52px] w-[100px] overflow-hidden">
							<Input
								type="color"
								className="p-0 border-none h-[100%] w-[100%] scale-[1.3]"
								name="IntermediateColor"
								value={formData.IntermediateColor}
								onChange={handleFormValue}
							/>
						</div>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeStartInter"
							value={formData.rangeStartInter}
							onChange={handleFormValue}
						/>
						{errors.rangeStartInter && (
							<ErrorMessage message={errors.rangeStartInter} />
						)}
						<p>To</p>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeEndInter"
							value={formData.rangeEndInter}
							onChange={handleFormValue}
						/>
						{errors.rangeEndInter && (
							<ErrorMessage message={errors.rangeEndInter} />
						)}
					</div>
				</div>
				<div className="mt-[27px] flex items-center gap-[47px]">
					<div>
						<p className="text-[16px]">Advance</p>
					</div>
					<div className="flex items-center gap-[25px]">
						<div className="rounded-[6px] h-[52px] w-[100px] overflow-hidden">
							<Input
								type="color"
								className="p-0 border-none h-[100%] w-[100%] scale-[1.3]"
								name="advanceColor"
								value={formData.advanceColor}
								onChange={handleFormValue}
							/>
						</div>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeStartAdv"
							value={formData.rangeStartAdv}
							onChange={handleFormValue}
						/>
						{errors.rangeStartAdv && (
							<ErrorMessage message={errors.rangeStartAdv} />
						)}
						<p>To</p>
						<Input
							type="number"
							className="h-[52px] w-[150px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							name="rangeEndAdv"
							value={formData.rangeEndAdv}
							onChange={handleFormValue}
						/>
						{errors.rangeEndAdv && (
							<ErrorMessage message={errors.rangeEndAdv} />
						)}
					</div>
				</div>
			</div>
			<div className="mt-[43px] px-[19px] flex items-center gap-[20px]">
				<Button
					className="px-[16px] py-[15px] text-[16px] text-primary-foreground rounded-[6px] bg-[#FF5252]"
					onClick={handleClear}>
					CANCEL
				</Button>
				<Button
					onClick={() => onSubmit(formData)}
					disabled={
						isClient &&
						!(UserRole.SuperAdmin == role) &&
						!maturity_level?.data.clientData
					}
					className="px-[16px] py-[15px] text-[16px] text-primary-foreground rounded-[6px] bg-[#58BA66]">
					SUBMIT
				</Button>
			</div>
			<Loading isLoading={isPending || createPanding || updatePanding} />
		</div>
	);
};
export default MaturityLevelPage;
