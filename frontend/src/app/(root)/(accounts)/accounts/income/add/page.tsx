'use client';

import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function AddDepositPage() {
    // Sample dummy data for selects
    const clients = [
        { id: 'client-1', name: 'মোঃ রফিক' },
        { id: 'client-2', name: 'শিমুল রহমান' },
    ];

    const invoices = [
        { id: 'inv-1', label: 'Invoice #1001' },
        { id: 'inv-2', label: 'Invoice #1002' },
    ];

    const accounts = ['AIBL', 'DBBL', 'Bkash'];

    const depositTypes = ['Cash', 'Gold', 'বাকি আদায়'];

    const subCategories = ['Sub Cat 1', 'Sub Cat 2', 'Sub Cat 3'];

    const paymentMethods = ['Cash', 'Check', 'Online'];

    const banks = ['AIBL', 'DBBL', 'BRAC', 'IFIC'];

    // Form state
    const [formData, setFormData] = useState({
        client: '',
        invoice: '',
        date: '',
        account: '',
        description: '',
        amount: '',
        depositType: '',
        subCategory: '',
        paymentMethod: '',
        bank: '',
        checkNo: '',
        sendSMS: false,
        sendEmail: false,
    });

    // Handle input change helper
    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted deposit:', formData);
        alert('জমা সফলভাবে যুক্ত হয়েছে!');
        // Add your API submission logic here
    };

    return (
        <main className="p-4 min-h-screen">
            <Card className="w-full mx-auto rounded-2xl">
                <CardHeader className="px-6 py-4 border-b">
                    <CardTitle className="text-xl font-bold">নতুন জমা যুক্ত করুন</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* 1. Select Client */}
                        <div>
                            <Label htmlFor="client">ক্লায়েন্ট নির্বাচন করুন</Label>
                            <Select
                                value={formData.client}
                                onValueChange={val => handleChange('client', val)}
                            >
                                <SelectTrigger id="client" className="w-full">
                                    <SelectValue placeholder="ক্লায়েন্ট নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 2. Choose Invoice */}
                        <div>
                            <Label htmlFor="invoice">ইনভয়েস নির্বাচন করুন</Label>
                            <Select
                                value={formData.invoice}
                                onValueChange={val => handleChange('invoice', val)}
                            >
                                <SelectTrigger id="invoice" className="w-full">
                                    <SelectValue placeholder="ইনভয়েস নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {invoices.map(i => (
                                        <SelectItem key={i.id} value={i.id}>{i.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. Date */}
                        <div>
                            <Label htmlFor="date">তারিখ</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={e => handleChange('date', e.target.value)}
                            />
                        </div>

                        {/* 4. Select Account */}
                        <div>
                            <Label htmlFor="account">অ্যাকাউন্ট নির্বাচন করুন</Label>
                            <Select
                                value={formData.account}
                                onValueChange={val => handleChange('account', val)}
                            >
                                <SelectTrigger id="account" className="w-full">
                                    <SelectValue placeholder="অ্যাকাউন্ট নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map(acc => (
                                        <SelectItem key={acc} value={acc}>{acc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 5. জমা বর্ণনা সংক্ষিপ্ত নোট */}
                        <div>
                            <Label htmlFor="description">জমা বর্ণনা (সংক্ষিপ্ত নোট)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                                placeholder="সংক্ষিপ্ত নোট লিখুন"
                                rows={3}
                            />
                        </div>

                        {/* 6. Amount */}
                        <div>
                            <Label htmlFor="amount">জমার পরিমাণ</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                value={formData.amount}
                                onChange={e => handleChange('amount', e.target.value)}
                                placeholder="পরিমাণ লিখুন"
                            />
                        </div>

                        {/* 7. জমা খাত */}
                        <div>
                            <Label htmlFor="depositType">জমা খাত নির্বাচন করুন</Label>
                            <Select
                                value={formData.depositType}
                                onValueChange={val => handleChange('depositType', val)}
                            >
                                <SelectTrigger id="depositType" className="w-full">
                                    <SelectValue placeholder="জমা খাত নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {depositTypes.map(dt => (
                                        <SelectItem key={dt} value={dt}>{dt}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 8. Select Sub Categories */}
                        <div>
                            <Label htmlFor="subCategory">সাব-ক্যাটাগরি নির্বাচন করুন</Label>
                            <Select
                                value={formData.subCategory}
                                onValueChange={val => handleChange('subCategory', val)}
                            >
                                <SelectTrigger id="subCategory" className="w-full">
                                    <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories.map(sc => (
                                        <SelectItem key={sc} value={sc}>{sc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 9. Select Payment Method */}
                        <div>
                            <Label htmlFor="paymentMethod">পেমেন্ট পদ্ধতি নির্বাচন করুন</Label>
                            <Select
                                value={formData.paymentMethod}
                                onValueChange={val => handleChange('paymentMethod', val)}
                            >
                                <SelectTrigger id="paymentMethod" className="w-full">
                                    <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentMethods.map(pm => (
                                        <SelectItem key={pm} value={pm}>{pm}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 10. Select Bank */}
                        <div>
                            <Label htmlFor="bank">ব্যাংক নির্বাচন করুন</Label>
                            <Select
                                value={formData.bank}
                                onValueChange={val => handleChange('bank', val)}
                            >
                                <SelectTrigger id="bank" className="w-full">
                                    <SelectValue placeholder="ব্যাংক নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {banks.map(bank => (
                                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 11. চেক নং */}
                        <div>
                            <Label htmlFor="checkNo">চেক নং</Label>
                            <Input
                                id="checkNo"
                                type="text"
                                value={formData.checkNo}
                                onChange={e => handleChange('checkNo', e.target.value)}
                                placeholder="চেক নম্বর লিখুন"
                            />
                        </div>

                        {/* Send Message by SMS / Email */}
                        <div className="flex items-center space-x-8 mt-6">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="sendSMS" className="mb-0">এসএমএস পাঠান</Label>
                                <Switch
                                    id="sendSMS"
                                    checked={formData.sendSMS}
                                    onCheckedChange={val => handleChange('sendSMS', val)}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="sendEmail" className="mb-0">ইমেইল পাঠান</Label>
                                <Switch
                                    id="sendEmail"
                                    checked={formData.sendEmail}
                                    onCheckedChange={val => handleChange('sendEmail', val)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t flex justify-end">
                            <Button type="submit" size="lg" className="px-10">
                                জমা করুন
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
