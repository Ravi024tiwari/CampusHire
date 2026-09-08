import { redirect } from 'next/navigation';

export default async function TpoRecruiterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/tpo/companies/${id}`);
}
