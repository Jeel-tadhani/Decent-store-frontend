import { Button } from "@/components/ui/button";
import left from "/assets/icons/left.svg";
import profile from "/assets/images/profile.svg";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TrainersDetailsPage = () => {
	return (
		<div className="pb-[36px] bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
			<div className="border-b-2 pb-[25px] flex justify-between pl-[22px] pr-[28px] items-center pt-[22px]">
				<h2 className="text-base font-bold">Trainers Details</h2>
				<Button variant={"ghost"} className="p-0 text-[16px] font-semibold">
					<img src={left} alt="" className="pr-[15px]" />
					Back
				</Button>
			</div>
			<div className="pl-[22px] pr-[30px]">
				<div className=" mt-[17px]">
					<fieldset className="border rounded-[10px]">
						<legend className="mx-[35px] text-base">
							<h2>Trainer personal information</h2>
						</legend>
						<div className="grid grid-cols-4 items-center pl-[25px] py-[20px]">
							<img src={profile} alt="" />

							<div className="text-base">
								<h6 className="text-[#A3A3A3]">Trainer name</h6>
								<p>Ankites Risher</p>
							</div>
							<div className="text-base">
								<h6 className="text-[#A3A3A3]">Contact number</h6>
								<p>+91 8459293138</p>
							</div>
							<div className="text-base">
								<h6 className="text-[#A3A3A3]">Email address</h6>
								<p>ankitesrisher@gmail.com</p>
							</div>
						</div>
					</fieldset>
				</div>
				<div className="mt-[40px]">
					<fieldset className="border rounded-[10px]">
						<legend className="mx-[35px] text-base">
							<h2>Provider information</h2>
						</legend>
						<div className="pl-[25px] pb-[29px]">
							<div className="grid grid-cols-4 items-center pt-[21px]">
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">Provider name</h6>
									<p>Fastrack Consulting</p>
								</div>
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">Provider type</h6>
									<p>Consulting</p>
								</div>
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">Country</h6>
									<p>India</p>
								</div>
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">City / Town</h6>
									<p>Ahmedabad</p>
								</div>
							</div>
							<div className="grid grid-cols-4 items-center pt-[32px]">
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">Foreign provider</h6>
									<p>Yes</p>
								</div>
								<div className="text-base">
									<h6 className="text-[#A3A3A3]">Provider note</h6>
									<p>221 B Baker street</p>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<div className=" mt-[27px]">
					<fieldset className="border rounded-[10px]">
						<legend className="mx-[35px] text-base">
							<h2>Trainer Status</h2>
						</legend>
						<div className="pl-[25px] py-[20px] flex items-center gap-[59px]">
							<RadioGroup
								defaultValue="comfortable"
								className="flex items-center gap-[34px]">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="default" id="r1" />
									<Label htmlFor="r1" className="text-[16px] font-normal">
										Active
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="comfortable" id="r2" />
									<Label htmlFor="r2" className="text-[16px] font-normal">
										Inactive
									</Label>
								</div>
							</RadioGroup>
							<Button className="bg-[#58BA66] px-[30px] py-[15px] text-base font-semibold rounded-[6px]">
								SUBMIT
							</Button>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	);
};
export default TrainersDetailsPage;
