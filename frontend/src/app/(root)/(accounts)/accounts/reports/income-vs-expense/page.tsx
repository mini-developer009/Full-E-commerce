"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const summary = {
  totalIncome: 10450,
  totalExpense: 5100,
};

const breakdown = [
  { label: "Product Sales", amount: 7500, type: "income" },
  { label: "Service Fees", amount: 2950, type: "income" },
  { label: "Salaries", amount: 3000, type: "expense" },
  { label: "Utilities", amount: 1200, type: "expense" },
  { label: "Delivery", amount: 900, type: "expense" },
];

export default function IncomeVsExpensePage() {
  return (
    <div className="p-6 w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">আয় বনাম ব্যয়</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-semibold">মোট আয়</span>
            <Badge variant="outline" className="text-green-700 border-green-500/30">
              Income
            </Badge>
          </div>
          <div className="text-3xl font-bold text-green-700">
            ৳ {summary.totalIncome.toLocaleString()}
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-semibold">মোট ব্যয়</span>
            <Badge variant="outline" className="text-red-700 border-red-500/30">
              Expense
            </Badge>
          </div>
          <div className="text-3xl font-bold text-red-600">
            ৳ {summary.totalExpense.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ভিজ্যুয়াল তুলনা</h3>
        <div className="h-52 w-full flex items-center justify-center text-muted-foreground text-sm bg-muted rounded-md">
          {/* Later you can add Recharts / ApexCharts */}
          Chart Preview Here (Bar / Line)
        </div>
      </Card>

      {/* Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">বিবরণ</h3>
        <div className="space-y-3">
          {breakdown.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-2"
            >
              <span>{item.label}</span>
              <span
                className={cn(
                  "font-semibold",
                  item.type === "income" ? "text-green-700" : "text-red-600"
                )}
              >
                ৳ {item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Separator className="my-4" />

      {/* Net Summary */}
      <div className="text-right text-sm text-muted-foreground">
        মোট ব্যালেন্স:{" "}
        <span
          className={cn(
            "text-base font-semibold",
            summary.totalIncome - summary.totalExpense >= 0
              ? "text-green-700"
              : "text-red-600"
          )}
        >
          ৳ {(summary.totalIncome - summary.totalExpense).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
