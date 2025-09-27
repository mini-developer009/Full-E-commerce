import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        id: 'free',
        title: 'Free',
        price: '$0',
        description: 'You are currently on the v0 Free plan. Upgrade or start a new plan for monthly credit limits.',
        features: [
            'Basic access',
            'Limited usage credits',
            'Community support',
        ],
        cta: 'Current Plan',
        disabled: true,
    },
    {
        id: 'premium',
        title: 'Premium',
        price: '$20/month',
        description: '$20 of usage credit per month',
        features: [
            'Purchase additional credits',
            'Unlimited projects',
            'Access to v0-1.5-lg and v0 API',
        ],
        cta: 'Upgrade to Premium',
    },
    {
        id: 'team',
        title: 'Team',
        price: 'Custom',
        description: 'For teams that need collaboration features',
        features: [
            'Team management tools',
            'Usage analytics',
            'Shared projects',
        ],
        cta: 'Contact Sales',
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        price: 'Custom',
        description: 'Custom solutions and support for enterprises',
        features: [
            'Dedicated support',
            'SLAs and custom deployment',
            'Onboarding assistance',
        ],
        cta: 'Talk to Us',
    },
];

const UpgradePlan = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="max-w-4xl p-6 sm:p-10 rounded-3xl bg-background shadow-2xl">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                        Choose Your Plan
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                        Select the best plan that fits your needs. Upgrade anytime.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="premium" className="w-full">
                    <TabsList className='mb-4'>
                        {plans.map(plan => (
                            <TabsTrigger
                                key={plan.id}
                                value={plan.id}

                            >
                                {plan.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {plans.map(plan => (
                        <TabsContent key={plan.id} value={plan.id} className="mt-0">
                            <Card className="border rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between w-full">
                                        <CardTitle className="text-2xl font-bold text-foreground">
                                            {plan.title}
                                        </CardTitle>
                                        <span className="text-xl font-bold text-primary">
                                            {plan.price}
                                        </span>
                                    </div>
                                    <CardDescription className="text-base text-muted-foreground">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="py-5">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-3 text-base text-foreground">
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="flex justify-end pt-2">
                                    <Button
                                        variant={plan.disabled ? "outline" : "default"}
                                        disabled={plan.disabled}
                                        className="text-sm font-medium px-6 py-2.5 rounded-lg"
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default UpgradePlan;
