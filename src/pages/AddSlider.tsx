import { Button } from "@/components/ui/button";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import FileUpload from "@/components/comman/FileUpload";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
	createBanner,
	fetchBannerById,
	updateBanner,
} from "@/services/apiServices/bannerServices";
import { QUERY_KEYS } from "@/lib/constants";
import { ErrorType } from "@/types/Errors";
import { Banner } from "@/types";
import { setPath } from "@/redux/Reducer/PathReducer";
import { useDispatch, useSelector } from "react-redux";

function AddSlider() {
	const queryParams = new URLSearchParams(window.location.search);
	const banner = queryParams.get("bannerId");

	const [bannerId, setBannerId] = useState(banner);
	const [file, setFile] = useState("");
	const { isClient, clientId } = useSelector((state: any) => state.user);

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data: currentBanner } = useQuery({
		queryKey: [QUERY_KEYS.banner, bannerId],
		queryFn: () => fetchBannerById(bannerId as string),
		enabled: !!bannerId,
	});

	const { mutate: create_banner, isPending: createPanding } = useMutation({
		mutationFn: (data: Banner) => createBanner(data, isClient, clientId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bannerList] });
			toast({ title: "Banner create Successfully" });
			dispatch(setPath([{ name: "Banner Slider", link: "banner-slider" }]));
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});
	const { mutate: update_banner, isPending: updatePanding } = useMutation({
		mutationFn: (data: Banner) => updateBanner(data, bannerId as string),
		onSuccess: () => {
			toast({ title: "Banner update Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bannerList] });
			dispatch(setPath([{ name: "Banner Slider", link: "banner-slider" }]));
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		banner: z.string().min(1, "Banner image is required"),
		title: z.string().min(1, "Title is required"),
		content: z.string().min(1, "Content is required"),
		buttonTitle: z.string().min(1, "ButtonTitle is required"),
		buttonUrl: z.string().min(1, "ButtonUrl is required"),
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
		const banner = currentBanner?.data.data;
		if (typeof banner === "object" && banner !== null) {
			setValue("banner", banner.banner);
			setValue("title", banner.title);
			setValue("content", banner.content);
			setValue("buttonTitle", banner.buttonTitle);
			setValue("buttonUrl", banner.buttonUrl);
			setBannerId(banner.id as string);
			setFile(banner.banner);
		}
	}, []);

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		if (!bannerId) {
			create_banner(data);
		} else {
			update_banner(data);
		}
	};

	return (
		<div className="max-w-[1500px] h-[auto] rounded-[10px] bg-[white] pb-5	 font-nunitoSans">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="font-[700] text-[16px]">
					{!bannerId ? "Add New Slider" : "Update Slider"}
				</h2>
				<button
					onClick={() =>
						dispatch(
							setPath([{ name: "Banner Slider", link: "banner-slider" }])
						)
					}
					className="text-[16px] font-[600] flex items-center gap-[15px] ">
					<HiOutlineArrowNarrowLeft />
					Back
				</button>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="m-[22px]">
					<div className="grid grid-cols-1 space-y-2 mb-[18px]">
						<label className="">Upload Slider banner</label>
						<FileUpload
							handleDrop={(file) => {
								setFile(file);
								setValue("banner", file);
							}}
							acceptType=".jpg, .png, .svg, .webp, .jpeg">
							<div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
								{file ? (
									<img
										src={file}
										alt=""
										className="h-full w-full object-contain max-h-40"
									/>
								) : (
									<>
										<img
											className="has-mask  w-[64px] h-[49px] mb-[27px]"
											src="../assets/images/Crop.png"
										/>

										<h2>Drag and drop Image</h2>
										<p className="pointer-none text-[#D9D9D9] ">
											<span className="text-sm">
												(only jpg,png,svg Webp,jepg format allowed)
											</span>{" "}
											<br /> (File should be less than 15MB and Maximum
											resolution 1676pxX600px)
										</p>
									</>
								)}
							</div>
						</FileUpload>
						{errors.banner && (
							<ErrorMessage message={errors.banner.message as string} />
						)}
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className=" max-w-[650px] flex flex-col gap-y-[18px] ">
							<InputWithLable
								label="Slider title"
								placeholder="Slider title here"
								className="bg-[white] h-[52px]"
								{...register("title")}
							/>
							{errors.title && (
								<ErrorMessage message={errors.title.message as string} />
							)}

							<InputWithLable
								label="Call to action button title"
								placeholder="Add button title"
								className="bg-[white] h-[52px]"
								{...register("buttonTitle")}
							/>
							{errors.buttonTitle && (
								<ErrorMessage message={errors.buttonTitle.message as string} />
							)}
							<InputWithLable
								label="Button URL"
								placeholder="Add URL"
								className="bg-[white] h-[52px]"
								{...register("buttonUrl")}
							/>
							{errors.buttonUrl && (
								<ErrorMessage message={errors.buttonUrl.message as string} />
							)}
						</div>
						<div>
							<InputWithLable
								label="Slider Content"
								placeholder="Add content here"
								className="bg-[white] pt-[22px]  pl-[22px] pb-[152px] "
								{...register("content")}
							/>
							{errors.content && (
								<ErrorMessage message={errors.content.message as string} />
							)}
							<div className="max-w-full flex sm:justify-end justify-center">
								<Button
									type="submit"
									className="bg-[#58BA66] text-[16px]  h-[52px]  mt-[20px] px-[30px] py-[15px] ">
									PUBLISH
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<Loading isLoading={createPanding || updatePanding} />
		</div>
	);
}

export default AddSlider;
