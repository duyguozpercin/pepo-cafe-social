import { ImageWithFallback } from "../components/ImageWithFallback";
import { DynamicForm } from "../components/DynamicForm";

const contactHeroImg =
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";


function SectionKicker({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-[0.72rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">{children}</div>;
}

export function Contact() {
  
  const handleContactSubmit = async (formData: any) => {
    // Backend'deki formidable yapısına uygun olarak FormData kullanıyoruz
    const data = new FormData();
    data.append("type", "contact");
    data.append("adSoyad", formData.adSoyad);
    data.append("email", formData.email);
    data.append("telefon", formData.telefon);
    data.append("mesaj", formData.mesaj);

    const res = await fetch("/api/send-email", {
      method: "POST",
      // Content-Type header'ı eklemiyoruz, FormData ile otomatik ayarlanır
      body: data,
    });

    if (!res.ok) throw new Error("Gönderilemedi");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">

      <section className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="absolute inset-0">
          <ImageWithFallback src={contactHeroImg} alt="İletişim" className="h-full w-full object-cover brightness-[0.18]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--pepo-bg))]/20 to-[rgb(var(--pepo-bg))]/95" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <SectionKicker>BİZE ULAŞIN</SectionKicker>
          <h1 className="mb-6 font-normal leading-[1.1] text-[rgb(var(--pepo-text))] text-[clamp(2.5rem,6vw,5rem)]">İletişim</h1>

        </div>
      </section>


      <section className="bg-[rgb(var(--pepo-bg-2))] px-6 py-20">

      </section>

      <section className="bg-[rgb(var(--pepo-bg))] px-6 py-24">
        <DynamicForm 
          type="İLETİŞİM"
          title="İletişim Formu"
          description="Formu doldur, ekibimiz dönüş yapsın."
          onSubmit={handleContactSubmit}
        >
          <div className="mb-6">
            <label className="mb-2 block text-[0.72rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/65 uppercase">Konu</label>
            <input 
              name="konu"
              className="w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-white outline-none"
              placeholder="Örn: Rezervasyon"
            />
          </div>
        </DynamicForm>
      </section>
    </div>
  );
}