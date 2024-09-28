export const getCommonInputClasses = (props: {
  disabled?: boolean;
  error?: boolean;
  variant?: string;
  readonly?: boolean;
  hasLabel?: boolean;
}) => `
  w-full px-3 text-[13px] border rounded-md shadow-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  ${props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
  ${props.error ? "border-red-500" : "border-gray-300"}
  ${props.variant === "filled" ? "bg-gray-100" : ""}
  ${props.readonly ? "bg-gray-50" : ""}
  ${props.hasLabel ? "pt-5 pb-2" : "py-3.5"}
  h-[46px]
`;

export const getCommonLabelClasses = (props: {
  disabled?: boolean;
  error?: boolean;
}) => `
  absolute left-3 top-[7px] text-[11px] font-medium text-gray-500
  pointer-events-none
  ${props.error ? "text-red-500" : ""}
  ${props.disabled ? "text-gray-400" : ""}
`;