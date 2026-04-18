import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const sections = [
  {
    title: "Campus Life",
    desc: "Explore our modern infrastructure and vibrant campus environment",
    items: [
      { label: "Smart Classrooms", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80" },
      { label: "AI & Computer Labs", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80" },
      { label: "Library & Reading Room", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80" },
      { label: "Science Laboratories", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80" },
      { label: "Sports Facilities", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80" },
      { label: "Cafeteria & Dining", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80" },
    ],
  },
  {
    title: "Events & Celebrations",
    desc: "Memorable moments from our cultural, academic, and social events",
    items: [
      { label: "Annual Cultural Festival", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80" },
      { label: "Convocation Ceremony", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80" },
      { label: "Sports Day", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" },
      { label: "Fresher's Welcome Party", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80" },
      { label: "Teachers' Day Celebration", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80" },
      { label: "Independence Day Parade", img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500&q=80" },
    ],
  },
  {
    title: "Academic Activities",
    desc: "Inside the classrooms, workshops, and research sessions",
    items: [
      { label: "Guest Lectures", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
      { label: "Workshop Sessions", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80" },
      { label: "Industry Visits", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80" },
      { label: "Research Presentations", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500&q=80" },
      { label: "Moot Court Sessions", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80" },
      { label: "Media Production", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80" },
    ],
  },
  {
    title: "Achievements & Awards",
    desc: "Proud moments of recognition and excellence",
    items: [
      { label: "Award Ceremonies", img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=500&q=80" },
      { label: "National Competition Winners", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80" },
      { label: "Sports Trophies", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80" },
      { label: "Academic Excellence Awards", img: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=500&q=80" },
      { label: "Placement Announcements", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80" },
      { label: "Alumni Success Stories", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80" },
    ],
  },
];

type GalleryItem = { label: string; img: string };

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);

  const openLightbox = (items: GalleryItem[], index: number) => setLightbox({ items, index });
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length });
  const nextImg = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.items.length });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-4">Campus Gallery</span>
          <h1 className="text-4xl font-bold mb-3">Gallery</h1>
          <p className="text-white/70 text-lg">Moments from our vibrant campus life — click any photo to view full size</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {sections.map(({ title, desc, items }) => (
          <div key={title} className="mb-14">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{desc}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => openLightbox(items, i)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-semibold text-sm">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prevImg(); }}
            className="absolute left-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img
              src={lightbox.items[lightbox.index].img.replace("w=500", "w=1200")}
              alt={lightbox.items[lightbox.index].label}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-white text-center mt-4 font-medium">{lightbox.items[lightbox.index].label}</p>
            <p className="text-white/50 text-center text-sm mt-1">{lightbox.index + 1} / {lightbox.items.length}</p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); nextImg(); }}
            className="absolute right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
