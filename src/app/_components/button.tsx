import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
}

type BtnVariantType = "primary" | "secondary" | "danger" | "ghost";

const variantMap: Record<BtnVariantType, string> = {
  primary: "bg-primary text-white p-2 rounded-md w-[5rem] ",
  secondary: "bg-fgPrimary text-white p-2 rounded-md w-[5rem] ",
  ghost: "",
  danger: "bg-danger text-white p-2 rounded-md w-[5rem] ",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        variantMap[props.variant ?? "ghost"] + "  uppercase  hover:opacity-70 ",
        props.className
      )}
    ></button>
  );
};

export default Button;
