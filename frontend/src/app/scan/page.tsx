"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Link2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ScannerConnectorPage = () => {
    const [token, setToken] = useState("");
    const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "failed">("idle");

    const handleConnect = () => {
        if (!token.trim()) return;
        setStatus("connecting");

        // Simulated connection delay
        setTimeout(() => {
            if (token === "scanner123") {
                setStatus("connected");
            } else {
                setStatus("failed");
            }
        }, 1500);
    };

    const renderStatus = () => {
        switch (status) {
            case "connected":
                return (
                    <Alert variant="default" className="border-green-500 bg-green-50">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <AlertTitle className="text-green-700">Connected!</AlertTitle>
                        <AlertDescription>
                            Scanner is successfully connected. You can start scanning items.
                        </AlertDescription>
                    </Alert>
                );
            case "failed":
                return (
                    <Alert variant="destructive">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle>Connection Failed</AlertTitle>
                        <AlertDescription>
                            Invalid token. Please check and try again.
                        </AlertDescription>
                    </Alert>
                );
            case "connecting":
                return (
                    <Alert variant="default">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <AlertTitle>Connecting...</AlertTitle>
                        <AlertDescription>
                            Attempting to connect to the scanner...
                        </AlertDescription>
                    </Alert>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-muted flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-6 shadow-lg border">
                <CardHeader>
                    <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
                        <Link2 className="h-5 w-5 text-primary" />
                        Connect to Scanner
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="scanner-token" className="text-sm font-medium">
                            Enter Scanner Token
                        </label>
                        <Input
                            id="scanner-token"
                            placeholder="e.g., scanner123"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            disabled={status === "connecting"}
                        />
                    </div>

                    <Button
                        onClick={handleConnect}
                        className="w-full"
                        disabled={status === "connecting" || !token.trim()}
                    >
                        {status === "connecting" ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            "Connect"
                        )}
                    </Button>

                    {renderStatus()}
                </CardContent>
            </Card>
        </div>
    );
};

export default ScannerConnectorPage;
