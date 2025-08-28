interface PageProps {
  params: Promise<{ lang: string }>; // 👈 mark async
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params; // 👈 await params

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="text-lg text-gray-600 mb-8">Language: {lang}</p>
    </div>
  );
}
