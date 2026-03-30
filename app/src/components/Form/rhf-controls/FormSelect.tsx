import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormBase } from "./FormBase"
import type { NativeControlProps } from "./types"

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = NativeControlProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<"select">,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "id"
  >

function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, horizontal, controlFirst, className, ...props }: FormSelectProps<TFieldValues, TName>) {
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
        <select
          {...props}
          id={field.id}
          name={field.name}
          value={typeof field.value === "string" ? field.value : ""}
          onBlur={field.onBlur}
          onChange={(event) => field.onChange(event.target.value)}
          aria-invalid={field["aria-invalid"]}
          aria-describedby={field["aria-describedby"]}
          className={cn(
            "border-input dark:bg-input/30 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />
      )}
    </FormBase>
  )
}

export { FormSelect }
