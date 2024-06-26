import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[6px] border px-[29px] py-[7px] text-xs text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#58BA66] text-primary-foreground hover:bg-[#58BA66]/80",
        secondary:
          "border-transparent bg-[#FF5252] text-secondary-foreground hover:bg-[#FF5252]/80",
        destructive:
          "border-transparent bg-[#FFA25E] text-destructive-foreground hover:bg-[#FFA25E]/80",
        outline:
          "border-transparent bg-[#EDF0F4] hover:bg-[#EDF0F4]/80 text-black",
        Intermediate:
          "border-transparent bg-[#FFD56A] text-black hover:bg-[#FFD56A]/80",
        Advanced:
          "border-transparent bg-[#D6F5AC] text-black hover:bg-[#D6F5AC]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
