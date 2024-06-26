import clientImage from "/assets/images/ClientImage.png";
import PdfIcon from "/assets/images/PdfIcon.png";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "../comman/FileUpload";
import { useState } from "react";

const SupportDetail = () => {
	const [image, setImage] = useState<File | undefined>(undefined);
	const [video, setVideo] = useState<File | undefined>(undefined);

	return (
		<div className="w-full font-nunitoSans text-[16px] leading-[22px] text-[#000000] font-normal">
			<div className="flex justify-between items-center px-5 text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
				<h2 className="font-bold">Ticket Details</h2>
			</div>
			<div className="p-4 sm:px-5 sm:py-[26px]">
				<div className="flex sm:justify-between flex-col sm:flex-row gap-y-3">
					<div className="flex gap-[13px]">
						<img src={clientImage} alt="user image" width={32} height={32} />
						<div className="flex flex-col">
							<h4>Danila Raffel</h4>
							<p className="text-[#A3A3A3] text-[12px] leading-4">
								Provider Type: Client
							</p>
						</div>
					</div>
					<div>
						<label htmlFor="status:">Status:</label>
						<Button className="ml-2 sm:mr-7 mr-5 bg-[#0E9CFF] text-[12px] leading-[16.37px] rounded-[10px] py-[5px] px-[10px]">
							InProgress
						</Button>
						<label htmlFor="priority:">Priority:</label>
						<Button className="ml-2 bg-[#FF5252] text-[12px] leading-[16.37px] rounded-[10px] py-[5px] px-[10px]">
							High
						</Button>
					</div>
				</div>
				<form action="">
					<div className="mt-5 sm:mt-[34px] border border-solid border-[#D9D9D9] rounded-[10px] pt-[15px] px-5 pb-[23px]">
						<h5 className="text-[#A3A3A3] mb-[9px]">Ticket Subject</h5>
						<p className="mb-[18px]">How to customize the template?</p>
						<h5 className="text-[#A3A3A3] mb-3">Ticket Details</h5>
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</p>
						<div className="flex items-center mt-8 gap-x-5 gap-y-4 flex-wrap">
							<div className="flex items-center">
								<img src={PdfIcon} alt="pdf icon" width={42} height={42} />
								<h6 className="ml-[10px]">pdf file attachement.pdf</h6>
							</div>
							<Button className="font-semibold text-[16px] leading-[22px] py-[10px] px-5">
								DOWNLOAD
							</Button>
						</div>
					</div>
					<div className="mt-6 sm:mt-[29px]">
						<div className="flex flex-col sm:flex-row gap-x-9 gap-y-[18px]">
							<div className="w-full sm:w-1/2">
								<label htmlFor="">Assign To</label>
								<Select>
									<SelectTrigger className="w-full h-[52px] mt-[13px]">
										<SelectValue placeholder="Select Name" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="User 1">User 1</SelectItem>
										<SelectItem value="User 2">User 2</SelectItem>
										<SelectItem value="User 3">User 3</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="w-full sm:w-1/2">
								<label htmlFor="">Ticket Status</label>
								<Select>
									<SelectTrigger className="w-full h-[52px] mt-[13px]">
										<SelectValue placeholder="Closed" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Open">Open</SelectItem>
										<SelectItem value="In Process">In Process</SelectItem>
										<SelectItem value="Answered">Answered</SelectItem>
										<SelectItem value="Closed">Closed</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="w-full mt-[18px]">
							<label>Ticket Reply</label>
							<Textarea
								placeholder="Enter details"
								className="bg-white mt-3"
								rows={6}
							/>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row justify-between mt-5 	gap-y-5">
						<div className="flex flex-wrap gap-y-2">
							<FileUpload
								handleDrop={(file) => {
									setImage(file);
								}}
								acceptType=".pdf, .png"
								className="border-none !p-0">
								<div className="flex items-center">
									<img
										src={image ? URL.createObjectURL(image) : PdfIcon}
										alt={"PDF icon"}
										className="mr-2 rounded-full w-[42px] h-[42px] object-cover"
									/>
									<p className="mr-4">Upload Document</p>
								</div>
							</FileUpload>

							<FileUpload
								handleDrop={(file) => {
									setVideo(file);
								}}
								acceptType=".mp4"
								className="border-none !p-0">
								<div className="flex items-center">
									{video ? (
										<video
											src={URL.createObjectURL(video)}
											className="mr-2 w-[42px] h-[42px] rounded-full object-cover"></video>
									) : (
										<img
											src={PdfIcon}
											alt="pdf icon"
											width={42}
											height={42}
											className="mr-2"
										/>
									)}
									<p>Upload Video</p>
								</div>
							</FileUpload>
						</div>
						<Button className="bg-[#58BA66] text-[16px] leading-[22px] font-semibold rounded-[6px] px-7 py-4 w-[166.42px] self-end">
							SUBMIT
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SupportDetail;
