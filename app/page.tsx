import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-stack-lg flex flex-col justify-center">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center py-8">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary font-label-sm">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            แบบประเมินสุขภาพจิตเบื้องต้นมาตรฐานสากล
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
            ประเมินสภาวะหมดไฟของคุณกับ <span className="text-primary">Burnout check</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
            ประเมินระดับความเสี่ยงของภาวะหมดไฟในการเรียนผ่านชุดคำถามประเมินพฤติกรรมการใช้ชีวิตและแบบทดสอบทางจิตวิทยาที่ออกแบบมาเพื่อนักเรียนระดับมัธยมปลายโดยเฉพาะ
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              href="/assessment" 
              className="px-8 py-4 bg-primary text-white rounded-xl font-headline-md hover:shadow-lg hover:bg-primary-container transition-all active:scale-95 text-center w-full sm:w-auto"
            >
              เริ่มทำแบบประเมิน
            </Link>
            <Link 
              href="/recommendations" 
              className="px-8 py-4 border border-outline text-on-surface-variant rounded-xl font-headline-md hover:bg-surface-container transition-all text-center w-full sm:w-auto"
            >
              ดูแนวทางรับมือเบื้องต้น
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
            <img 
              alt="A student sitting by a window"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFb28roVh425qfiy7eR3yhoUR3WsB-B5gClAKTBH-bxJv2EBfRZ4QDBS7ASV6AejF_wG7D16044wkNFLgWfBk0sWOnMlIm-yq6xp0dbB4NfpQPwSaJHvf20tgbLDS1O3vFbmG8ziSwGmWVnfOpvQhfMZUxaaL9dYpP6Wp2SDCb_KPge7lWH4vA-n1aFefDy0C0E5qF9t-yvIkOsXBRuPEkTvfaleffB418nDMYp3pBbqjORN5fpyNleEKWM5zQOf-YdhTq3ChTLw"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Info Sections: 3 Dimensions of MBI-SS */}
      <section className="py-12 border-t border-outline-variant/20 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">เข้าใจภาวะหมดไฟใน 3 มิติ</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            แบบประเมินของเราใช้หลักวิจัยเกณฑ์วัด Maslach Burnout Inventory (MBI-SS) เพื่อประเมินสภาวะทางจิตใจอย่างครอบคลุม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-error-container/20 p-4 rounded-full text-error mb-4">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">ความเหนื่อยล้าทางอารมณ์</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              รู้สึกเหนื่อยล้าทางกายและใจ พลังงานหมดสะสมเนื่องจากการสอบ การบ้าน หรือตารางเรียนที่หนาแน่นจนไม่มีเวลาฟื้นฟู
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-secondary-container/30 p-4 rounded-full text-secondary mb-4">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                sentiment_dissatisfied
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">ความรู้สึกเหินห่างต่อการเรียน</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              สูญเสียความกระตือรือร้น ทัศนคติเชิงลบ เริ่มรู้สึกว่าสิ่งที่เรียนอยู่ไม่มีเป้าหมายหรือไม่สมเหตุสมผล
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-tertiary-container/10 p-4 rounded-full text-tertiary-container mb-4">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                trending_down
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">ประสิทธิภาพการเรียนลดลง</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              สูญเสียความเชื่อมั่นในตัวเอง รู้สึกประสิทธิภาพในการทำความเข้าใจวิชาเรียนหรือทำการบ้านถดถอยลง
            </p>
          </div>
        </div>
      </section>

      {/* Security & Confidentiality */}
      <section className="bg-surface-container rounded-xl p-6 md:p-8 border border-outline-variant/40 mt-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
          <span className="material-symbols-outlined text-[40px]">shield</span>
        </div>
        <div className="space-y-1 text-left">
          <h4 className="font-headline-md text-headline-md text-on-surface">ข้อมูลและการประเมินของคุณเป็นความลับ</h4>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            ข้อมูลพฤติกรรมและระดับความเครียดส่วนบุคคลจะถูกเก็บประมวลผลบนเครื่องของคุณเท่านั้น (Client-Side Storage) ตามมาตรฐาน PDPA 
            ไม่มีการอัปโหลดหรือเปิดเผยต่อสารธารณะ เพื่อให้พื้นที่นี้เป็นพื้นที่ปลอดภัยในการประเมินและเรียนรู้ตัวคุณอย่างจริงใจ
          </p>
        </div>
      </section>
    </main>
  );
}
