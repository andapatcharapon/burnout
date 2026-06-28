'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ResultData {
  formData: {
    sleep: number;
    screenTime: string;
    workload: number | null;
    hobbies: number | null;
    nutrition: string | null;
    grade: string;
    track: string;
    socialSupport: number | null;
    physicalSymptoms: number | null;
    eeAnswers?: (number | null)[];
    cyAnswers?: (number | null)[];
    reAnswers?: (number | null)[];
  };
  scores: {
    ee: number;
    cy: number;
    re: number;
    overallScore: number;
    riskPercentage: number;
    riskLevel: string;
    eeRawSum?: number;
    cyRawSum?: number;
    reRawSum?: number;
  };
  factors: string[];
  timestamp: string;
}

export default function Results() {
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [history, setHistory] = useState<{ timestamp: string; riskPercentage: number; riskLevel: string }[]>([]);

  const eeQuestions = [
    "ฉันรู้สึกห่อเหี่ยวจิตใจ หมดเรี่ยวแรง และสูญเสียแรงจูงใจในการทำงาน/การเรียน",
    "ฉันรู้สึกอ่อนเพลียตั้งแต่ตื่นนอน เมื่อคิดว่าต้องไปเผชิญกับงาน/การเรียนในวันนี้",
    "ฉันรู้สึกเครียด ท้อแท้ และรู้สึกว่าตนเองกำลังรับภาระหนักเกินไปจนจัดการไม่ไหว",
    "ฉันมีอาการทางกายที่ผิดปกติ เช่น ปวดศีรษะ ปวดกล้ามเนื้อ หรือนอนไม่หลับเรื้อรัง",
    "ฉันรู้สึกหมดความอดทน หงุดหงิด โกรธง่าย และอารมณ์แปรปรวนได้ง่ายกว่าปกติ",
    "ฉันรู้สึกหมดเรี่ยวแรงเมื่อสิ้นสุดวันจากการเรียน การทำโครงงาน หรือการอ่านหนังสือ",
    "แค่ตื่นขึ้นมาแล้วคิดว่าต้องไปเรียน หรือต้องเผชิญกับการเตรียมตัวสอบ ฉันก็รู้สึกเหนื่อยล้าแล้ว",
    "การต้องทำความเข้าใจเนื้อหา หรือแก้โจทย์ปัญหาซับซ้อนตลอดทั้งวัน ทำให้ฉันรู้สึกเครียดมาก",
    "ฉันรู้สึกว่าตนเองกำลังรับภาระความคาดหวัง (ทั้งจากตัวเองและคนรอบข้าง) ที่หนักเกินไป"
  ];

  const cyQuestions = [
    "ฉันเริ่มมีทัศนคติในแง่ลบต่องาน/การเรียน และมองคนรอบข้างหรือสิ่งแวดล้อมในแง่ร้าย",
    "ฉันรู้สึกอยากแยกตัวออกห่าง ไม่ต้องการสุงสิงกับเพื่อนร่วมงาน เพื่อนร่วมชั้น หรือผู้รับบริการ",
    "ฉันปฏิบัติต่อผู้อื่นอย่างแข็งกระด้าง หรือรู้สึกว่าตนเองไร้ความเห็นอกเห็นใจผู้อื่น",
    "ฉันรู้สึกเมินเฉย ถอดใจ และไม่อยากใส่ใจต่อพฤติกรรมของคนรอบข้างหรือผลลัพธ์ของงานอีกต่อไป",
    "ฉันรู้สึกหวาดระแวง คอยจับผิด โทษคนอื่น หรือคิดว่าปัญหาที่เกิดขึ้นเป็นความผิดของผู้อื่น",
    "ฉันเริ่มรู้สึกว่าสิ่งที่กำลังพยายามศึกษาหรือเตรียมตัวอยู่ ไม่มีประโยชน์หรือไม่มีความหมาย",
    "ฉันเริ่มตีตัวออกห่าง ไม่อยากพูดคุยเรื่องการเรียน เรื่องสอบ หรือเรื่องอนาคตกับเพื่อนและครอบครัว",
    "ฉันรู้สึกเบื่อหน่ายและสูญเสียความกระตือรือร้นในการทำให้เป้าหมายสำเร็จอย่างสิ้นเชิง",
    "ฉันเริ่มมีทัศนคติในแง่ลบและหงุดหงิดง่ายกับระบบการศึกษา หรือสภาพแวดล้อมรอบตัว"
  ];

  const reQuestions = [
    "ฉันรู้สึกว่าตนเองไม่มีความสามารถ ไร้ประสิทธิภาพในการแก้ปัญหาและจัดการงาน/การเรียน",
    "ฉันรู้สึกว่าสิ่งที่ฉันทำอยู่ไม่มีคุณค่า ไม่มีความก้าวหน้า และมองไม่เห็นความสำเร็จ",
    "ฉันขาดความคิดริเริ่มสร้างสรรค์ในการทำสิ่งใหม่ๆ และคุณภาพงาน/ผลการเรียนของฉันลดลงอย่างเห็นได้ชัด",
    "ฉันรู้สึกสงสัยในความสามารถของตนเอง สูญเสียความมั่นใจ และรู้สึกว่าตนเองล้มเหลว",
    "ฉันรู้สึกอยากหลีกเลี่ยงปัญหา มีการขาดงาน/ขาดเรียนบ่อยขึ้น หรือมีความคิดที่อยากจะลาออก",
    "ฉันสามารถจัดการกับปัญหา หรือโจทย์ยากๆ ที่เกิดขึ้นในการเรียนได้เป็นอย่างดี",
    "ฉันรู้สึกว่าตนเองได้เรียนรู้สิ่งใหม่ๆ และพัฒนาความสามารถของตนเองอย่างต่อเนื่อง",
    "ฉันมั่นใจว่าตนเองจะสามารถทำเป้าหมายให้สำเร็จได้ตามที่ตั้งใจไว้",
    "ฉันรู้สึกภูมิใจกับผลงานและสิ่งที่ตนเองทำได้ในช่วงที่ผ่านมา"
  ];

  useEffect(() => {
    const rawData = localStorage.getItem('mindcheck_result');
    if (rawData) {
      try {
        setResult(JSON.parse(rawData));
      } catch (e) {
        console.error('Error parsing result data', e);
        loadMockData();
      }
    } else {
      loadMockData();
    }

    const rawHistory = localStorage.getItem('mindcheck_history');
    if (rawHistory) {
      try {
        setHistory(JSON.parse(rawHistory));
      } catch (e) {
        console.error('Error parsing history data', e);
      }
    }
  }, []);

  const loadMockData = () => {
    const mockPayload: ResultData = {
      formData: {
        sleep: 4.5,
        screenTime: '9',
        workload: 4,
        hobbies: 2,
        nutrition: 'no',
        grade: 'm6',
        track: 'science-math',
        socialSupport: 2,
        physicalSymptoms: 3,
        eeAnswers: [4, 5, 4, 3, 5, 4, 5, 4, 4],
        cyAnswers: [4, 3, 3, 4, 5, 3, 4, 4, 5],
        reAnswers: [4, 4, 4, 5, 3, 2, 2, 2, 1],
      },
      scores: {
        ee: 4.22,
        cy: 3.89,
        re: 4.11,
        overallScore: 4.08,
        riskPercentage: 77,
        riskLevel: 'High',
        eeRawSum: 38,
        cyRawSum: 35,
        reRawSum: 37,
      },
      factors: ['sleep', 'workload', 'physicalSymptoms'],
      timestamp: new Date().toISOString(),
    };
    setResult(mockPayload);
  };

  if (!result) return null;

  const { scores, factors } = result;

  const rotationAngle = -90 + (scores.riskPercentage / 100) * 180;

  const ee_norm = (scores.ee - 1) / 4;
  const cy_norm = (scores.cy - 1) / 4;
  const re_norm = (scores.re - 1) / 4;

  const r1 = ee_norm * 40; 
  const r2 = cy_norm * 40; 
  const r3 = re_norm * 40; 

  const cos30 = 0.866;
  const sin30 = 0.5;

  const p1_x = 50;
  const p1_y = Math.round(50 - r1);

  const p2_x = Math.round(50 + r2 * cos30);
  const p2_y = Math.round(50 + r2 * sin30);

  const p3_x = Math.round(50 - r3 * cos30);
  const p3_y = Math.round(50 + r3 * sin30);

  const radarPoints = `${p1_x},${p1_y} ${p2_x},${p2_y} ${p3_x},${p3_y}`;

  const factorMap: Record<string, { title: string; desc: string; icon: string }> = {
    sleep: {
      title: 'การพักผ่อนไม่เพียงพอรุนแรง',
      desc: 'การนอนหลับเฉลี่ยน้อยกว่า 5 ชั่วโมง ส่งผลลบโดยตรงต่อความมั่นคงทางอารมณ์และสมาธิ',
      icon: 'bedtime',
    },
    workload: {
      title: 'ภาระงานและวิชาเรียนคั่งค้าง',
      desc: 'ความกังวลเรื่องการบ้านที่สะสมมากเกินไปกระตุ้นความตึงเครียดและกดดันตนเอง',
      icon: 'assignment_late',
    },
    screen: {
      title: 'ใช้เวลาหน้าจอสูงมาก',
      desc: 'การใช้งานคอมฯ หรือมือถือนานเกิน 8 ชั่วโมงต่อวันสะสมความล้าให้สมองและสายตา',
      icon: 'smartphone',
    },
    hobbies: {
      title: 'ขาดกิจกรรมผ่อนคลายสะสม',
      desc: 'แทบไม่มีเวลาทำกิจกรรมอดิเรกหรืองานที่ชอบ ทำให้ร่างกายและใจไม่ได้ระบายอารมณ์ด้านลบ',
      icon: 'sports_esports',
    },
    nutrition: {
      title: 'รับประทานอาหารไม่สมดุล',
      desc: 'ทานอาหารไม่ตรงเวลาหรืองดอาหารบางมื้อ ทำให้ร่างกายขาดกำลังหลักในการฟื้นฟูตนเอง',
      icon: 'restaurant',
    },
    exhaustion: {
      title: 'ความอ่อนล้าทางอารมณ์สูง',
      desc: 'ระดับความล้าทางจิตใจอยู่ในเกณฑ์สูงมาก รู้สึกหมดพลังใจในการตื่นไปโรงเรียน',
      icon: 'psychology',
    },
    cynicism: {
      title: 'ทัศนคติลบและห่างเหินการเรียน',
      desc: 'เริ่มมองว่าวิชาที่เรียนไม่มีเป้าหมาย หรือตั้งคำถามกับความคุ้มค่าในการเพียรพยายาม',
      icon: 'sentiment_very_dissatisfied',
    },
    socialSupport: {
      title: 'ระบบช่วยเหลือรอบข้างจำกัด',
      desc: 'ขาดการระบายหรือไม่มีที่ปรึกษาที่ไว้ใจได้เมื่อเกิดปัญหากดดันทางวิชาการ',
      icon: 'group',
    },
    physicalSymptoms: {
      title: 'ปฏิกิริยาตึงเครียดออกทางกาย',
      desc: 'ความเครียดสะสมเริ่มก่อตัวเป็นอาการปวดหัว ปวดบ่าไหล่ หรือรบกวนการนอนหลับ',
      icon: 'healing',
    },
  };

  const gradeLabelMap: Record<string, string> = {
    m4: 'มัธยมศึกษาปีที่ 4 (ม.4)',
    m5: 'มัธยมศึกษาปีที่ 5 (ม.5)',
    m6: 'มัธยมศึกษาปีที่ 6 (ม.6)',
  };

  const trackLabelMap: Record<string, string> = {
    'science-math': 'วิทยาศาสตร์-คณิตศาสตร์',
    'art-math': 'ศิลป์-คำนวณ',
    'art-lang': 'ศิลป์-ภาษา / ศิลป์-ทั่วไป',
    'other': 'สายวิชาชีพ / อื่นๆ',
  };

  const getLikertLabel = (val: number | null | undefined) => {
    if (val === null || val === undefined) return 'ไม่ได้ตอบ';
    const labels: Record<number, string> = {
      1: 'ไม่เลย',
      2: 'นานๆ ครั้ง',
      3: 'บางครั้ง',
      4: 'บ่อย',
      5: 'บ่อยมาก'
    };
    return `${labels[val] || ''} (${val})`;
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' น.';
    } catch (e) {
      return isoString;
    }
  };

  let highestDimension = 'EE';
  let highestValue = scores.ee;
  if (scores.cy > highestValue) {
    highestDimension = 'CY';
    highestValue = scores.cy;
  }
  if (scores.re > highestValue) {
    highestDimension = 'RE';
    highestValue = scores.re;
  }

  let dimensionAdviceText = '';
  if (highestDimension === 'EE') {
    dimensionAdviceText = 'คำแนะนำเฉพาะเจาะจงด้านความเหนื่อยล้าทางอารมณ์ (EE): คุณควรจัดสรรเวลาพักผ่อนเชิงรุก (Proactive Rest) ให้เป็นรูปธรรม เช่น จัดเวลาเวลานอนให้สม่ำเสมออย่างน้อย 7-8 ชม., ทำกิจกรรมผ่อนคลายความตึงเครียดนอกสายตาหน้าจอ (Digital Detox) หรือฝึกหายใจระบายอารมณ์ลบสะสม';
  } else if (highestDimension === 'CY') {
    dimensionAdviceText = 'คำแนะนำเฉพาะเจาะจงด้านทัศนคติต่อการเรียน (CY): แนะนำให้หาเวลาพูดคุยแชร์ปัญหาความรู้สึกร่วมกับผู้คนรอบข้าง เช่น ครอบครัว เพื่อนสนิท หรือครูแนะแนว และพยายามทำกิจกรรมอดิเรกเล็กๆ ที่เปลี่ยนสภาพแวดล้อมจำเจเพื่อฟื้นคืนความหมายแรงบันดาลใจในการศึกษา';
  } else {
    dimensionAdviceText = 'คำแนะนำเฉพาะเจาะจงด้านการรับรู้ความสามารถ (RE): ทดลองประยุกต์ใช้เทคนิคซอยเป้าหมายการบ้านออกเป็นชิ้นย่อยขนาดเล็ก (Micro-tasks) ที่สามารถพิชิตได้ง่ายใน 15 นาที และฉลองเป้าหมายย่อยนั้นเพื่อสะสมพลังความภาคภูมิใจและความมั่นใจคืนกลับมาทีละก้าว';
  }

  let riskTitle = 'เสี่ยงระดับต่ำ (Low Risk)';
  let riskText = 'ปกติและมีความทนทานทางจิตใจดี';
  let riskColorClass = 'text-green-500';
  let riskBgClass = 'bg-green-50 text-green-700 border-green-200';
  let badgeIcon = 'check_circle';
  let insightText =
    'คุณรักษาสมดุลชีวิตและจิตใจได้ดีมาก ระดับความเสี่ยงหมดไฟอยู่ในเกณฑ์ปกติ แนะนำให้คงพฤติกรรมการนอนและพักผ่อนในเกณฑ์ที่ดีแบบนี้ต่อไป เพื่อสร้างภูมิคุ้มกันความเครียดในระยะยาว';

  if (scores.riskLevel === 'High') {
    riskTitle = 'มีความเสี่ยงภาวะหมดไฟระดับสูง';
    riskText = 'ระบบตรวจพบความเสี่ยงและภาวะความล้าทางใจในเกณฑ์ระดับสูง';
    riskColorClass = 'text-error';
    riskBgClass = 'bg-error-container text-on-error-container border-error/20';
    badgeIcon = 'report';
    insightText =
      'จากการวิเคราะห์พฤติกรรมและความรู้สึกของคุณ ระบบตรวจพบระดับความเสี่ยงหมดไฟในระดับวิกฤต ซึ่งอาจส่งผลกระทบต่อทั้งการเรียนและสภาพจิตใจโดยตรง แนะนำให้หยุดพักฟื้นฟูจิตใจ พูดคุยกับครูแนะแนวที่โรงเรียน หรือติดต่อสายด่วนสุขภาพจิต 1323 เพื่อวางแผนปรับภาระงานและรับคำแนะนำที่ถูกต้อง';
  } else if (scores.riskLevel === 'Moderate') {
    riskTitle = 'มีความเสี่ยงภาวะหมดไฟระดับปานกลาง';
    riskText = 'เริ่มมีสัญญาณเตือนของความเหนื่อยล้าสะสมจากการเรียนและสมดุลชีวิต';
    riskColorClass = 'text-amber-500';
    riskBgClass = 'bg-amber-50 text-amber-800 border-amber-200';
    badgeIcon = 'warning';
    insightText =
      'ระดับความเสี่ยงอยู่ในเกณฑ์เริ่มเฝ้าระวัง มีความอ่อนล้าทางใจสะสมเนื่องจากสมดุลวิถีชีวิตเสียไป แนะนำให้ตั้งเป้าหมายลดชั่วโมงหน้าจอและเพิ่มการนอนหลับให้ได้อย่างน้อย 6-7 ชม. รวมทั้งแบ่งเวลาทำงานเป็นช่วง ๆ (เช่น Pomodoro) เพื่อลดแรงกดดัน';
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-stack-lg">
      {/* Hero Section: Dynamic Assessment Result */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-stack-lg">
        {/* Left Column: Risk Gauge & Main Result */}
        <div className="lg:col-span-7 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-stack-lg border border-outline-variant shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-label-sm border ${riskBgClass}`}>
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {badgeIcon}
                </span>
                สถานะปัจจุบัน
              </span>
              
              <h1 className="font-display-lg text-display-lg text-on-surface leading-tight text-left">
                {scores.riskLevel === 'High' ? (
                  <>คุณมีความเสี่ยงภาวะหมดไฟ<span className="text-error font-bold">ระดับสูง</span></>
                ) : scores.riskLevel === 'Moderate' ? (
                  <>คุณมีความเสี่ยงภาวะหมดไฟ<span className="text-amber-500 font-bold">ระดับปานกลาง</span></>
                ) : (
                  <>คุณมีความเสี่ยงภาวะหมดไฟ<span className="text-green-500 font-bold">ระดับต่ำ</span></>
                )}
              </h1>

              {/* Demographics details badge */}
              <div className="flex flex-wrap items-center gap-2 text-label-sm text-on-surface-variant font-medium mt-2">
                <span className="bg-surface-container text-primary px-3 py-1 rounded-lg border border-outline-variant/30 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  ระดับชั้น: {gradeLabelMap[result.formData.grade || ''] || 'ชั้นมัธยมปลาย'}
                </span>
                <span className="bg-surface-container text-primary px-3 py-1 rounded-lg border border-outline-variant/30 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  แผนการเรียน: {trackLabelMap[result.formData.track || ''] || 'แผนทั่วไป'}
                </span>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl text-left">
                {riskText}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4 no-print">
                <Link 
                  href="/recommendations" 
                  className="px-8 py-3 bg-primary text-white rounded-xl font-label-md hover:shadow-lg hover:bg-primary-container transition-all active:scale-95 text-center w-full sm:w-auto"
                >
                  ดูข้อแนะนำการปฏิบัติตน
                </Link>
                <button 
                  onClick={handlePrint}
                  className="px-6 py-3 border border-outline text-on-surface-variant rounded-xl font-label-md hover:bg-surface-container transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  ดาวน์โหลดรายงาน (PDF)
                </button>
              </div>
            </div>
            {/* Background Decoration */}
            <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full opacity-[0.03] blur-3xl ${
              scores.riskLevel === 'High' ? 'bg-error' : scores.riskLevel === 'Moderate' ? 'bg-amber-500' : 'bg-green-500'
            }`}></div>
          </div>

          {/* Key Factor Analysis */}
          <div className="bg-surface-container rounded-xl p-6 md:p-stack-lg border border-outline-variant">
            <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2 text-on-surface font-bold text-left">
              <span className="material-symbols-outlined text-primary">psychology</span>
              ปัจจัยหลักที่มีผลต่อคุณมากที่สุด
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {factors.length > 0 ? (
                factors.map((fKey) => {
                  const factorInfo = factorMap[fKey] || {
                    title: 'ปัจจัยส่วนบุคคล',
                    desc: 'รายละเอียดพฤติกรรมหรืออารมณ์ย่อยคลาดเคลื่อนจากข้อมูลดิบ',
                    icon: 'help',
                  };
                  return (
                    <div 
                      key={fKey} 
                      className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-start gap-3 shadow-sm hover:scale-[1.01] transition-transform duration-200"
                    >
                      <div className="bg-error-container/20 p-2 rounded-lg text-error shrink-0">
                        <span className="material-symbols-outlined">{factorInfo.icon}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-label-md text-on-surface font-bold">{factorInfo.title}</div>
                        <div className="font-label-sm text-on-surface-variant mt-1">{factorInfo.desc}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant text-center font-label-md text-on-surface-variant">
                  ไม่พบปัจจัยลบสะสมที่รุนแรง คุณมีการดูแลสัดส่วนเวลาและการนอนที่ดีมาก
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visualizations & Charts */}
        <div className="lg:col-span-5 flex flex-col gap-gutter">
          {/* Risk Level Gauge */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant flex flex-col items-center justify-center text-center shadow-sm">
            <h4 className="font-label-md text-on-surface-variant mb-6 uppercase tracking-wider font-bold">Burnout Risk Gauge</h4>
            
            <div className="relative w-48 h-24 mb-4">
              <div className="absolute inset-0 risk-gauge-gradient rounded-t-full opacity-20"></div>
              <div className="absolute inset-x-4 bottom-0 h-16 bg-surface-container-lowest rounded-t-full border-b-0 border border-outline-variant"></div>
              
              {/* Needle */}
              <div 
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-error origin-bottom transition-transform duration-1000 ease-out shadow-md"
              ></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-on-surface rounded-full"></div>
            </div>
            
            <div className={`font-headline-lg text-headline-lg font-bold ${riskColorClass}`}>
              {scores.riskPercentage}% ({scores.riskLevel === 'High' ? 'สูง' : scores.riskLevel === 'Moderate' ? 'ปานกลาง' : 'ต่ำ'})
            </div>
            <p className="font-label-sm text-on-surface-variant px-4 mt-1">เกณฑ์ชี้วัดความเสี่ยงหมดไฟโดยเฉลี่ย</p>
          </div>

          {/* Radar Chart */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant flex flex-col items-center shadow-sm">
            <h4 className="font-label-md text-on-surface-variant mb-4 font-bold">3-Dimension Analysis (MBI-SS)</h4>
            
            <div className="w-full aspect-square max-w-[240px] relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="radar-grid" cx="50" cy="50" r="40"></circle>
                <circle className="radar-grid" cx="50" cy="50" r="28"></circle>
                <circle className="radar-grid" cx="50" cy="50" r="16"></circle>
                
                <line className="radar-grid" x1="50" x2="50" y1="10" y2="90"></line>
                <line className="radar-grid" x1="15.3" x2="84.7" y1="70" y2="30"></line>
                <line className="radar-grid" x1="15.3" x2="84.7" y1="30" y2="70"></line>
                
                <polygon className="radar-area" points={radarPoints}></polygon>
                
                <circle cx={p1_x} cy={p1_y} r="2.5" fill="#0052cc"></circle>
                <circle cx={p2_x} cy={p2_y} r="2.5" fill="#0052cc"></circle>
                <circle cx={p3_x} cy={p3_y} r="2.5" fill="#0052cc"></circle>

                <text fill="#434654" fontSize="4.5" fontWeight="bold" textAnchor="middle" x="50" y="7">ความล้าอารมณ์ (EE)</text>
                <text fill="#434654" fontSize="4.5" fontWeight="bold" textAnchor="middle" x="84" y="80">ความเหินห่าง (CY)</text>
                <text fill="#434654" fontSize="4.5" fontWeight="bold" textAnchor="middle" x="16" y="80">ความสามารถลดลง (RE)</text>
              </svg>
            </div>
            
            {/* Score details */}
            <div className="mt-4 grid grid-cols-1 gap-3 w-full text-left">
              <div>
                <div className="flex justify-between font-label-sm">
                  <span className="text-on-surface text-label-md font-semibold">1. ความล้าอารมณ์ (Emotional Exhaustion)</span>
                  <span className="text-primary font-bold text-label-md">{scores.ee.toFixed(2)} / 5.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant mt-0.5 font-medium">
                  <span>คะแนนเฉลี่ย</span>
                  <span>คะแนนรวม: {scores.eeRawSum ?? Math.round(scores.ee * 9)} / 45 คะแนน</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-primary h-full" style={{ width: `${(ee_norm * 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-label-sm mt-2">
                  <span className="text-on-surface text-label-md font-semibold">2. ความห่างเหิน (Cynicism)</span>
                  <span className="text-secondary font-bold text-label-md">{scores.cy.toFixed(2)} / 5.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant mt-0.5 font-medium">
                  <span>คะแนนเฉลี่ย</span>
                  <span>คะแนนรวม: {scores.cyRawSum ?? Math.round(scores.cy * 9)} / 45 คะแนน</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-secondary h-full" style={{ width: `${(cy_norm * 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-label-sm mt-2">
                  <span className="text-on-surface text-label-md font-semibold">3. ความสามารถลดลง (Reduced Efficacy)</span>
                  <span className="text-tertiary-container font-bold text-label-md">{scores.re.toFixed(2)} / 5.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant mt-0.5 font-medium">
                  <span>คะแนนเฉลี่ย</span>
                  <span>คะแนนรวม: {scores.reRawSum ?? Math.round(scores.re * 9)} / 45 คะแนน</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-tertiary-container h-full" style={{ width: `${(re_norm * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment History */}
          {history.length > 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm text-left no-print">
              <h4 className="font-label-md text-on-surface-variant mb-4 flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[20px] text-primary">history</span>
                ประวัติการประเมินย้อนหลัง
              </h4>
              <div className="space-y-3">
                {history.map((h, index) => (
                  <div key={index} className="flex justify-between items-center text-label-sm border-b border-outline-variant/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-on-surface-variant font-medium">{formatDate(h.timestamp)}</span>
                    <span className={`font-bold ${
                      h.riskLevel === 'High' ? 'text-error' : h.riskLevel === 'Moderate' ? 'text-amber-500' : 'text-green-500'
                    }`}>
                      {h.riskPercentage}% ({h.riskLevel === 'High' ? 'สูง' : h.riskLevel === 'Moderate' ? 'ปานกลาง' : 'ต่ำ'})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Insights & Secondary Info */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Personalized advice card */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 md:p-stack-lg border border-outline-variant flex flex-col gap-5 text-left shadow-sm">
          <div>
            <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface mb-2 font-bold">
              <span className="material-symbols-outlined text-primary font-bold">insights</span>
              ผลวิเคราะห์พฤติกรรมโดยรวม
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {insightText}
            </p>
          </div>

          <div className="border-t border-outline-variant/35 pt-4">
            <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-secondary mb-2 font-bold">
              <span className="material-symbols-outlined">psychology</span>
              แนวทางการจัดการตนเองรายมิติ (Personalized Advice)
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {dimensionAdviceText}
            </p>
          </div>
        </div>
        
        {/* Side Disclaimer Card */}
        <div className="md:col-span-4 bg-surface-container-high rounded-xl p-6 md:p-stack-lg border border-primary/10 flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            health_and_safety
          </span>
          <p className="font-label-md text-primary font-bold mb-2">คำชี้แจงความปลอดภัย</p>
          <p className="font-label-sm text-on-surface-variant italic leading-relaxed">
            "แบบประเมินนี้อ้างอิงเครื่องมือคัดกรอง MBI-SS เพื่อความตระหนักรู้เบื้องต้น และช่วยนำทางเด็กเพื่อรับคำปรึกษา ไม่สามารถทดแทนการวินิจฉัยโดยแพทย์ได้"
          </p>
        </div>
      </section>

      {/* Detailed Response breakdown */}
      <section className="mt-stack-lg bg-surface-container-lowest rounded-xl p-6 md:p-stack-lg border border-outline-variant text-left shadow-sm page-break-inside-avoid">
        <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface mb-6 font-bold">
          <span className="material-symbols-outlined text-primary font-bold">analytics</span>
          รายละเอียดคำตอบและการคิดคะแนนรายข้อ (Detailed Scoring Breakdown)
        </h3>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h4 className="font-title-lg text-primary font-bold border-b border-outline-variant/30 pb-2 mb-4 flex justify-between items-center text-lg">
              <span>ส่วนที่ 1: ด้านความอ่อนล้าทางอารมณ์และร่างกาย (EE)</span>
              <span className="text-on-surface-variant text-sm font-normal hidden sm:inline">
                คะแนนดิบ: {scores.eeRawSum ?? Math.round(scores.ee * 9)}/45 (เฉลี่ย {scores.ee.toFixed(2)}/5.00)
              </span>
            </h4>
            <div className="divide-y divide-outline-variant/20">
              {eeQuestions.map((q, idx) => {
                const ansVal = result.formData.eeAnswers ? result.formData.eeAnswers[idx] : null;
                return (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-label-md">
                    <span className="text-on-surface font-medium max-w-2xl text-left">
                      {idx + 1}. {q}
                    </span>
                    <span className="text-primary font-bold shrink-0 text-left sm:text-right">
                      {getLikertLabel(ansVal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-title-lg text-secondary font-bold border-b border-outline-variant/30 pb-2 mb-4 flex justify-between items-center text-lg">
              <span>ส่วนที่ 2: ด้านการเมินเฉยและการลดค่าความเป็นบุคคล (CY)</span>
              <span className="text-on-surface-variant text-sm font-normal hidden sm:inline">
                คะแนนดิบ: {scores.cyRawSum ?? Math.round(scores.cy * 9)}/45 (เฉลี่ย {scores.cy.toFixed(2)}/5.00)
              </span>
            </h4>
            <div className="divide-y divide-outline-variant/20">
              {cyQuestions.map((q, idx) => {
                const ansVal = result.formData.cyAnswers ? result.formData.cyAnswers[idx] : null;
                return (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-label-md">
                    <span className="text-on-surface font-medium max-w-2xl text-left">
                      {idx + 1}. {q}
                    </span>
                    <span className="text-secondary font-bold shrink-0 text-left sm:text-right">
                      {getLikertLabel(ansVal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-title-lg text-tertiary-container font-bold border-b border-outline-variant/30 pb-2 mb-4 flex justify-between items-center text-lg">
              <span>ส่วนที่ 3: ด้านความรู้สึกไม่ประสบความสำเร็จและประสิทธิภาพลดลง (RE)</span>
              <span className="text-on-surface-variant text-sm font-normal hidden sm:inline">
                คะแนนดิบ: {scores.reRawSum ?? Math.round(scores.re * 9)}/45 (เฉลี่ย {scores.re.toFixed(2)}/5.00)
              </span>
            </h4>
            <div className="divide-y divide-outline-variant/20">
              {reQuestions.map((q, idx) => {
                const ansVal = result.formData.reAnswers ? result.formData.reAnswers[idx] : null;
                const isReversed = idx >= 5;
                let calculatedScore = ansVal;
                if (ansVal !== null && ansVal !== undefined && isReversed) {
                  calculatedScore = 6 - ansVal;
                }
                return (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 text-label-md">
                    <div className="text-on-surface font-medium max-w-2xl flex flex-wrap items-center text-left">
                      <span>{idx + 1}. {q}</span>
                      {isReversed && (
                        <span className="bg-primary/5 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/10 ml-2 font-normal">
                          กลับคะแนนเชิงบวก
                        </span>
                      )}
                    </div>
                    <span className="text-tertiary-container font-bold shrink-0 text-left sm:text-right flex flex-col items-start sm:items-end">
                      <span>คำตอบ: {getLikertLabel(ansVal)}</span>
                      {isReversed && ansVal !== null && (
                        <span className="text-[11px] text-on-surface-variant font-normal">
                          คะแนนคัดกรอง: {calculatedScore} คะแนน
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers & Professional Reference */}
      <section className="mt-8 border-t border-outline-variant/30 pt-6 text-center max-w-3xl mx-auto space-y-4">
        <p className="text-label-sm text-on-surface-variant leading-relaxed">
          <strong>กรอบวิจัยอ้างอิง:</strong> Maslach, C., Jackson, S. E., & Leiter, M. P. (1996). <em>Maslach Burnout Inventory Manual</em> (3rd ed.). Palo Alto, CA: Consulting Psychologists Press. (ปรับใช้วัดเกณฑ์กลุ่มตัวอย่างในบริบทมัธยมปลายไทยเบื้องต้น)
        </p>
        <div className="p-4 bg-surface-container/30 rounded-xl border border-outline-variant/20 text-label-sm text-on-surface-variant leading-relaxed italic text-left">
          <strong>คำเตือนทางการแพทย์ (Medical Disclaimer):</strong> ข้อมูลการประเมินนี้อยู่ภายใต้ระดับชั้นความมั่นคงของข้อมูลนักเรียนเป็นความลับ และประมวลผลบนเบราว์เซอร์ของผู้เรียนเท่านั้น การประเมินนี้ทำหน้าที่คัดกรองสัญญาณเตือนระยะแรกเท่านั้น หากคุณรู้สึกเครียด สะสม หรือมีแนวโน้มซึมเศร้า กรุณาเข้าพบแผนกแนะแนวประจำโรงเรียน หรือขอรับคำปรึกษาจากสายด่วนสุขภาพจิต กระทรวงสาธารณสุข โทร. 1323 ตลอด 24 ชั่วโมง
        </div>
      </section>

      <div className="h-12"></div>
    </main>
  );
}
