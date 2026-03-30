import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormSelect } from "@/components/Form"
import { useConfiguration } from "@/providers/ConfigurationProvider"

const settingsSchema = z.object({
  baseUrl: z
    .string()
    .trim()
    .min(1, { message: "Base URL is required" })
    .refine((value) => {
      try {
        const parsedUrl = new URL(value)
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
      } catch {
        return false
      }
    }, { message: "Please enter a valid http(s) URL" }),
  itemsPerPage: z.coerce.number().int().positive().max(100),
  apiKey: z.string().min(1, { message: "API Key is required" }),
  theme: z.enum(["light", "dark", "system"]),
})

type SettingsValues = z.infer<typeof settingsSchema>

const defaultValues: SettingsValues = {
  baseUrl: "",
  itemsPerPage: 10,
  apiKey: "nothing",
  theme: "light",
}

export default function SettingsForm() {
  const config = useConfiguration()
  const [isPending, setIsPending] = useState(false)

  const form = useForm<SettingsValues>({
    defaultValues,
  })

  useEffect(() => {
    form.reset({
      baseUrl: config.configuration.apiBaseUrl,
      itemsPerPage: config.configuration.numberOfItemsPerPage,
      apiKey: config.configuration.apiKey,
      theme: config.configuration.theme as "light" | "dark" | "system",
    })
  }, [config.configuration, form])

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors()

    const parsed = settingsSchema.safeParse(values)
    if (!parsed.success) {
      const zodErrors = parsed.error.flatten().fieldErrors

      if (zodErrors.baseUrl?.[0]) {
        form.setError("baseUrl", { message: zodErrors.baseUrl[0] })
      }
      if (zodErrors.itemsPerPage?.[0]) {
        form.setError("itemsPerPage", { message: zodErrors.itemsPerPage[0] })
      }
      if (zodErrors.apiKey?.[0]) {
        form.setError("apiKey", { message: zodErrors.apiKey[0] })
      }
      if (zodErrors.theme?.[0]) {
        form.setError("theme", { message: zodErrors.theme[0] })
      }

      return
    }

    setIsPending(true)

    try {
      const currenrConfig = await config.configuration
      currenrConfig.apiBaseUrl = parsed.data.baseUrl
      currenrConfig.numberOfItemsPerPage = parsed.data.itemsPerPage
      currenrConfig.apiKey = parsed.data.apiKey
      currenrConfig.theme = parsed.data.theme
      config.setConfiguration({ ...currenrConfig })

      toast.info("Your application settings have been successfully updated.")
    } catch {
      toast.error("There was a problem updating your settings.")
    } finally {
      setIsPending(false)
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit} className="m-4 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure the general settings for your application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              control={form.control}
              name="baseUrl"
              label="Base URL"
              description="The base URL for your application."
              placeholder="https://example.com"
            />

            <FormInput
              control={form.control}
              name="itemsPerPage"
              label="Items Per Page"
              description="The number of items to display per page (max 100)."
              type="number"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Configure your API settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              control={form.control}
              name="apiKey"
              label="API Key"
              description="Your API key for accessing external services."
              type="password"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the appearance of your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormSelect
              control={form.control}
              name="theme"
              label="Theme"
              description="Choose the theme for your application."
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </FormSelect>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Settings"}
        </Button>
      </form>
    </>
  )
}
