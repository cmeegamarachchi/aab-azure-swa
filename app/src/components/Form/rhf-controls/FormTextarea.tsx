import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormBase } from "./FormBase"
import type { NativeControlProps } from "./types"

type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = NativeControlProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<"textarea">,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "id"
  >

function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, horizontal, controlFirst, className, ...props }: FormTextareaProps<TFieldValues, TName>) {
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
        <textarea
          {...props}
          {...field}
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        />
      )}
    </FormBase>
  )
}

export { FormTextarea }
