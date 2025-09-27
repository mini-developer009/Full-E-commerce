"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const profitItems = [
  { title: "মোট বিক্রয়", amount: 42757.5, type: "positive", icon: "💰" },
  { title: "মোট ক্রয় মুল্য", amount: 40100, type: "neutral", icon: "🛒" },
  { title: "মোট জমা", amount: 5190.0, type: "positive", icon: "📥" },
  { title: "মোট বাকি", amount: 53867.5, type: "warning", icon: "🕒" },
  { title: "মোট ইনকাম", amount: 5190.0, type: "positive", icon: "📈" },
  { title: "মোট খরচ", amount: 5100.0, type: "negative", icon: "💸" },
  { title: "মোট ব্যালেন্স", amount: 90, type: "neutral", icon: "🏦" },
  { title: "গ্রস প্রফিট", amount: 2657.5, type: "positive", icon: "📊" },
  { title: "নেট প্রফিট", amount: -2442.5, type: "negative", icon: "📉" },
];

export default function ProfitSummaryPage() {
  const total = profitItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="p-6 w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">লাভের সারসংক্ষেপ</h2>
        <Badge variant="outline" className="text-sm mt-2 md:mt-0">
          মোট: ৳ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profitItems.map((item, idx) => (
          <Card
            key={idx}
            className={cn(
              "p-5 rounded-lg border transition-all hover:shadow-md",
              item.type === "positive" && "border-green-400/40",
              item.type === "negative" && "border-red-400/40",
              item.type === "warning" && "border-yellow-400/40"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{item.icon}</span>
              {item.type === "positive" && (
                <Badge variant="outline" className="text-green-700 border-green-500/30">
                  আয়
                </Badge>
              )}
              {item.type === "negative" && (
                <Badge variant="outline" className="text-red-700 border-red-500/30">
                  ব্যয়
                </Badge>
              )}
              {item.type === "warning" && (
                <Badge variant="outline" className="text-yellow-700 border-yellow-500/30">
                  বাকি
                </Badge>
              )}
            </div>
            <div className="text-muted-foreground text-sm">{item.title}</div>
            <div
              className={cn(
                "text-2xl font-bold mt-1",
                item.amount < 0 ? "text-red-600" : "text-foreground"
              )}
            >
              {item.amount < 0 ? "-৳" : "৳"}{" "}
              {Math.abs(item.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="text-right text-sm text-muted-foreground">
        সর্বমোট সমন্বয়:{" "}
        <span className="text-base font-semibold text-primary">
          ৳ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
