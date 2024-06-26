
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";


function Module({ handleButtonClick }) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center justify-between pl-[20px]">
                        <div>
                            <h3 className="text-[16px] font-[700] leading-[22px]">
                                Chapter 1 - Intro
                            </h3>
                            <p className="text-[12px] font-[400] leading-[16px] pt-[4px] text-[#909090]">
                                Section : 1 | Duration : 00:30:00
                            </p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-[20px] ">
                        <div className="border-b border-t h-[74px] ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 1
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleButtonClick} className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                        <div className="border-b  h-[74px]  ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 1
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                        <div className="border-b  h-[74px]  ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 1
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className="flex items-center justify-between pl-[20px]">
                        <div>
                            <h3 className="text-[16px] font-[700] leading-[22px]">
                                Chapter 2 - Required Tools
                            </h3>
                            <p className="text-[12px] font-[400] leading-[16px] pt-[4px] text-[#909090]">
                                Section : 1 | Duration : 00:30:00
                            </p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-[20px] ">
                        <div className="border-b border-t h-[74px]  ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 4
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                        <div className="border-b  h-[74px]  ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 5
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                        <div className="border-b  h-[74px]  ml-[20px] border-gray-300 w-[1400px] mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="w-[32px] h-[32px]"
                                    src="../assets/images/Vector.png"
                                />
                                <div className="pl-[10px]">
                                    <h3 className="text-[16px] font-[700] leading-[22px]">
                                        Doug's Story 6
                                    </h3>
                                    <p className="text-[12px] leading-[16px] text-[#909090]">
                                        MP4 | Duration : 00:04:42
                                    </p>
                                </div>
                            </div>
                            <Button className="w-[91px] h-[42px] text-[16px] font-[600]">
                                START
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Module;