import ImageGenerator from '@/src/components/ImageGenerator';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Image Generator</h1>
      <ImageGenerator />
    </main>
  );
}