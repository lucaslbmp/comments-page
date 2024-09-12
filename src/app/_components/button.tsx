import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
}

type BtnVariantType = "primary" | "secondary" | "danger";

const variantMap: Record<BtnVariantType, string> = {
  primary: "bg-primary text-white ",
  secondary: "bg-fgPrimary text-white ",
  danger: "bg-danger text-white ",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        variantMap[props.variant ?? "primary"] +
          " p-2 rounded-md uppercase w-[5rem] hover:opacity-70 ",
        props.className
      )}
    ></button>
  );
};

export default Button;
