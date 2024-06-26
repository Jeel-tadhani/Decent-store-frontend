import { Button } from "@/components/ui/button";
import left from "/assets/icons/left.svg";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUpload from "@/components/comman/FileUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { CourseSlider } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createCourseSlider,
	fetchCourseSliderById,
	updateCourseSlider,
} from "@/services/apiServices/courseSliderServices";
import { QUERY_KEYS } from "@/lib/constants";
import { ErrorType } from "@/types/Errors";
import Loading from "@/components/comman/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";

const AddCourseSlider = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const courseSliderId = queryParams.get("courseSliderId");
	const { isClient, clientId } = useSelector((state: any) => state.user);

	const [courserSliderId, setCourserSliderId] = useState(courseSliderId);
	const [file, setFile] = useState("");

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();
	const { data: currentCourseSlider } = useQuery({
		queryKey: [QUERY_KEYS.courseSlider, courserSliderId],
		queryFn: () => fetchCourseSliderById(courserSliderId as string),
		enabled: !!courserSliderId,
	});
	const { mutate: create_course_slider, isPending: createPanding } =
		useMutation({
			mutationFn: (data: CourseSlider) =>
				createCourseSlider(data, isClient, clientId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.courseSliderList],
				});
				toast({ title: "Course Slider create Successfully" });
				dispatch(
					setPath([
						{ name: "Web Portal Setting", link: null },
						{ name: "Course Slider", link: "course-slider" },
					])
				);
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});
	const { mutate: update_course_slider, isPending: updatePanding } =
		useMutation({
			mutationFn: (data: CourseSlider) =>
				updateCourseSlider(data, courserSliderId as string),
			onSuccess: () => {
				toast({ title: "Course Slider update Successfully" });
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.courseSliderList],
				});
				dispatch(
					setPath([
						{ name: "Web Portal Setting", link: null },
						{ name: "Course Slider", link: "course-slider" },
					])
				);
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});

	const schema = z.object({
		courseType: z.string().min(1, "Course Type is required"),
		courseTitle: z.string().min(1, "Title is required"),
		content: z.string().min(1, "Content is required"),
		buttonTitle: z.string().min(1, "Button Title is required"),
		courseImage: z.string().min(1, "Image is required"),
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
		const data = currentCourseSlider?.data?.data;
		if (typeof data === "object" && data !== null) {
			setValue("courseType", data.courseType);
			setValue("courseTitle", data.courseTitle);
			setValue("content", data.content);
			setValue("buttonTitle", data.buttonTitle);
			setValue("courseImage", data.courseImage);
			setCourserSliderId(data.id as string);
			setFile(data.courseImage);
		}
	}, [currentCourseSlider]);

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		if (!courseSliderId) {
			create_course_slider(data);
		} else {
			update_course_slider(data);
		}
	};

	return (
		<div className="mt-[21px] pb-[36px] bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
			<div className="border-b-2 pb-[24px] flex justify-between pl-[21px] pr-[19px] items-center pt-[23px]">
				<h2 className="text-base font-bold">
					{!courseSliderId ? "Add New Slider" : "Update Slider"}
				</h2>
				<Button
					variant={"ghost"}
					className="p-0 text-[16px] font-semibold font-nunitoSans"
					onClick={() =>
						dispatch(
							setPath([
								{ name: "Web Portal Setting", link: null },
								{ name: "Course Slider", link: "course-slider" },
							])
						)
					}>
					<img src={left} alt="" className="pr-[15px]" />
					Back
				</Button>
			</div>

			<form
				className="mt-[18px] sm:ml-[22px] sm:mr-[16px] mx-2"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 gap-[37px]">
					<div className="flex flex-col gap-[8px] col-span-2 sm:col-span-1">
						<label htmlFor="" className="text-[16px]">
							Course Type
						</label>
						<Input
							type="text"
							placeholder="Enter course type"
							className="border bg-white h-[52px] py-[15px] pl-[20px] placeholder:text-base placeholder:text-[#A3A3A3]"
							{...register("courseType")}
						/>
						{errors.courseType && (
							<ErrorMessage message={errors.courseType.message as string} />
						)}
					</div>
					<div className="flex flex-col gap-[8px] col-span-2 sm:col-span-1">
						<label htmlFor="" className="text-[16px]">
							Course Title
						</label>
						<Input
							type="text"
							placeholder="Enter course title"
							className="border w-full bg-white h-[52px] py-[15px] pl-[20px] placeholder:text-base placeholder:text-[#A3A3A3] rounded-[6px]"
							{...register("courseTitle")}
						/>
						{errors.courseTitle && (
							<ErrorMessage message={errors.courseTitle.message as string} />
						)}
					</div>
				</div>
				<div className="mt-[22px] grid grid-cols-2 gap-[37px]">
					<div className="flex flex-col gap-[20px]  col-span-2 sm:col-span-1">
						<div className="flex flex-col gap-[6px]">
							<label htmlFor="" className="text-[16px]">
								Slider Content
							</label>
							<textarea
								id=""
								className="border bg-white py-[15px] pl-[20px] placeholder:text-base placeholder:text-[#A3A3A3] rounded-[6px]"
								cols={30}
								rows={6}
								placeholder="Enter course short description"
								{...register("content")}></textarea>
							{errors.content && (
								<ErrorMessage message={errors.content.message as string} />
							)}
						</div>
						<div className="flex flex-col gap-[8px]">
							<label htmlFor="" className="text-[16px]">
								Call to action button title
							</label>
							<Input
								type="text"
								placeholder="Enter button title"
								className="border bg-white py-[15px] pl-[20px] placeholder:text-base placeholder:text-[#A3A3A3] rounded-[6px] h-[52px] "
								{...register("buttonTitle")}
							/>
							{errors.buttonTitle && (
								<ErrorMessage message={errors.buttonTitle.message as string} />
							)}
						</div>
					</div>
					<div className="flex flex-col gap-[6px] col-span-2 sm:col-span-1">
						<label htmlFor="">Upload Course Image</label>
						<FileUpload
							handleDrop={(file) => {
								setValue("courseImage", file);
								setFile(file);
							}}
							className="h-[279px]"
							acceptType=".jpg, .png, .svg, .webp, .jpeg">
							<div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
								{file ? (
									<img
										src={file}
										alt="image"
										className="max-h-[197px] object-cover"
									/>
								) : (
									<>
										<img
											className="has-mask  w-[120px] h-[102px] mb-[23px]"
											src="../assets/images/Crop.png"
										/>

										<h2>Drag and drop image</h2>
										<p className="pointer-none text-[#A3A3A3]">
											(only jpg, png, svg, webp, jpeg format allowed)
										</p>
									</>
								)}
							</div>
						</FileUpload>
						{errors.courseImage && (
							<ErrorMessage message={errors.courseImage.message as string} />
						)}
					</div>
				</div>
				<div className="mt-[24px] text-right">
					<Button type="submit" className="px-[30px] py-[15px] bg-[#58BA66]">
						PUBLISH
					</Button>
				</div>
			</form>

			<Loading isLoading={createPanding || updatePanding} />
		</div>
	);
};
export default AddCourseSlider;
