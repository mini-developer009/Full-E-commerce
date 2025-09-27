"use client";

import { useState, useTransition } from "react";
import { forgotPasswordAction } from "@/app/actions/auth/forgot-password";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await forgotPasswordAction(formData);
            setMessage(result.message);
            setSuccess(result.success);
        });
    }

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forgot your password?</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email and we’ll send you reset instructions.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                {message && (
                    <p
                        className={`text-sm text-center ${success ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Reset Link"}
                </Button>
            </div>

            <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                    Back to login
                </Link>
            </div>
        </form>
    );
}
