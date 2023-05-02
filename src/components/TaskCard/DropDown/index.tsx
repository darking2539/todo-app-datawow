import Select from 'react-select'

export default function DropDown(props: any) {

  const { ...rest } = props;

  return (
    <div style={{width: "120px"}}>
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "10px",
            border: "none"
          }),
          option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            borderRadius: "10px",
            border: "none",
            color: isDisabled ? undefined : isSelected && isFocused ? "white" : isFocused ? "white" : undefined,
            backgroundColor: isDisabled ? undefined : isSelected && isFocused ? "#585292" : isFocused ? "#585292" : undefined,
          }),
        }}
        {...rest} />
    </div>
  )
}
