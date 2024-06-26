import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Feedback() {
    return (
        <div className="pl-[35px] pr-[35px]">
            <div className="text-end">
                Filter By:
            </div>

            <div className="flex gap-[25px]">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex justify-between">
                        <h3>Mark S. Boles</h3>
                        <p>10/05/2022</p>
                    </div>
                    <h3>We’ve been very pleased with your product/service (eLeaP).The trainees found it very easy to use and it required very little support on our end. Thank you!</h3>
                </div>
            </div>

            <div className="flex gap-[25px] mt-[32px]">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex justify-between">
                        <h3>Mark S. Boles</h3>
                        <p>10/05/2022</p>
                    </div>
                    <h3>We’ve been very pleased with your product/service (eLeaP).The trainees found it very easy to use and it required very little support on our end. Thank you!</h3>
                </div>
            </div>

            <div className="flex gap-[25px] mt-[32px]">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex justify-between">
                        <h3>Mark S. Boles</h3>
                        <p>10/05/2022</p>
                    </div>
                    <h3>We’ve been very pleased with your product/service (eLeaP).The trainees found it very easy to use and it required very little support on our end. Thank you!</h3>
                </div>
            </div>
        </div>
    );
}

export default Feedback;