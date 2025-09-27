'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SupplierCreatePage() {
  const [active, setActive] = useState(true);
  const t = useTranslations("global");

  return (
    <div className="p-4 min-h-screen">
      <Card className="w-full max-w-full mx-auto rounded-2xl">
        <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
          <CardTitle className="text-xl font-bold text-primary">
            {t("create-new", { title: t("supplier") })}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label={t("supplier-name")} placeholder={t("enter-supplier-name")} required />
            <Field label={t("Store-name")} placeholder={t("enter-Store-name")} required />
            <Field label={t("phone")} placeholder={t("enter-phone")} required />
            <Field label={t("phone-optional")} placeholder={t("enter-optional-phone")} required={false} />
            <Field label={t("email")} placeholder={t("enter-email")} type="email" required />
            <Field label={t("previous-due")} placeholder={t("enter-previous-due")} type="number" required />

            <div className="col-span-2">
              <Label>
                {t("address")}
                <RequiredMark />
              </Label>
              <Textarea placeholder={t("enter-address")} required />
            </div>

            <Field label={t("city")} placeholder={t("enter-city")} required />
            <Field label={t("zip-code")} placeholder={t("enter-zip-code")} required />

            <div>
              <Label>
                {t("country")}
                <RequiredMark />
              </Label>
              <Input value={t("bangladesh")} readOnly />
            </div>

            <Field label={t("domain")} placeholder={t("enter-domain")} required />

            <div className="col-span-2">
              <Field label={t("bank-account")} placeholder={t("enter-bank-account")} required />
            </div>

            <div className="col-span-2">
              <Label>
                {t("document-optional")}
                <OptionalMark />
              </Label>
              <Input type="file" />
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={active} onCheckedChange={setActive} />
              <Label>{t("active")}</Label>
            </div>

            <div className="col-span-2">
              <Button className="w-full">
                {t("save", { title: t("supplier") })}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required ? <RequiredMark /> : <OptionalMark />}
      </Label>
      <Input type={type} placeholder={placeholder} required={required} className="w-full" />
    </div>
  );
}

function RequiredMark() {
  return <span className="text-red-500 ml-1">*</span>;
}

function OptionalMark() {
  return <span className="text-muted-foreground text-sm ml-1">(optional)</span>;
}
