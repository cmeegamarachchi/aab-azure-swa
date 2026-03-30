# Form component

This folder contains a `react-hook-form` abstraction layer for form controls.

## Exports

Public exports are available from `@/components/Form`:

- `Form`
- `FormBase` (react-hook-form controller abstraction)
- `FormInput`
- `FormTextarea`
- `FormSelect`
- `FormCheckbox`

## react-hook-form abstraction usage

Use the higher-level field components inspired by the shadcn field abstraction:

```tsx
import { useForm } from "react-hook-form"
import { Form, FormInput, FormTextarea, FormSelect, FormCheckbox } from "@/components/Form"

type Values = {
  name: string
  description: string
  status: "draft" | "published"
  notifications: boolean
}

const form = useForm<Values>({
  defaultValues: {
    name: "",
    description: "",
    status: "draft",
    notifications: false,
  },
})

<Form>
  <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
    <FormInput control={form.control} name="name" label="Name" />

    <FormTextarea
      control={form.control}
      name="description"
      label="Description"
      description="Be as specific as possible"
    />

    <FormSelect control={form.control} name="status" label="Status">
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </FormSelect>

    <FormCheckbox
      control={form.control}
      name="notifications"
      label="Enable notifications"
    />
  </form>
</Form>
```

## Additional examples: async submit patterns

For complete examples covering async submit state and server validation mapping, see:

- [`examples/use-action-state.md`](./examples/use-action-state.md)
- [`examples/server-validation-mapping.md`](./examples/server-validation-mapping.md)

## File layout

- `Form.tsx`: top-level wrapper component
- `index.tsx`: public barrel exports
- `rhf-controls.tsx`: `Controller`-based field abstractions
- `examples/*`: usage examples
