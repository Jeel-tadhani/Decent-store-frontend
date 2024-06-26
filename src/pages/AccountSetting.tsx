import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import PasswordInput from "@/components/comman/Input/Password";
import Loading from "@/components/comman/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { setPath } from "@/redux/Reducer/PathReducer";
import { ResetPassword } from "@/services/apiServices/authServices";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { z } from "zod";

function AccountSetting() {
	const dispatch = useDispatch();

	const { toast } = useToast();

	const { mutate: reset_password, isPending } = useMutation({
		mutationFn: ResetPassword,
		onSuccess: () => {
			reset();
			toast({ title: "Password update Successfully" });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		oldPassword: z.string().min(1, "Current Password is required"),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(8, "Password must be at least 8 characters")
			.refine(
				(value) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/.test(
						value
					),
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, and one special character",
				}
			),
		confirmPassword: z
			.string({
				required_error: "Password is required",
			})
			.min(8, "Password must be at least 8 characters")
			.refine(
				(value) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/.test(
						value
					),
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, and one special character",
				}
			),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

	const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
		console.log(data);
		const token = localStorage.getItem("token");
		reset_password({ ...data, token });
	};

	return (
		<div className="bg-primary-foreground rounded-[6px] h-[800px]">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="text-base font-bold first-line:font-nunitoSans">
					Account Settings
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
				<div className="flex h-[500px] justify-center items-center mt-[40px] font-nunitoSans">
					<div className="w-[600px] flex flex-col gap-4">
						<h2 className="pb-[20px] font-[700] text-[25px] border-b solid 1px gray">
							Reset Password
						</h2>
						<div>
							<PasswordInput
								label="Current Password"
								placeholder="Current Password"
								className="h-[52px] mt-2"
								validationHandler={register("oldPassword")}
							/>
							{errors.oldPassword && (
								<ErrorMessage message={errors.oldPassword.message as string} />
							)}
						</div>
						<div>
							<PasswordInput
								label="New Password"
								placeholder="New Password"
								className="h-[52px] mt-2"
								validationHandler={register("password")}
							/>
							{errors.password && (
								<ErrorMessage message={errors.password.message as string} />
							)}
						</div>
						<div>
							<PasswordInput
								label="Confirm Password"
								placeholder="Confirm Password"
								className="h-[52px] mt-2"
								validationHandler={register("confirmPassword")}
							/>
							{errors.confirmPassword && (
								<ErrorMessage
									message={errors.confirmPassword.message as string}
								/>
							)}
						</div>
						<div className="w-full flex justify-center">
							<Button
								type="submit"
								className="mt-[40px] w-[130px] h-[45px] text-[15px] bg-[#58BA66]">
								Update
							</Button>
						</div>
					</div>
				</div>
			</form>
			<Loading isLoading={isPending} />
		</div>
	);
}

export default AccountSetting;
