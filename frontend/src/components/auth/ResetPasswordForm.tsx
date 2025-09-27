"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/app/actions/auth/resetPassword";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const params = useSearchParams();

    const email = params.get("email") || "";
    const token = params.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setSuccess(false);
            return;
        }

        startTransition(async () => {
            const result = await resetPasswordAction(email, token, password);
            setMessage(result.message || null);
            setSuccess(result.success);

            if (result.success) {
                router.push("/login");
            }
        });
    }

    return (
        <form className={cn("flex flex-col gap-6 max-w-md mx-auto", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Your Password</h1>
                <p className="text-sm text-muted-foreground">
                    Enter a new password for your account
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            {message && (
                <p className={`text-sm text-center ${success ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Password"}
            </Button>
        </form>
    );
}
