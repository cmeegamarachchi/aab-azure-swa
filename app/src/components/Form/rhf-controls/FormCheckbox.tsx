import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormBase } from "./FormBase"
import type { NativeControlProps } from "./types"

type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = NativeControlProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<"input">,
    "type" | "name" | "checked" | "defaultChecked" | "onChange" | "onBlur" | "id"
  >

function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, horizontal = true, controlFirst = true, className, ...props }: FormCheckboxProps<TFieldValues, TName>) {
  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
      horizontal={horizontal}
      controlFirst={controlFirst}
    >
      {(field) => (
        <input
          {...props}
          id={field.id}
          name={field.name}
          type="checkbox"
          checked={field.value === true}
          onBlur={field.onBlur}
          onChange={(event) => field.onChange(event.target.checked)}
          aria-invalid={field["aria-invalid"]}
          aria-describedby={field["aria-describedby"]}
          className={cn("mt-1 h-4 w-4", className)}
        />
      )}
    </FormBase>
  )
}

export { FormCheckbox }
