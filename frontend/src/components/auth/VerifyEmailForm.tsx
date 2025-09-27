"use client";

import { useFormState } from "react-dom";
import { verifyEmailAction } from "@/app/actions/auth/verify-email";
import { resendEmailVerificationAction } from "@/app/actions/auth/resend-verification";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function VerifyEmailForm() {
    const router = useRouter();
    const [state, formAction] = useFormState(verifyEmailAction, {
        success: false,
        message: "",
    });

    const [resendMsg, setResendMsg] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const emailRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (state.success) {
            router.push("/login");
        }
    }, [state.success, router]);

    useEffect(() => {
        if (resendMsg) {
            const timer = setTimeout(() => setResendMsg(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [resendMsg]);

    const handleResend = () => {
        const email = emailRef.current?.value;

        if (!email) {
            setResendMsg("Please enter your email first.");
            return;
        }

        setResendMsg(null);

        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", email);

            const res = await resendEmailVerificationAction(formData);
            setResendMsg(res.message);
        });
    };

    return (
        <form action={formAction} className="space-y-6 max-w-sm mx-auto mt-10">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">Verify Your Email</h2>
                <p className="text-muted-foreground text-sm">
                    Enter your email and the verification code you received.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        ref={emailRef}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="token">Verification Code</Label>
                    <Input id="token" name="token" placeholder="6-digit code" required />
                </div>

                {state.message && (
                    <p
                        className={`text-sm text-center ${state.success ? "text-green-500" : "text-red-500"}`}
                    >
                        {state.message}
                    </p>
                )}

                {resendMsg && (
                    <p className="text-sm text-center text-blue-500">{resendMsg}</p>
                )}

                <Button type="submit" className="w-full">
                    Verify
                </Button>

                <Button
                    type="button"
                    onClick={handleResend}
                    variant="outline"
                    className="w-full"
                    disabled={isPending || !isValidEmail(email)}
                >
                    {isPending ? "Resending..." : "Resend Code"}
                </Button>
            </div>
        </form>
    );
}
