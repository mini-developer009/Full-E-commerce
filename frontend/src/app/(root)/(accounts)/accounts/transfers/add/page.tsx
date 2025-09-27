'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

export default function TransferCreatePage() {
  const t = useTranslations('global');

  // Example accounts and options, replace with your real data if needed
  const accounts = ['AIBL', 'DBBL', 'CASH', 'BKASH'];
  const paymentMethods = ['Cash', 'Bank Transfer', 'Mobile Payment'];

  // State hooks for form fields
  const [fromAccount, setFromAccount] = useState<string | undefined>(undefined);
  const [toAccount, setToAccount] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [tags, setTags] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [reference, setReference] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Add your submit logic here
    console.log({
      fromAccount,
      toAccount,
      date,
      description,
      amount,
      tags,
      paymentMethod,
      reference,
    });
  }

  return (
    <main className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl">
        <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
          <CardTitle className="text-xl font-bold text-primary">
            {t('new-transfer')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* From Account */}
            <div>
              <Label className="mb-1 block">{t('select-from-account')}</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('select-account')} />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc} value={acc}>
                      {acc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Account */}
            <div>
              <Label className="mb-1 block">{t('select-to-account')}</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('select-account')} />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc} value={acc}>
                      {acc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date" className="mb-1 block">{t('date')}</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-1 block">{t('description')}</Label>
              <Textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('write-description')}
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="mb-1 block">{t('amount')}</Label>
              <Input
                id="amount"
                type="number"
                min={0}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="mb-1 block">{t('tags')}</Label>
              <Select value={tags} onValueChange={setTags}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('select-tag')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="mb-1 block">{t('payment-method')}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('select-payment-method')} />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reference */}
            <div>
              <Label htmlFor="reference" className="mb-1 block">{t('reference')}</Label>
              <Input
                id="reference"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder={t('enter-reference')}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" size="lg" className="px-10 w-full">
                {t('submit-transfer')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
