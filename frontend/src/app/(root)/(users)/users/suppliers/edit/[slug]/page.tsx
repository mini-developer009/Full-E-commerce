"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SupplierCreatePage() {
  const [active, setActive] = useState(true);

  return (
    <div className="w-full mx-auto p-4">
      <Card>
        <CardContent className="grid gap-6 py-6">
          <h2 className="text-xl font-semibold">Edit Supplier</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Supplier Name</Label>
              <Input placeholder="Enter supplier name" />
            </div>

            <div>
              <Label>Store Name</Label>
              <Input placeholder="Enter Store name" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input placeholder="Enter phone number" />
            </div>

            <div>
              <Label>Phone (Optional)</Label>
              <Input placeholder="Enter optional phone number" />
            </div>

            <div>
              <Label>E-mail</Label>
              <Input placeholder="Enter email address" type="email" />
            </div>

            <div>
              <Label>Previous Due</Label>
              <Input placeholder="Enter previous due amount" type="number" />
            </div>

            <div className="col-span-2">
              <Label>Address</Label>
              <Textarea placeholder="Enter full address" />
            </div>

            <div>
              <Label>City</Label>
              <Input placeholder="Enter city" />
            </div>

            <div>
              <Label>Zip Code</Label>
              <Input placeholder="Enter zip code" />
            </div>

            <div>
              <Label>Country</Label>
              <Input value="Bangladesh (বাংলাদেশ)" readOnly />
            </div>

            <div>
              <Label>Domain</Label>
              <Input placeholder="Enter domain name" />
            </div>

            <div className="col-span-2">
              <Label>Bank Account</Label>
              <Input placeholder="Enter bank account details" />
            </div>

            <div className="col-span-2">
              <Label>Document (Optional)</Label>
              <Input type="file" />
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={active} onCheckedChange={setActive} />
              <Label>Active</Label>
            </div>

            <div className="col-span-2">
              <Button className="w-full">Save Supplier</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
