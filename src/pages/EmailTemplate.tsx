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
import { Button } from "@/components/ui/button";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function EmailTemplate() {
	return (
		<div className="max-w-[1500px] h-[auto] rounded-[10px] bg-[white] mb-[20px] font-nunitoSans">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="font-[700] text-[16px]">Email Template</h2>
			</div>

			<div className="m-[23px]">
				<InputWithLable
					label="Name"
					placeholder="Enter Name"
					className="bg-white h-[52px]"
				/>

				<Select>
					<SelectGroup>
						<SelectLabel className="text-[16px] font-[400] mt-[18px]">
							Receiver Type
						</SelectLabel>

						<SelectTrigger className=" h-[52px] text-[#A3A3A3]">
							<SelectValue placeholder="Select Recivier Type" />
						</SelectTrigger>
					</SelectGroup>
					<SelectContent>
						<SelectItem value="value 1">value 1</SelectItem>
						<SelectItem value="value 2">value 2</SelectItem>
					</SelectContent>
				</Select>

				<InputWithLable
					label="Subject"
					placeholder="Enter email subject"
					className="bg-white h-[52px]"
				/>

				<div className="mt-[20px]">
					<Button className="md:w-[200px] sm:w-[160px] w-full h-[42px] md:text-[16px] text-[12px] font-[400]">
						Request reject template
					</Button>
					<Button className="md:w-[200px] sm:w-[160px] w-full h-[42px] md:text-[16px] text-[12px] font-[400] sm:ml-[10px] sm:mt-0 mt-[5px]">
						Request accept template
					</Button>
					<Button className="md:w-[200px] sm:w-[160px] w-full h-[42px] md:text-[16px] text-[12px] font-[400] sm:ml-[10px] sm:mt-0 mt-[5px]">
						+ Add new template
					</Button>
				</div>

				<Editor style={{ height: "320px" }} className="mt-[18px]" />
				<div className="text-end mt-[18px]">
					<Button className="h-[52px] px-[30px] bg-[#58BA66]">SEND</Button>
				</div>
			</div>
		</div>
	);
}

export default EmailTemplate;
