````markdown
# Server-side validation mapping example

This example demonstrates how to map API validation errors into `react-hook-form` errors so each field renders its message automatically through `FormInput`.

## Why this example matters

When an API returns validation errors, they are often sent as a list keyed by field name. The current Form abstraction expects field errors to come from RHF, so map API issues with `form.setError(...)`.

## Example response shape

```ts
type ServerValidationError = {
  field: string
  message: string
}

type SaveProfileResponse =
  | { ok: true }
  | {
      ok: false
      message?: string
      validationErrors?: ServerValidationError[]
    }
```

## Full example

```tsx
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormInput } from "@/components/Form"

type ProfileValues = {
  firstName: string
  email: string
}

type ProfileFormState = {
  status: "idle" | "success" | "error"
  message?: string
}

const initialState: ProfileFormState = { status: "idle" }

export function ProfileFormWithServerValidation() {
  const [formState, setFormState] = useState<ProfileFormState>(initialState)

  const form = useForm<ProfileValues>({
    defaultValues: {
      firstName: "",
      email: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors()

    const response = await saveProfile(values)

    if (!response.ok) {
      for (const issue of response.validationErrors ?? []) {
        if (issue.field === "firstName") {
          form.setError("firstName", { message: issue.message })
        }
        if (issue.field === "email") {
          form.setError("email", { message: issue.message })
        }
      }

      setFormState({
        status: "error",
        message: response.message ?? "Please correct the highlighted fields.",
      })
      return
    }

    setFormState({ status: "success", message: "Profile saved." })
  })

  return (
    <Form>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput control={form.control} name="firstName" label="First name" />
        <FormInput control={form.control} name="email" label="Email" type="email" />

        {formState.message ? <p>{formState.message}</p> : null}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save profile"}
        </Button>
      </form>
    </Form>
  )
}

type ServerValidationError = {
  field: string
  message: string
}

type SaveProfileResponse =
  | { ok: true }
  | {
      ok: false
      message?: string
      validationErrors?: ServerValidationError[]
    }

async function saveProfile(payload: ProfileValues): Promise<SaveProfileResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const validationErrors: ServerValidationError[] = []

  if (!payload.firstName) {
    validationErrors.push({
      field: "firstName",
      message: "First name is required",
    })
  }

  if (!payload.email.includes("@")) {
    validationErrors.push({
      field: "email",
      message: "Please provide a valid email",
    })
  }

  if (validationErrors.length > 0) {
    return {
      ok: false,
      message: "Validation failed.",
      validationErrors,
    }
  }

  return { ok: true }
}
```

## Mapping checklist

- Keep form values typed with RHF generics: `useForm<Values>()`
- Convert only known server fields into known client keys
- Call `form.clearErrors()` before a new submit
- Use `form.setError(...)` for per-field errors and separate state for global submit messages

````
