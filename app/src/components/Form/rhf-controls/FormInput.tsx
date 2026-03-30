import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import { Input } from "@/components/ui/input"

import { FormBase } from "./FormBase"
import type { NativeControlProps } from "./types"

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = NativeControlProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof Input>,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "id"
  >

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, horizontal, controlFirst, ...props }: FormInputProps<TFieldValues, TName>) {
  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
      horizontal={horizontal}
      controlFirst={controlFirst}
    >
      {(field) => <Input {...props} {...field} />}
    </FormBase>
  )
}

export { FormInput }
