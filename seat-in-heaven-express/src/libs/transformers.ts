import { TransformFnParams } from "class-transformer";
import { isNotEmpty, isNotEmptyObject, isNumber, isNumberString } from "class-validator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Transformer = (params: TransformFnParams) => any;

export const transformerEmptyToNull: Transformer = ({ value }: TransformFnParams) => {
  if (typeof value === "object") {
    return isNotEmptyObject(value) ? value : null;
  } else {
    return isNotEmpty(value) ? value : null;
  }
};

export const transformerEmptyToUndefined: Transformer = ({ value }: TransformFnParams) => {
  if (typeof value === "object") {
    return isNotEmptyObject(value) ? value : undefined;
  } else {
    return isNotEmpty(value) ? value : undefined;
  }
};

export const transformerStringToNumber: Transformer = ({ value }: TransformFnParams) => {
  if (isNumberString(value) || isNumber(value)) {
    return Number(value);
  } else {
    return value;
  }
};
