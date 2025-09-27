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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function MortgageProductCreatePage() {
  const tg = useTranslations('global');
  const tn = useTranslations('nav');
  const t = useTranslations('mortgages');
  const [unit, setUnit] = useState('');
  const [group, setGroup] = useState('');
  const [warehouse, setWarehouse] = useState('');

  return (
    <main className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl p-6">
        <CardHeader className="border-b bg-card rounded-t-2xl px-0">
          <CardTitle className="text-xl font-bold text-primary">
            {tn('mortgage-product-create')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-0 py-8  rounded-b-2xl">
          <form className="space-y-10 w-full">

            {/* Product Info */}
            <section>
        
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('product-name')} id="name" />
                <Field label={t('buying-price')} id="buying-price" type="number" />
                <Field label={t('weight')} id="weight" type="number" />
                <Field label={t('selling-price')} id="selling-price" type="number" />
                <Field label={t('vori')} id="vori" type="number" />
                <Field label={t('purity')} id="purity" type="number" />
                <Field label={t('wholesale-price')} id="wholesale-price" type="number" />
                <Field label={t('opening-stock')} id="opening-stock" type="number" />
                <Field label={t('barcode-number')} id="barcode" />
                <Field label={t('carton')} id="carton" type="number" />
                <Field label={t('stock-warning-quantity')} id="stock-warning" type="number" />
                <div>
                  <Label htmlFor="unit">{t('select-unit')}</Label>
                  <Select onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-unit')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="vori">Vori</SelectItem>
                      <SelectItem value="pcs">PCS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* File Upload and Description */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('additional-info')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label={t('upload-image')} id="image" type="file" required={false} />
                <div className="md:col-span-3">
                  <Field label={t('description')} id="description" type="textarea" required={false} />
                </div>
              </div>
            </section>

            {/* Group & Warehouse Selection */}
            <section>
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('associations')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>{t('select-product-group')}</Label>
                  <Select onValueChange={setGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-product-group')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('select-warehouse')}</Label>
                  <Select onValueChange={setWarehouse}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-warehouse')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Dhaka</SelectItem>
                      <SelectItem value="chittagong">Chittagong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" size="lg" className="px-10 w-full">
                {tg('save', { title: tg('product') })}
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
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full"
          required={required}
        />
      )}
    </div>
  );
}
