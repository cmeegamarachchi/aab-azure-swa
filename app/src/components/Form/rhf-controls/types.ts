import type * as React from "react"
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"

export type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  name: TName
  label: React.ReactNode
  description?: React.ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

export type FormBaseRenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = ControllerRenderProps<TFieldValues, TName> & {
  id: string
  "aria-invalid": boolean
  "aria-describedby"?: string
}

export type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = FormControlProps<TFieldValues, TName> & {
  children: (field: FormBaseRenderProps<TFieldValues, TName>) => React.ReactNode
}

export type NativeControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FormControlProps<TFieldValues, TName>
