interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
}

type BtnVariantType = "primary" | "secondary";

const variantMap: Record<BtnVariantType, string> = {
  primary: "bg-primary text-white ",
  secondary: "bg-fgPrimary text-white ",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        variantMap[props.variant ?? "primary"] +
        " p-2 rounded-md uppercase w-[5rem] hover:opacity-70 " +
        props.className
      }
    ></button>
  );
};

export default Button;
