// app/users/page.tsx

import { redirect } from 'next/navigation'

export default function UsersPage() {
  redirect('/users/customers')
}
