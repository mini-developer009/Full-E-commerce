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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { createCustomerAction } from '@/app/actions/customers/customerActions';

export default function CreateCustomarPage() {
  const t = useTranslations('global');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('status', active ? 'ACTIVE' : 'INACTIVE');

    console.log(formData);
    
    try {
      const res = await createCustomerAction(formData);
      console.log("res", res);
      
      if (res.success) {
        toast.success(res.message || 'Customer created successfully');
        e.currentTarget.reset();
      } else {
        toast.error(res.message || 'Failed to create customer');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl">
        <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
          <CardTitle className="text-xl font-bold text-primary">
            {t('create-new', { title: t('client') })}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
          <form onSubmit={handleSubmit} className="space-y-10 w-full">

            {/* Personal Info Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('personal-info')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('client-name')} id="name" placeholder={t('full-name')} />
                <Field label={t('fathers-name')} id="fatherName" />
                <Field label={t('mothers-name')} id="motherName" />
                <Field label={t('dob')} id="dateOfBirth" type="date" placeholder={t('dob-placeholder')} />
                <Field label={t('reference')} id="Ref" required={false} />
              </div>
            </section>

            {/* Store Section */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('Store-details')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('Store-name')} id="shopName" />
                <Field label={t('max-due-limit')} id="DueLimit" required={false} />
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
                <Field label={t('address')} id="address" />
                <Field label={t('upzilla')} id="upazilla" />
                <Field label={t('zip-code')} id="zipCode" />
                <div className="md:col-span-3">
                  <Field label={t('street-road')} id="road" required={false} />
                </div>
              </div>
            </section>

            {/* Other Options */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('other-details')}
              </h2>
              <div className="flex items-center gap-2 pt-6">
                <Switch checked={active} onCheckedChange={setActive} />
                <Label>{t('active')}</Label>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" size="lg" className="px-10 w-full" disabled={loading}>
                {loading ? t('saving') + '...' : t('save', { title: t('client') })}
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
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full"
        required={required}
      />
    </div>
  );
}
