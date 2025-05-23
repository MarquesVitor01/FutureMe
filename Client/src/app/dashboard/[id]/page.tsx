import DashboardClientWrapper from './components/DashboardClientWrapper';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  return <DashboardClientWrapper id={id} />;
}