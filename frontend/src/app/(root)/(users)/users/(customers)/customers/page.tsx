
import React from 'react'
import { ClientTable } from './components/ClientTable'
import { Card } from '@/components/ui/card'


const ClientPage = () => {

  return (
    <div className="w-full p-4 space-y-6">

      {/* Client Table */}
      <Card className="p-6 w-full h-full shadow-sm border border-muted-foreground/10">
        <ClientTable />
      </Card>
    </div>
  )
}

export default ClientPage
