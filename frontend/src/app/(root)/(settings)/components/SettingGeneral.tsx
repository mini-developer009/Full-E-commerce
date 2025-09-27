import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const SettingGeneral = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>সাধারণ সেটিংস</CardTitle>
                    <CardDescription>
                        সিস্টেমের সাধারণ সেটিংস কনফিগার করুন।
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>ইনভয়েস হেডার (কাস্টম)</Label>
                        <Textarea placeholder="আপনার ইনভয়েস হেডার লিখুন..." />
                    </div>

                    <div className="space-y-2">
                        <Label>মেনু আকার</Label>
                        <RadioGroup defaultValue="large">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="large" id="large" />
                                <Label htmlFor="large">বড়</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="small" id="small" />
                                <Label htmlFor="small">ছোট</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default SettingGeneral