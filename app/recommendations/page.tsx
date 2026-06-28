'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type TabKey = 'rest' | 'study' | 'mind' | 'help';

interface SavedResult {
  scores: {
    riskLevel: string;
    riskPercentage: number;
  };
}

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState<TabKey>('rest');
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);

  useEffect(() => {
    const rawData = localStorage.getItem('mindcheck_result');
    if (rawData) {
      try {
        setSavedResult(JSON.parse(rawData));
      } catch (e) {
        console.error('Error parsing localStorage results', e);
      }
    }
  }, []);

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'rest', label: 'การพักผ่อนและฟื้นฟู', icon: 'bedtime' },
    { key: 'study', label: 'การจัดการภาระงาน', icon: 'auto_stories' },
    { key: 'mind', label: 'กิจกรรมผ่อนคลาย', icon: 'spa' },
    { key: 'help', label: 'ช่องทางขอความช่วยเหลือ', icon: 'support_agent' },
  ];

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-stack-lg">
      {/* Back to Results Link */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-start no-print">
        <Link 
          href="/results"
          className="text-primary hover:text-primary-container font-label-md flex items-center gap-1.5 transition-all group font-bold"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          กลับไปที่หน้าผลการประเมิน
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-primary mb-3">คำแนะนำในการดูแลตนเอง</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          ชุดคำแนะนำเชิงพฤติกรรมและแนวทางการดูแลจิตใจที่ออกแบบมาเป็นพิเศษ เพื่อช่วยฟื้นฟูพลังกายและพลังสมองของคุณ
        </p>
      </div>

      {/* Dynamic Recommendation Header based on actual Burnout Risk Level */}
      {savedResult && (
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in no-print">
          {savedResult.scores.riskLevel === 'High' ? (
            <div className="bg-error-container/20 p-5 rounded-xl border border-error/30 flex items-start gap-4 text-left">
              <div className="bg-error-container p-3 rounded-lg text-error shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  warning
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline-md text-headline-md text-error font-bold">แนะนำการปฏิบัติด่วนสำหรับระดับความเสี่ยงสูง</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  ผลประเมินล่าสุดของคุณมีความเสี่ยงสูง ({savedResult.scores.riskPercentage}%) 
                  ขอแนะนำให้คุณเน้นไปที่แท็บ <strong className="text-primary font-semibold">ช่องทางขอความช่วยเหลือ</strong> เพื่อปรึกษาผู้เชี่ยวชาญโดยตรง หรือพูดคุยแบ่งเบากับอาจารย์แนะแนวทันทีเพื่อผ่อนคลายภาระงาน
                </p>
              </div>
            </div>
          ) : savedResult.scores.riskLevel === 'Moderate' ? (
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 flex items-start gap-4 text-left">
              <div className="bg-amber-100 p-3 rounded-lg text-amber-600 shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  error
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline-md text-headline-md text-amber-800 font-bold">เฝ้าระวังสำหรับระดับความเสี่ยงปานกลาง</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  ผลประเมินล่าสุดของคุณมีความเสี่ยงปานกลาง ({savedResult.scores.riskPercentage}%) 
                  แนะนำให้มุ่งเน้นในเรื่อง <strong className="text-primary font-semibold">การพักผ่อน</strong> และ <strong className="text-primary font-semibold">การจัดการภาระงาน</strong> เพื่อจัดสรรชั่วโมงการนอนหลับให้ได้อย่างน้อย 6.5 ชั่วโมง และลดภาระความเหนื่อยล้าสะสม
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 p-5 rounded-xl border border-green-200 flex items-start gap-4 text-left">
              <div className="bg-green-100 p-3 rounded-lg text-green-600 shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline-md text-headline-md text-green-800 font-bold">สุขภาพใจของคุณอยู่ในเกณฑ์สมดุลดี</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  ผลประเมินล่าสุดของคุณมีความเสี่ยงระดับต่ำ ({savedResult.scores.riskPercentage}%) 
                  รักษาพฤติกรรมและความผ่อนคลายนี้ต่อไป และสามารถเรียนรู้ <strong className="text-primary font-semibold">กิจกรรมผ่อนคลาย</strong> เพิ่มเติมเพื่อสร้างจิตใจที่ยืดหยุ่นแข็งแกร่ง (Resilience)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="max-w-4xl mx-auto mb-6 no-print">
        <div className="grid grid-cols-2 md:flex md:flex-row border-b-0 md:border-b border-outline-variant/30 gap-2 md:gap-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center md:justify-start gap-2 px-3 py-3 md:px-6 md:py-4 font-label-md text-label-sm md:text-label-md transition-all cursor-pointer rounded-xl md:rounded-none md:border-b-2 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm md:shadow-none md:bg-transparent md:border-primary md:text-primary font-bold'
                    : 'bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:bg-surface-container-high md:bg-transparent md:border-transparent md:hover:border-primary/30'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] md:text-[20px]">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Content Details */}
      <div className="max-w-4xl mx-auto glass-card p-6 md:p-8 rounded-2xl text-left min-h-[350px]">
        {/* TAB 1: REST & RECOVERY */}
        {activeTab === 'rest' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px]">bedtime</span>
              สุขอนามัยการนอนหลับ (Sleep Hygiene)
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              การนอนหลับคือการฟื้นฟูสภาพอารมณ์และสมองที่ดีที่สุดสำหรับวัยรุ่น หากคุณตรวจพบเวลานอนเฉลี่ยต่ำกว่า 5-6 ชั่วโมงต่อวัน 
              การปรับเปลี่ยนพฤติกรรมการนอนแบบค่อยเป็นค่อยไปจะช่วยลดระดับความเครียดสะสมได้อย่างมีนัยสำคัญ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                <h4 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  เป้าหมายชั่วโมงการนอน
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  ตั้งเป้าหมายนอนหลับให้ได้อย่างน้อย 7-8 ชั่วโมงต่อวัน หากทำงานค้างอยู่ แนะนำให้เข้านอนก่อนเที่ยงคืนแล้วตื่นเช้าขึ้นมาทำ ดีกว่าการฝืนอดนอนต่อเนื่อง
                </p>
              </div>

              <div className="space-y-2 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                <h4 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">phonelink_off</span>
                  ตัดการเชื่อมต่อก่อนนอน 30 นาที
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  แสงสีฟ้าจากโทรศัพท์กระตุ้นระบบประสาทและยับยั้งเมลาโทนิน แนะนำให้งดการเลื่อนหน้าจอโซเชียลมีเดีย 30 นาทีก่อนนอนเพื่อช่วยให้สมองล้าลดลง
                </p>
              </div>

              <div className="space-y-2 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                <h4 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">coffee</span>
                  ควบคุมปริมาณคาเฟอีน
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  หลีกเลี่ยงการดื่มชา กาแฟ น้ำอัดลม หรือเครื่องดื่มชูกำลังหลังเวลา 14:00 น. เพื่อป้องกันสารกระตุ้นรบกวนวงจรการหลับลึก (Deep Sleep)
                </p>
              </div>

              <div className="space-y-2 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                <h4 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">bed</span>
                  จัดสภาพห้องนอน
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  รักษาอุณหภูมิห้องให้อยู่ในระดับที่เย็นกำลังพอดี ปิดไฟให้มืดสนิท หรือเปิดโคมไฟสลัวโทนส้มอุ่น และเก็บโต๊ะทำการบ้านแยกจากเตียงนอน
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDY & WORKLOAD */}
        {activeTab === 'study' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px]">auto_stories</span>
              การบริหารจัดการเวลาและการเรียน (Study Management)
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              ภาวะหมดไฟมักเกิดจากภาระงานสะสมที่เร่งด่วนและปริมาณมากเกินไป การใช้กลยุทธ์ทางปัญญาในการบริหารเวลาจะช่วยแบ่งเบาความหนาแน่นของงานและลดความเหนื่อยล้าทางสมอง
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30 items-start">
                <div className="bg-primary/10 text-primary p-2 rounded-lg font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">การจัดอันดับความสำคัญด้วย Eisenhower Matrix</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-1">
                    แยกแยะงานในแต่ละวันออกเป็น 4 ประเภท (สำคัญเร่งด่วน, สำคัญไม่เร่งด่วน, ไม่สำคัญเร่งด่วน, ไม่สำคัญไม่เร่งด่วน) 
                    เพื่อมุ่งความสนใจไปที่งานที่ส่งผลต่อคะแนนโดยตรง และคัดกรองงานยิบย่อยออกไปก่อน
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30 items-start">
                <div className="bg-primary/10 text-primary p-2 rounded-lg font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">เทคนิคการแบ่งเวลา Pomodoro</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-1">
                    ทำการศึกษาหรือทำการบ้านเป็นรอบสั้น ๆ (ทำงาน 25 นาที พักหลับตาและหยุดใช้สมอง 5 นาที) และเมื่อทำครบ 4 รอบ 
                    ให้พักผ่อนช่วงยาว 20-30 นาที การพักสายตาแบบนี้ช่วยผ่อนประสาทและสายตาได้ดีเยี่ยม
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30 items-start">
                <div className="bg-primary/10 text-primary p-2 rounded-lg font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">แบ่งซอยเป้าหมายขนาดใหญ่ (Task Chunking)</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-1">
                    หลีกเลี่ยงการตั้งเป้าหมายใหญ่แบบ "อ่านหนังสือสอบให้จบเล่มในคืนนี้" แต่เปลี่ยนเป็น "สรุปโน้ตความเข้าใจในบทที่ 1 ให้เสร็จก่อนบ่ายโมง" 
                    ความสำเร็จย่อย ๆ จะช่วยสร้างแรงบันดาลใจ (Dopamine) ให้คุณมีสมาธิต่อเนื่อง
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MINDFULNESS & STRESS RELIEF */}
        {activeTab === 'mind' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px]">spa</span>
              กิจกรรมเพื่อความสมดุลทางอารมณ์ (Mindfulness & Balance)
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              เมื่อร่างกายและอารมณ์เหนื่อยล้าสะสม การเบี่ยงเบนความสนใจจากตำราเรียนไปทำกิจกรรมฟื้นฟูสารเคมีในสมอง เช่น เอ็นดอร์ฟิน (Endorphin) 
              และเซโรโทนิน (Serotonin) จะช่วยลดความกังวลใจและสร้างความยืดหยุ่นทางใจ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 text-center space-y-3">
                <div className="text-primary text-[36px]"><span className="material-symbols-outlined">air</span></div>
                <h4 className="font-headline-md text-headline-md text-on-surface">หายใจลดเครียด (Box Breathing)</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  หายใจเข้าลึก ๆ 4 วินาที กลั้นหายใจไว้ 4 วินาที ผ่อนลมหายใจออก 4 วินาที และกลั้นหายใจหลังออก 4 วินาที ทำต่อเนื่อง 5 รอบ ช่วยกระตุ้นระบบประสาทลดการเต้นเร็วของชีพจร
                </p>
              </div>

              <div className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 text-center space-y-3">
                <div className="text-secondary text-[36px]"><span className="material-symbols-outlined">directions_run</span></div>
                <h4 className="font-headline-md text-headline-md text-on-surface">การออกกำลังกายเบา ๆ</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  เดินเร็ว ขี่จักรยาน หรือยืดกล้ามเนื้อ 15-20 นาทีในสวนแถวบ้าน สัมผัสกับลมธรรมชาติและแสงแดดอ่อน ๆ ช่วยกระตุ้นสารเคมีกระปรี้กระเปร่าในสมอง
                </p>
              </div>

              <div className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 text-center space-y-3">
                <div className="text-tertiary-container text-[36px]"><span className="material-symbols-outlined">palette</span></div>
                <h4 className="font-headline-md text-headline-md text-on-surface">ทำกิจกรรมที่เบี่ยงเบนทางจิต</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  ทำงานศิลปะ วาดรูป ฟังเพลงจังหวะผ่อนคลาย จัดห้องนอนใหม่ หรือทำอาหารง่าย ๆ เพื่อให้สมองหลุดพ้นจากวงจรความคิดฟุ้งซ่านและกังวลเรื่องการเรียน
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HELP CHANNELS */}
        {activeTab === 'help' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
              ช่องทางการขอความช่วยเหลือและการสนับสนุน (Help Channels)
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              จำไว้ว่าคุณไม่ได้เผชิญปัญหาเพียงลำพัง ภาวะหมดไฟหรือหมดพลังในการเรียนเป็นสิ่งที่เกิดขึ้นได้กับนักเรียนทุกคน 
              การเปิดใจแบ่งปันและการขอความช่วยเหลือจากผู้เชี่ยวชาญคือจุดเริ่มต้นของการฟื้นฟูจิตใจที่ถูกต้อง
            </p>

            <div className="space-y-4 pt-4 text-left">
              {/* Channel 1 */}
              <div className="p-5 bg-surface-container rounded-xl border border-error/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-error">call</span>
                    สายด่วนสุขภาพจิต (กรมสุขภาพจิต)
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    โทรฟรีติดต่อได้ตลอด 24 ชั่วโมง ให้บริการปรึกษา แนะนำ และรับฟังปัญหาความเครียดของวัยรุ่นโดยนักจิตวิทยาผู้เชี่ยวชาญ
                  </p>
                </div>
                <a 
                  href="tel:1323" 
                  className="px-6 py-3 bg-error text-white rounded-lg font-headline-md hover:bg-error/90 transition-all text-center w-full sm:w-auto shrink-0 whitespace-nowrap"
                >
                  โทร 1323
                </a>
              </div>

              {/* Channel 2 */}
              <div className="p-5 bg-surface-container rounded-xl border border-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                    สมาคมสะมาริตันส์แห่งประเทศไทย (The Samaritans)
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    บริการเพื่อนรับฟังปัญหาทางโทรศัพท์ เพื่อระบายความทุกข์ใจ ป้องกันวิกฤตทางอารมณ์ ดำเนินการโดยอาสาสมัครที่เป็นมิตร
                  </p>
                </div>
                <a 
                  href="tel:021136789" 
                  className="px-6 py-3 bg-primary text-white rounded-lg font-headline-md hover:bg-primary-container transition-all text-center w-full sm:w-auto shrink-0 whitespace-nowrap"
                >
                  โทร 02-113-6789
                </a>
              </div>

              {/* Channel 3 */}
              <div className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col items-start gap-2">
                <div className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">school</span>
                  ฝ่ายปรึกษาและงานแนะแนวของโรงเรียน
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  แนะนำอย่างยิ่งให้เดินเข้าไปเคาะประตูห้องครูแนะแนว หรือพูดคุยกับคุณครูที่คุณสนิทและไว้ใจเพื่อชี้แจงปัญหา 
                  ครูสามารถช่วยเหลือในการเจรจาขอความเห็นใจ ปรับสัดส่วนคะแนน หรือแบ่งเบาปริมาณงานค้างรวมถึงขอขยายเวลาส่งงาน (Extention) 
                  เพื่อคืนเวลาให้คุณได้ฟื้นฟูจิตใจอย่างสงบ
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="h-12"></div>
    </main>
  );
}
