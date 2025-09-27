'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';

export default function AccountCreatePage() {
  const t = useTranslations('global');

  return (
    <main className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl">
        
        <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
          <CardTitle className="text-xl font-bold text-primary">
            {t('add-new', { title: t('account') })}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
          <form className="space-y-10 w-full">

            {/* Account Info Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('account-details')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={t('account-title')} id="account-title" />
                <Field label={t('initial-balance')} id="initial-balance" type="number" />
                <Field label={t('account-number')} id="account-number" />
                <Field label={t('contact-person')} id="contact-person" />
                <Field label={t('phone-number')} id="phone" />
              </div>

              <div className="pt-6">
                <Label htmlFor="description" className="mb-1 block">
                  {t('account-description')} <span className="text-muted-foreground text-sm">(optional)</span>
                </Label>
                <Textarea id="description" rows={4} placeholder={t('write-description')} />
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" size="lg" className="px-10 w-full">
                {t('save', { title: t('account') })}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

// Reusable Field Component
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
