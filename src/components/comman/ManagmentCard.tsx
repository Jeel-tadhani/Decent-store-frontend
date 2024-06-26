import star from "/assets/icons/star.svg";
import managment from "/assets/images/managment.svg";
import pencilwhite from "/assets/icons/pencilwhite.svg";
import rightgreen from "/assets/icons/rightgreen.svg";
import deletwhite from "/assets/icons/deletwhite.svg";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ManagmentCardProps {
  card: {
    badgegray: string;
    badge: string;
    badgemain: string;
    slider: boolean;
  };
}

const ManagmentCard = ({ card }: ManagmentCardProps) => {

  console.log(card);

  return (

      <Card className="w-[267px]">
      <img  src={card.image} alt="" className="w-full" />

        <CardHeader className="p-[8px]">
          <CardTitle className="text-[16px] font-bold">
          {card.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-[8px] pb-[12px] border-b-2">
          <div className="flex justify-between items-center">
          <p className="text-[14px]">Offered By : {card.Auther}</p>
            <div className="flex items-center gap-[6px]">
              <img src={star} alt="" />
              <p className="text-[14px]">4/5</p>
            </div>
          </div>
          <div className="flex justify-between items-center my-[11px]">
            <p className="text-[14px]">Module : 3</p>
          <p className="text-[14px]">Duration : {card.duration}</p>
          </div>
          <div className="flex justify-between items-center mt-[11px] ">
            <Badge
              variant={"outline"}
              className="rounded-full text-[12px] px-[10px] py-[5px]">
            {card.pillar.pillarName}
            </Badge>
            <Badge
              variant={"secondary"}
              className="rounded-full text-[12px] px-[10px] py-[5px]">
              {card.badge}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center py-[9px] px-[13px]">
        <Badge variant={card.status === "HOLD" ? "secondary" : "default"} className="text-[14px] py-[7px] px-[21px]">
          {card.status}
          </Badge>
          <div className="flex item-center gap-[10px]">
            <Button className="p-[8px] bg-[#5CC1EE]">
              <img src={pencilwhite} alt="" />
            </Button>
            <Button className="p-[8px] bg-[#FF5252]">
              <img src={deletwhite} alt="" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    
  );
};

export const ListManagmentCard = ({ card }: ManagmentCardProps ) => {
  console.log(card);
  
  return (
    <Card className="max-w-[full]">
      <img  src={card.image} alt="" className="w-[400px]" />


      <CardHeader className="p-[8px] ">
        <CardTitle className="text-[16px] font-bold">
          Greening the emerald isle: Ireland's journey to carbon...
        </CardTitle>
        <CardContent className="px-[8px] pb-[12px] border-b-2">
          <div className="flex justify-between items-center">
            <p className="text-[14px]">Offered By : Training Institute</p>
            <div className="flex items-center gap-[6px]">
              <img src={star} alt="" />
              <p className="text-[14px]">4/5</p>
            </div>
          </div>
          <div className="flex justify-between items-center my-[11px]">
            <p className="text-[14px]">Module : 3</p>
            <p className="text-[14px]">Duration : 3 Days</p>
          </div>
          <div className="flex justify-between items-center mt-[11px] ">
            <Badge
              variant={"outline"}
              className="rounded-full text-[12px] px-[10px] py-[5px]">
              {card.badgegray}
            </Badge>
            <Badge
              variant={"secondary"}
              className="rounded-full text-[12px] px-[10px] py-[5px]">
              {card.badge}
            </Badge>
          </div>
        </CardContent>

      </CardHeader>

      
      <CardFooter className="flex justify-between items-center py-[9px] px-[13px]">
        <Badge className="text-[14px] py-[7px] px-[21px]">
          {card.badgemain}
        </Badge>
        <div className="flex item-center gap-[10px]">
          <Button className="p-[8px] bg-[#5CC1EE]">
            <img src={pencilwhite} alt="" />
          </Button>
          <Button className="p-[8px] bg-[#FF5252]">
            <img src={deletwhite} alt="" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ManagmentCard;
