````markdown
# Async submit example with react-hook-form state

This example shows how to combine:

- `react-hook-form` field state
- async submit status (`idle/success/error`)
- field-level validation displayed by `FormInput` / `FormBase`

## Why this pattern

Use this when you want two levels of feedback:

1. **Submit-level feedback** (for example, "Saved successfully" or "Request failed")
2. **Field-level feedback** (for example, "Email is required")

`submitState` handles submit-level status/messages.
`form.setError` handles per-field errors.

## Full example

```tsx
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormInput } from "@/components/Form"

type LoginValues = {
  email: string
}

type SubmitState = {
  status: "idle" | "success" | "error"
  message?: string
}

export function LoginAsyncExample() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" })

  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors()

    if (!values.email.trim()) {
      form.setError("email", { message: "Email is required" })
      setSubmitState({ status: "error", message: "Please fix the form errors." })
      return
    }

    await fakeRequest(values.email)

    setSubmitState({ status: "success", message: "Saved successfully." })
  })

  return (
    <Form>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput control={form.control} name="email" label="Email" type="email" />

        {submitState.message ? <p>{submitState.message}</p> : null}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}

async function fakeRequest(_email: string) {
  await new Promise((resolve) => setTimeout(resolve, 500))
}
```

## Data flow summary

1. User submits the form.
2. `handleSubmit` runs async submit logic.
3. If validation fails, call `form.setError(...)` and update `submitState`.
4. If validation passes, run request logic and update `submitState` to success.
5. UI renders field messages from RHF errors and submit status from local state.

````
