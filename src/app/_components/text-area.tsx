interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = (props: TextAreaProps) => {
  const { name, rows, maxLength, className } = props;
  return (
    <textarea
      name={name}
      rows={rows ?? 3}
      maxLength={maxLength ?? 250}
      className={
        "appearance-none w-full border-border border-2 rounded-md resize-none py-3 px-6 flex-1 " +
        props.className
      }
    />
  );
};

export default TextArea;
