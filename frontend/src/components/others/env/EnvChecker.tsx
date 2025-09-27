export const requiredEnvVars = ["NEXT_PUBLIC_SITE_NAME", "APP_VERSION"]
export const envErrors = requiredEnvVars.filter((key) => !process.env[key])

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function EnvChecker() {
  const allEnvVarsPresent = envErrors.length === 0

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Environment Variables</CardTitle>
              <Badge
                variant={allEnvVarsPresent ? "secondary" : "destructive"}
                className={cn(
                  "px-3 py-1",
                  allEnvVarsPresent ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "",
                )}
              >
                {allEnvVarsPresent ? "All Set" : `${envErrors.length} Missing`}
              </Badge>
            </div>
            <CardDescription>Required environment variables for your application</CardDescription>
          </CardHeader>
          <CardContent>
            {allEnvVarsPresent ? (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-100 dark:border-green-800"
              >
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>All environment variables are set</AlertTitle>
                <AlertDescription>Your application has all the required environment variables.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Missing environment variables</AlertTitle>
                  <AlertDescription>
                    Please set the following variables in your{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">.env</code> file:
                  </AlertDescription>
                </Alert>

                <div className="rounded-md border p-4 bg-background">
                  <ul className="space-y-2 list-disc pl-5">
                    {envErrors.map((key) => (
                      <li key={key} className="text-sm">
                        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">{key}</code>
                        <span className="ml-2 text-muted-foreground">is missing</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  )
}
