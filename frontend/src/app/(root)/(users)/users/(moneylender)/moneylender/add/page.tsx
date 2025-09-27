'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function MoneylenderCreatePage() {
  const t = useTranslations('global');
  const tn = useTranslations('nav');
  const [active, setActive] = useState(true);

  return (
    <main className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl">
        <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
          <CardTitle className="text-xl font-bold text-primary">
            {t('create-new', { title: tn('moneylender') })}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
          <form className="space-y-10 w-full">

            {/* Personal Info Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('personal-info')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={tn('moneylender')} id="name" placeholder={t('full-name')} />
                <Field label={t('fathers-name')} id="father" />
                <Field label={t('mothers-name')} id="mother" />
                <Field label={t('dob')} id="dob" type="date" placeholder={t('dob-placeholder')} />
                <Field label={t('reference')} id="reference" required={false} />
              </div>
            </section>

            {/* Store Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('Store-details')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('Store-name')} id="Store" />
                <Field label={t('previous-due')} id="previous-due" />
                <Field label={t('max-due-limit')} id="due-limit" required={false} />
              </div>
            </section>

            {/* Contact Info Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('contact-info')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('email')} id="email" type="email" />
                <Field label={t('phone-number')} id="phone" />
                <Field label={t('phone-optional')} id="phone2" required={false} />
                <Field label={t('address')} id="address" />
                <Field label={t('upzilla')} id="upzilla" />
                <Field label={t('zip-code')} id="zip" />
                <div className="md:col-span-3">
                  <Field label={t('street-road')} id="street" />
                </div>
              </div>
            </section>

     

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" size="lg" className="px-10 w-full">
                {t('save', { title: tn('moneylender') })}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

// Reusable Field component
function Field({
  label,
  id,
  type = 'text',
  placeholder = '',
  required = true
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1 block">
        {label}
        {required ? (
          <span className="text-red-500"> *</span>
        ) : (
          <span className="text-muted-foreground text-sm"> (optional)</span>
        )}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full"
        required={required}
      />
    </div>
  );
}
