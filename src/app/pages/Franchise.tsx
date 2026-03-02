
import { ImageWithFallback } from "../components/ImageWithFallback";
import { DynamicForm } from "../components/DynamicForm";

const franchiseImg = "pepo-franchise.png";

const benefits = [
  { title: "Güçlü Marka", desc: "Tanınan ve güvenilen PEPO markasının arkasında durun." },
  { title: "Kapsamlı Eğitim", desc: "Operasyon, servis ve kahve eğitimlerinde tam destek." },
  { title: "Süregelen Destek", desc: "Açılıştan sonra da yanınızda olan deneyimli ekip." },
  { title: "Kanıtlanmış Model", desc: "Başarılı iş modeli ve güçlü kâr marjı." },
];

const steps = [
  { num: "01", title: "Başvuru", desc: "Formu doldurun, size ulaşalım." },
  { num: "02", title: "Ön Görüşme", desc: "Tanışma toplantısı." },
  { num: "03", title: "Değerlendirme", desc: "Konum analizi." },
  { num: "04", title: "Anlaşma", desc: "Sözleşme imzalanması." },
  { num: "05", title: "Eğitim", desc: "Operasyon eğitimi." },
  { num: "06", title: "Açılış", desc: "Pepo ailesine hoş geldiniz!" },
];


const baseField = "w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))] outline-none transition focus:border-[rgb(var(--pepo-gold))]/70";
const labelClass = "mb-2 block text-[0.72rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/65 uppercase";

export function Franchise() {

  const handleFranchiseSubmit = async (formData: any) => {

    const customFields = {
      sehir: (document.getElementsByName("sehir")[0] as HTMLInputElement).value,
      konum: (document.getElementsByName("konum")[0] as HTMLInputElement).value,
      butce: (document.getElementsByName("butce")[0] as HTMLSelectElement).value,
      deneyim: (document.getElementsByName("deneyim")[0] as HTMLSelectElement).value,
    };

    if (!customFields.sehir || !customFields.butce) {
      alert("Lütfen Şehir ve Bütçe alanlarını doldurun.");
      throw new Error("Eksik alan");
    }

    const payload = {
      type: "franchise",
      ...formData,
      ...customFields
    };

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Gönderim hatası");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">
      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden text-center">
        <div className="absolute inset-0">
          <ImageWithFallback src={franchiseImg} alt="Franchise" className="w-full h-full object-cover brightness-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[rgb(var(--pepo-bg))]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-5">BİZİMLE BÜYÜYÜN</div>
          <h1 className="text-[rgb(var(--pepo-text))] font-normal mb-6 text-[clamp(2.5rem,6vw,5rem)]">PEPO Franchise</h1>
          <p className="text-[rgb(var(--pepo-text))]/60 max-w-[600px] mx-auto leading-[1.9]">
            PEPO Coffee & Social olarak sizi de bu büyümekte olan ailenin bir parçası yapmak istiyoruz.
          </p>
        </div>
      </section>

      {/* Avantajlar Bölümü */}
      <section className="bg-[rgb(var(--pepo-bg-2))] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">NEDEN PEPO?</div>
            <h2 className="text-[rgb(var(--pepo-text))] font-normal text-[clamp(1.8rem,3.5vw,2.8rem)]">Franchise Avantajlarımız</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="border border-[rgb(var(--pepo-gold))]/15 px-8 py-10 transition hover:border-[rgb(var(--pepo-gold))]/45 hover:bg-[rgb(var(--pepo-gold))]/[0.03]">
                <h3 className="text-[rgb(var(--pepo-text))] text-[1.2rem] font-normal mb-3">{b.title}</h3>
                <p className="text-[rgb(var(--pepo-text))]/50 text-[0.88rem] leading-[1.75]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç Bölümü */}
      <section className="bg-[rgb(var(--pepo-bg))] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">SÜREÇ</div>
            <h2 className="text-[rgb(var(--pepo-text))] font-normal text-[clamp(1.8rem,3.5vw,2.8rem)]">Nasıl Çalışır?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-[rgb(var(--pepo-gold))] text-[2rem] leading-none mb-3 opacity-70">{step.num}</div>
                <div className="w-px h-[30px] bg-[rgb(var(--pepo-gold))]/30 mx-auto mb-3" />
                <h4 className="text-[rgb(var(--pepo-text))] text-[1rem] font-normal mb-1.5">{step.title}</h4>
                <p className="text-[rgb(var(--pepo-text))]/45 text-[0.78rem] leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM BÖLÜMÜ */}
      <section className="bg-[rgb(var(--pepo-bg))] py-24 px-6">
        <DynamicForm
          type="FRANCHISE"
          title="Franchise Başvurusu"
          description="Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin."
          onSubmit={handleFranchiseSubmit}
        >
          {/* FRANCHISE ÖZEL ALANLAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass}>ŞEHİR *</label>
              <input name="sehir" className={baseField} placeholder="Yaşadığınız Şehir" />
            </div>
            <div>
              <label className={labelClass}>AÇMAK İSTEDİĞİNİZ KONUM</label>
              <input name="konum" className={baseField} placeholder="İlçe / Semt" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass}>YATIRIM BÜTÇESİ *</label>
              <select name="butce" className={baseField + " appearance-none cursor-pointer"}>
                <option value="">Seçiniz</option>
                <option value="500k-1m">500.000₺ – 1.000.000₺</option>
                <option value="1m-2m">1.000.000₺ – 2.000.000₺</option>
                <option value="2m+">2.000.000₺ üzeri</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>İŞ DENEYİMİ</label>
              <select name="deneyim" className={baseField + " appearance-none cursor-pointer"}>
                <option value="">Seçiniz</option>
                <option value="yok">Deneyimim yok</option>
                <option value="fnd">Yeme-İçme sektörü</option>
                <option value="diger">Diğer sektörler</option>
              </select>
            </div>
          </div>
        </DynamicForm>
      </section>
    </div>
  );
}