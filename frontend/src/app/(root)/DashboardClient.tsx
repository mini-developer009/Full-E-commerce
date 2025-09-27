import React from 'react'
import AnalyticsMiniCard from '@/components/others/forDashboard/AnalyticsMiniCard';
import { MounthyReviewChart } from '@/components/others/forDashboard/MounthyReviewChart';
import PriceTotalMiniCard from '@/components/others/forDashboard/PriceTotalMiniCard'
import { ProfitChartCard } from '@/components/others/forDashboard/ProfitChartCard'
import { WeeklySalesChart } from '@/components/others/forDashboard/WeeklySalesChart';
import { Separator } from '@/components/ui/separator';
import convertDigits from '@/lib/functions';
import { useTranslations } from 'next-intl';

const DashboardClient = () => {
  const t = useTranslations('HomePage');
  const tg = useTranslations('global');
  const tn = useTranslations('nav');


  return (
    <div className="w-full px-2 md:px-4 py-4 space-y-6">

      {/* Chart and Summary Section */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="col-span-1 xl:col-span-2 w-full space-y-6">
          <div className='aspect-video'>
            <ProfitChartCard title={t('Profit-amount-title')} amount={convertDigits('234', 'bn')} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6">
            <AnalyticsMiniCard
              title={tg('suppliers')}
              count={0}
              iconUrl="/icons/suppliers.png"
              date="2023-10-01"
              percentageChange="+5%"
              backgroundColor="bg-gradient-to-r from-indigo-500 to-purple-600"
            />
            <AnalyticsMiniCard
              title={tn('customers')}
              count={0}
              iconUrl="/icons/total-customers.png"
              date="2023-10-01"
              percentageChange="+8%"
              backgroundColor="bg-gradient-to-r from-green-500 to-teal-600"
            />
            <AnalyticsMiniCard
              title={tg('sales') + " " + tg('invoice')}
              count={0}
              iconUrl="/icons/nvoice-bill-finance.webp"
              date="2023-10-01"
              percentageChange="-2%"
              backgroundColor="bg-gradient-to-r from-orange-500 to-red-600"
            />
            <AnalyticsMiniCard
              title={tg('purchase') + " " + tg('invoice')}
              count={0}
              iconUrl="/icons/purchase-invoice.png"
              date="2023-10-01"
              percentageChange="+12%"
              backgroundColor="bg-gradient-to-r from-yellow-500 to-red-600"
            />
          </div>

          <div>
            <MounthyReviewChart />
          </div>

        </div>

        {/* Summary Cards */}
        <div className="col-span-1 xl:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 w-full">
            <PriceTotalMiniCard
              title={t('total-sales')}
              value={1000}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/daily-sale.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('total-expenses')}
              value={500}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/total-expense.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('total-profit')}
              value={500}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/due.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('total-customers')}
              value={150}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="/icons/total-customers.png"
              isSymbleActive={false}
            />
            <PriceTotalMiniCard
              title={t('total-orders')}
              value={75}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="/icons/order-icon.png"
              isSymbleActive={false}
            />
            <PriceTotalMiniCard
              title={t('total-products')}
              value={200}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="/icons/product-profit.png"
              isSymbleActive={false}
            />
          </div>

          <Separator className='my-6' />
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 w-full">
            <PriceTotalMiniCard
              title={t('stock-value')}
              value={1000}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/shopping-cart.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('todays-sales')}
              value={500}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/total-expense.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('client-previous-due')}
              value={500}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/due.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('receive')}
              value={150}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/deposit.png"
              isSymbleActive={false}
            />
            <PriceTotalMiniCard
              title={t('todays-expense')}
              value={75}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/daily-expense.png"
              isSymbleActive
            />
            <PriceTotalMiniCard
              title={t('balance')}
              value={200}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/money-bag.png"
              isSymbleActive
            />
          </div>

          <Separator className='my-6' />
          <WeeklySalesChart />
        </div>
      </div>
    </div>
  )
}

export default DashboardClient