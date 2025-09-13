import Image from 'next/image';

export default function Gallery({ images }: { images: { id?: string; url: string }[] }) {
  if (!images || images.length === 0) return null;
  return (
    <div>
      <div className="text-base font-semibold mb-3 text-gray-700">Gallery</div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <a
            key={img.id ?? idx}
            href={img.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src={img.url}
              alt={`Gallery ${idx + 1}`}
              width={120}
              height={80}
              className="h-20 w-32 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
