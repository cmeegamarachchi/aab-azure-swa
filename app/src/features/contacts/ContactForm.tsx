import React from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { FormBase, FormInput } from "@/components/Form"
import { DatePicker } from "@/components/DatePicker"

import type { Contact } from "./models"

const contactSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  signed_on_date: z.date().min(new Date(), "Signed on date must be today or in the future"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
})

export type ContactFormValues = z.infer<typeof contactSchema>

interface ContactFormProps {
  initialValues?: Partial<Contact>
  onSubmit: (values: ContactFormValues) => void
  loading?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ initialValues, onSubmit, loading }) => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      id: initialValues?.id,
      first_name: initialValues?.first_name ?? "",
      last_name: initialValues?.last_name ?? "",
      email: initialValues?.email ?? "",
      signed_on_date: initialValues?.signed_on_date
        ? new Date(initialValues.signed_on_date)
        : new Date(),
      street_address: initialValues?.street_address ?? "",
      city: initialValues?.city ?? "",
      country: initialValues?.country ?? "",
    },
  })

  React.useEffect(() => {
    form.reset({
      id: initialValues?.id,
      first_name: initialValues?.first_name ?? "",
      last_name: initialValues?.last_name ?? "",
      email: initialValues?.email ?? "",
      signed_on_date: initialValues?.signed_on_date
        ? new Date(initialValues.signed_on_date)
        : new Date(),
      street_address: initialValues?.street_address ?? "",
      city: initialValues?.city ?? "",
      country: initialValues?.country ?? "",
    })
  }, [initialValues, form])

  const handleSubmit = form.handleSubmit((values) => {
    form.clearErrors()

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const zodErrors = parsed.error.flatten().fieldErrors

      if (zodErrors.first_name?.[0]) {
        form.setError("first_name", { message: zodErrors.first_name[0] })
      }
      if (zodErrors.last_name?.[0]) {
        form.setError("last_name", { message: zodErrors.last_name[0] })
      }
      if (zodErrors.email?.[0]) {
        form.setError("email", { message: zodErrors.email[0] })
      }
      if (zodErrors.signed_on_date?.[0]) {
        form.setError("signed_on_date", { message: zodErrors.signed_on_date[0] })
      }
      if (zodErrors.street_address?.[0]) {
        form.setError("street_address", { message: zodErrors.street_address[0] })
      }
      if (zodErrors.city?.[0]) {
        form.setError("city", { message: zodErrors.city[0] })
      }
      if (zodErrors.country?.[0]) {
        form.setError("country", { message: zodErrors.country[0] })
      }

      return
    }

    onSubmit(parsed.data)
  })

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 m-4">
        <FormInput control={form.control} name="first_name" label="First Name" />
        <FormInput control={form.control} name="last_name" label="Last Name" />
        <FormInput control={form.control} name="email" label="Email" type="email" />

        <FormBase control={form.control} name="signed_on_date" label="Sign on date">
          {(field) => (
            <DatePicker
              date={field.value instanceof Date ? field.value : new Date()}
              onChange={(date) => {
                if (date) {
                  field.onChange(date)
                }
              }}
              placeholder="Select end date"
            />
          )}
        </FormBase>

        <FormInput control={form.control} name="street_address" label="Street Address" />
        <FormInput control={form.control} name="city" label="City" />
        <FormInput control={form.control} name="country" label="Country" />

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </>
  )
}

export default ContactForm
