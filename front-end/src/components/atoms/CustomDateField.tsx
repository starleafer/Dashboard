import type {
  DateFieldProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import { DateField, DateInput, DateSegment, FieldError, Label, Text } from "react-aria-components";

interface MyDateFieldProps<T extends DateValue> extends DateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function CustomDateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyDateFieldProps<T>) {
  return (
    <DateField {...props} className="flex flex-col border border-gray-300 rounded-md p-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <DateInput className="flex ">{(segment) => <DateSegment segment={segment} />}</DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </DateField>
  );
}

export default CustomDateField;
