import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import FileUpload from "@/components/comman/FileUpload";
import Loading from "@/components/comman/Loading";
import { Button } from "@/components/ui/button";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/Reducer/PathReducer";
import { fetchUser, updateUser } from "@/services/apiServices/userServices";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { z } from "zod";

function ProfileSetting() {
	const dispatch = useDispatch();
	const { toast } = useToast();

	const {
		data,
		isPending,
	} = useQuery<any>({
		queryKey: [QUERY_KEYS.userFetch],
		queryFn: () => fetchUser(),
	});

	const { mutate: update_user, isPending: updatePanding } = useMutation({
		mutationFn: (data: any) => updateUser(data),
		onSuccess: () => {
			toast({ title: "User update Successfully" });
			// queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientList] });
			// dispatch(setPath([{ name: "Client Management ", link: "/clients" }]));
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const user = data?.data?.data

	const [file, setFile] = useState("");

	const schema = z.object({
		first_name: z.string().min(1, "First name is required"),
		last_name: z.string().min(1, "Last name is required"),
		user_name: z.string().min(1, "User name is required"),
		avatar: z.string().optional(),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

	const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
		console.log(data, "data");
		update_user({ ...data, avatar: file })
	};

	useEffect(() => {
		if (user) {
			reset({
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				user_name: user.user_name || '',
				avatar: user?.avatar || '',
			});
		}
		if (user?.avatar) {
			setFile(user.avatar)
		}
	}, [user, reset]);


	return (
		<div className="bg-primary-foreground rounded-[6px] h-[1000px]">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="text-base font-bold first-line:font-nunitoSans">
					Profile Settings
				</h2>
				<button
					onClick={() =>
						dispatch(setPath([{ name: "Dashboard", link: "/dashboard" }]))
					}
					className="text-[16px] font-[600] flex items-center gap-[15px] ">
					<HiOutlineArrowNarrowLeft />
					Back
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-[full] h-[auto] flex flex-col items-center mt-[40px]">
					<FileUpload
						handleDrop={(file) => {
							setFile(file);
						}}
						className="h-[160px] w-[160px]"
						acceptType=".jpg, .png, .svg, .webp, .jpeg">
						<div className="h-full w-full  flex flex-col justify-center items-center  ">
							{user?.avatar ? (
								file ?
									<img
										src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/view/${file}`}
										alt="image"
										className="max-h-[140px] max-w-[140px] object-cover"
									/>
									:
									<img
										src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/view/${user?.avatar}`}
										alt="image"
										className="max-h-[140px] max-w-[140px] object-cover"
									/>
							) : (
								<>
									<img
										className="has-mask  w-[120px] h-[102px]"
										src="../assets/images/Crop.png"
									/>
								</>
							)}
						</div>
						{errors.avatar && (
							<ErrorMessage message={errors.avatar.message as string} />
						)}
					</FileUpload>

					<div>
						<InputWithLable
							className="w-[600px] h-[48px]"
							label="User name"
							{...register("user_name")}
						/>

						{errors.user_name && (
							<ErrorMessage message={errors.user_name.message as string} />
						)}

						<InputWithLable
							className="w-[600px] h-[48px]"
							label="First name"
							{...register("first_name")}
						/>
						{errors.first_name && (
							<ErrorMessage message={errors.first_name.message as string} />
						)}

						<InputWithLable
							className="w-[600px] h-[48px]"
							label="Last name"
							{...register("last_name")}
						/>

						{errors.last_name && (
							<ErrorMessage message={errors.last_name.message as string} />
						)}


						<InputWithLable className="w-[600px] h-[48px]" label="Email Id" value={user?.email} />
					</div>

					<Button
						type="submit"
						className="mt-[40px] w-[180px] h-[50px] bg-[#58BA66]">
						Save Changes{" "}
					</Button>
				</div>
			</form>
			<Loading isLoading={isPending || updatePanding} />
		</div>
	);
}

export default ProfileSetting;
