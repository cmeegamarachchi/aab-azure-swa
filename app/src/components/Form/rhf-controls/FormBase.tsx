import { Controller, type FieldPath, type FieldValues } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import type { FormBaseProps } from "./types"

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage =
          typeof fieldState.error?.message === "string"
            ? fieldState.error.message
            : undefined
        const descriptionId = description ? `${field.name}-description` : undefined
        const messageId = errorMessage ? `${field.name}-message` : undefined
        const ariaDescribedBy = [descriptionId, messageId].filter(Boolean).join(" ") || undefined

        const fieldControl = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
          "aria-describedby": ariaDescribedBy,
        })

        return (
          <div className={cn("space-y-2", controlFirst && "space-y-0")}>
            {controlFirst ? (
              <div className={cn(horizontal && "flex items-start gap-3")}>
                {fieldControl}
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor={field.name}
                    className={cn(errorMessage && "text-destructive")}
                  >
                    {label}
                  </Label>
                  {description ? (
                    <p
                      id={descriptionId}
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      {description}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <Label
                  htmlFor={field.name}
                  className={cn(errorMessage && "text-destructive")}
                >
                  {label}
                </Label>
                {description ? (
                  <p
                    id={descriptionId}
                    className="text-[0.8rem] text-muted-foreground"
                  >
                    {description}
                  </p>
                ) : null}
                {fieldControl}
              </>
            )}
            {errorMessage ? (
              <p
                id={messageId}
                className="text-[0.8rem] font-medium text-destructive"
              >
                {errorMessage}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}

export { FormBase }
