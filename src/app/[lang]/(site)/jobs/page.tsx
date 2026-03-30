import Jobs from "@/components/jobs/Jobs";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface JobsPageProps {
  params: Promise<{ lang: string }>;
}

export default async function JobsPage({ params }: JobsPageProps) {
  const { lang } = await params;

  const breadcrumbItems = [{ name: "Jobs", href: `/${lang}/jobs` }];

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <Jobs />
    </div>
  );
}
