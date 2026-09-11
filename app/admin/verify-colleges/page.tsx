import { redirect } from 'next/navigation';

export default function VerifyCollegesRedirectPage() {
  redirect('/admin/verification-queue');
}

