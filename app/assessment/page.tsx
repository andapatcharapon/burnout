'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AssessmentData {
  sleep: number;
  screenTime: string;
  workload: number | null; // 1 to 5
  hobbies: number | null; // 1 to 4
  nutrition: string | null; // 'yes' or 'no'
  grade: string; // 'm4', 'm5', 'm6'
  track: string; // 'science-math', 'art-math', 'art-lang', 'other'
  socialSupport: number | null; // 1 to 4
  physicalSymptoms: number | null; // 1 to 4
  eeAnswers: (number | null)[]; // 9 questions
  cyAnswers: (number | null)[]; // 9 questions
  reAnswers: (number | null)[]; // 9 questions
}

export default function Assessment() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    sleep: 7.0,
    screenTime: '',
    workload: null,
    hobbies: null,
    nutrition: null,
    grade: '',
    track: '',
    socialSupport: null,
    physicalSymptoms: null,
    eeAnswers: Array(9).fill(null),
    cyAnswers: Array(9).fill(null),
    reAnswers: Array(9).fill(null),
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const gradeOptions = [
    { label: 'มัธยมศึกษาปีที่ 4 (ม.4)', value: 'm4' },
    { label: 'มัธยมศึกษาปีที่ 5 (ม.5)', value: 'm5' },
    { label: 'มัธยมศึกษาปีที่ 6 (ม.6)', value: 'm6' },
  ];

  const trackOptions = [
    { label: 'วิทยาศาสตร์-คณิตศาสตร์', value: 'science-math' },
    { label: 'ศิลป์-คำนวณ', value: 'art-math' },
    { label: 'ศิลป์-ภาษา / ศิลป์-ทั่วไป', value: 'art-lang' },
    { label: 'สายวิชาชีพ / อื่นๆ', value: 'other' },
  ];

  const workloadOptions = [
    { label: 'น้อยมาก', value: 1 },
    { label: 'น้อย', value: 2 },
    { label: 'ปานกลาง', value: 3 },
    { label: 'มาก', value: 4 },
    { label: 'มากที่สุด', value: 5 },
  ];

  const hobbiesOptions = [
    { label: 'แทบไม่ได้ทำเลย', value: 1 },
    { label: 'ทำเป็นบางครั้ง', value: 2 },
    { label: 'ทำบ่อยครั้ง', value: 3 },
    { label: 'ทำเป็นประจำ', value: 4 },
  ];

  const nutritionOptions = [
    { label: 'ใช่ (เป็นประจำ)', value: 'yes' },
    { label: 'ไม่ใช่ (ไม่สม่ำเสมอ)', value: 'no' },
  ];

  const socialSupportOptions = [
    { label: 'แทบไม่มีเลย/น้อยมาก', value: 1 },
    { label: 'มีบ้างบางครั้ง', value: 2 },
    { label: 'มีบ่อยครั้ง', value: 3 },
    { label: 'มีเป็นประจำ/อบอุ่น', value: 4 },
  ];

  const physicalSymptomsOptions = [
    { label: 'แทบไม่มีเลย', value: 1 },
    { label: 'มีบ้างบางครั้ง', value: 2 },
    { label: 'มีบ่อยครั้ง', value: 3 },
    { label: 'มีประจำและรุนแรง', value: 4 },
  ];

  const likertChoices = [
    { label: 'ไม่เลย', value: 1 },
    { label: 'นานๆ ครั้ง', value: 2 },
    { label: 'บางครั้ง', value: 3 },
    { label: 'บ่อย', value: 4 },
    { label: 'บ่อยมาก', value: 5 },
  ];

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

  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setInvalidFields((prev) => prev.filter((item) => item !== field));
    setErrorMsg('');
  };

  const handleArrayInputChange = (field: 'eeAnswers' | 'cyAnswers' | 'reAnswers', index: number, value: number) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray,
      };
    });
    setInvalidFields((prev) => prev.filter((item) => item !== `${field}-${index}`));
    setErrorMsg('');
  };

  const handleNext1 = () => {
    const invalid: string[] = [];
    if (!formData.grade) invalid.push('grade');
    if (!formData.track) invalid.push('track');
    if (formData.workload === null) invalid.push('workload');
    if (formData.hobbies === null) invalid.push('hobbies');
    if (formData.nutrition === null) invalid.push('nutrition');
    if (formData.socialSupport === null) invalid.push('socialSupport');
    if (formData.physicalSymptoms === null) invalid.push('physicalSymptoms');

    const screenHours = parseFloat(formData.screenTime);
    if (!formData.screenTime || isNaN(screenHours) || screenHours < 0 || screenHours > 24) {
      invalid.push('screenTime');
    }

    if (invalid.length > 0) {
      setInvalidFields(invalid);
      setErrorMsg('กรุณากรอกข้อมูลและตอบคำถามที่ไฮไลต์สีแดงให้ครบถ้วน');
      const firstInvalid = invalid[0];
      const element = document.getElementById(`q-${firstInvalid}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStep(2);
    setInvalidFields([]);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext2 = () => {
    const invalid: string[] = [];
    for (let i = 0; i < 9; i++) {
      if (formData.eeAnswers[i] === null) {
        invalid.push(`eeAnswers-${i}`);
      }
    }

    if (invalid.length > 0) {
      setInvalidFields(invalid);
      setErrorMsg('กรุณาตอบคำถามด้านความอ่อนล้าทางอารมณ์และร่างกาย (ส่วนที่ 1) ที่ไฮไลต์สีแดงให้ครบถ้วน');
      const firstInvalid = invalid[0];
      const element = document.getElementById(`q-${firstInvalid}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStep(3);
    setInvalidFields([]);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext3 = () => {
    const invalid: string[] = [];
    for (let i = 0; i < 9; i++) {
      if (formData.cyAnswers[i] === null) {
        invalid.push(`cyAnswers-${i}`);
      }
    }

    if (invalid.length > 0) {
      setInvalidFields(invalid);
      setErrorMsg('กรุณาตอบคำถามด้านการเมินเฉยและการลดค่าความเป็นบุคคล (ส่วนที่ 2) ที่ไฮไลต์สีแดงให้ครบถ้วน');
      const firstInvalid = invalid[0];
      const element = document.getElementById(`q-${firstInvalid}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStep(4);
    setInvalidFields([]);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
    setInvalidFields([]);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invalid: string[] = [];
    for (let i = 0; i < 9; i++) {
      if (formData.reAnswers[i] === null) {
        invalid.push(`reAnswers-${i}`);
      }
    }

    if (invalid.length > 0) {
      setInvalidFields(invalid);
      setErrorMsg('กรุณาตอบคำถามด้านความรู้สึกไม่ประสบความสำเร็จ (ส่วนที่ 3) ที่ไฮไลต์สีแดงให้ครบถ้วน');
      const firstInvalid = invalid[0];
      const element = document.getElementById(`q-${firstInvalid}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // --- Scoring Calculations ---
    const eeSum = formData.eeAnswers.reduce((a, b) => (a || 0) + (b || 0), 0) || 0;
    const ee = eeSum / 9;

    const cySum = formData.cyAnswers.reduce((a, b) => (a || 0) + (b || 0), 0) || 0;
    const cy = cySum / 9;

    // RE scoring (1-5 directly, 6-9 reversed scoring: 6 - answer)
    const reCalculatedScores = formData.reAnswers.map((ans, idx) => {
      const val = ans || 0;
      return idx >= 5 ? (6 - val) : val;
    });
    const reSum = reCalculatedScores.reduce((a, b) => a + b, 0);
    const re = reSum / 9;

    // Weighted Overall Score (1.0 - 5.0 scale)
    const overallScore = ee * 0.45 + cy * 0.35 + re * 0.20;
    const riskPercentage = Math.round(((overallScore - 1.0) / 4.0) * 100);

    let riskLevel = 'Low';
    if (riskPercentage >= 70) {
      riskLevel = 'High';
    } else if (riskPercentage >= 35) {
      riskLevel = 'Moderate';
    }

    // Lifestyle triggers
    const activeFactors: string[] = [];
    if (formData.sleep < 5) {
      activeFactors.push('sleep');
    }
    if (formData.workload && formData.workload >= 4) {
      activeFactors.push('workload');
    }
    const screenHours = parseFloat(formData.screenTime);
    if (screenHours > 8) {
      activeFactors.push('screen');
    }
    if (formData.hobbies && formData.hobbies <= 2) {
      activeFactors.push('hobbies');
    }
    if (formData.nutrition === 'no') {
      activeFactors.push('nutrition');
    }
    if (ee >= 3.8) {
      activeFactors.push('exhaustion');
    }
    if (cy >= 3.5) {
      activeFactors.push('cynicism');
    }
    if (formData.socialSupport && formData.socialSupport <= 2) {
      activeFactors.push('socialSupport');
    }
    if (formData.physicalSymptoms && formData.physicalSymptoms >= 3) {
      activeFactors.push('physicalSymptoms');
    }

    // Priority Sort Order
    const priorityOrder = ['sleep', 'workload', 'exhaustion', 'hobbies', 'cynicism', 'socialSupport', 'physicalSymptoms', 'screen', 'nutrition'];
    const sortedFactors = activeFactors.sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b));

    const resultPayload = {
      formData,
      scores: {
        ee,
        cy,
        re,
        overallScore,
        riskPercentage,
        riskLevel,
        eeRawSum: eeSum,
        cyRawSum: cySum,
        reRawSum: reSum
      },
      factors: sortedFactors.slice(0, 2),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('mindcheck_result', JSON.stringify(resultPayload));

    // Append to history list
    try {
      const existingHistoryRaw = localStorage.getItem('mindcheck_history');
      let historyList = [];
      if (existingHistoryRaw) {
        historyList = JSON.parse(existingHistoryRaw);
      }
      historyList.push({
        timestamp: resultPayload.timestamp,
        riskPercentage: resultPayload.scores.riskPercentage,
        riskLevel: resultPayload.scores.riskLevel,
      });
      if (historyList.length > 5) {
        historyList = historyList.slice(-5);
      }
      localStorage.setItem('mindcheck_history', JSON.stringify(historyList));
    } catch (e) {
      console.error('Error saving history', e);
    }

    router.push('/results');
  };

  return (
    <main className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-stack-lg flex-grow">
      {/* Header & Stepper */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">แบบประเมินสุขภาพใจ</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
          กรุณาตอบแบบสอบถามให้ครบถ้วนเพื่อผลวิเคราะห์สภาพจิตใจและการคัดกรองภาวะหมดไฟในการเรียนที่แม่นยำ
        </p>
        
        {/* Desktop Stepper (hidden on mobile, shown on md and up) */}
        <div className="hidden md:flex items-center justify-between max-w-3xl mx-auto mb-12 relative px-4">
          {/* Connecting Line background */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-outline-variant/30 -z-10"></div>
          {/* Active Connecting Line fill */}
          <div 
            className="absolute top-5 left-8 h-0.5 bg-primary -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / 3) * 85}%` }}
          ></div>

          {[
            { stepNum: 1, label: 'ข้อมูลทั่วไป', desc: 'พฤติกรรมและการเรียน' },
            { stepNum: 2, label: 'ความล้า (EE)', desc: 'ความอ่อนล้าทางอารมณ์' },
            { stepNum: 3, label: 'การเมินเฉย (CY)', desc: 'ทัศนคติต่อการเรียน' },
            { stepNum: 4, label: 'ประสิทธิภาพ (RE)', desc: 'ความเชื่อมั่นในการเรียน' },
          ].map((s) => {
            const isActive = step === s.stepNum;
            const isCompleted = step > s.stepNum;
            return (
              <div key={s.stepNum} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 border-2 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-white scale-100' 
                    : isActive 
                      ? 'bg-primary border-primary text-white ring-4 ring-primary/20 scale-110 shadow-md' 
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant'
                }`}>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                  ) : (
                    s.stepNum
                  )}
                </div>
                <span className={`text-label-md mt-3 font-bold transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {s.label}
                </span>
                <span className="text-[11px] text-on-surface-variant/70 hidden lg:inline font-medium">
                  {s.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper (shown on mobile, hidden on md and up) */}
        <div className="md:hidden max-w-md mx-auto mb-8 bg-surface-container p-4 rounded-xl border border-outline-variant/30 text-left">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">ขั้นตอนที่ {step} จาก 4</span>
              <h3 className="font-bold text-on-surface text-base">
                {step === 1 && 'ข้อมูลทั่วไปและพฤติกรรม'}
                {step === 2 && 'ความอ่อนล้าทางอารมณ์และร่างกาย (EE)'}
                {step === 3 && 'การเมินเฉยและการลดค่าความเป็นบุคคล (CY)'}
                {step === 4 && 'ความรู้สึกไม่สำเร็จและประสิทธิภาพลดลง (RE)'}
              </h3>
            </div>
            <span className="text-primary font-bold text-sm bg-primary/10 px-2.5 py-1 rounded-lg shrink-0">
              {Math.round((step / 4) * 100)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-outline-variant/20 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-gutter">
        {errorMsg && (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 font-label-md flex items-center gap-2 animate-pulse sticky top-4 z-50 shadow-md">
            <span className="material-symbols-outlined">report</span>
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Demographics & Lifestyle */}
        {step === 1 && (
          <div className="space-y-stack-lg transition-all duration-300">
            {/* Card A: Education */}
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">school</span>
                ข้อมูลการศึกษาและการเรียน
              </h2>
              
              {/* Grade */}
              <div 
                id="q-grade" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('grade') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  1. ระดับชั้นปัจจุบันของคุณ <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {gradeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('grade', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.grade === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Track */}
              <div 
                id="q-track" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('track') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  2. แผนการเรียน / สายการเรียน <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trackOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('track', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.track === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Card B: Lifestyle */}
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">bedtime</span>
                พฤติกรรมการใช้ชีวิตในชีวิตประจำวัน
              </h2>

              {/* Sleep Hours */}
              <div 
                id="q-sleep" 
                className="p-4 rounded-xl transition-all duration-300 space-y-4 border border-transparent"
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  3. จำนวนชั่วโมงการนอนหลับเฉลี่ยต่อวัน (ในช่วง 2 สัปดาห์ที่ผ่านมา)
                </label>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                    <span>0 ชม.</span>
                    <span className="text-primary font-bold text-2xl bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/10">
                      {formData.sleep} ชม.
                    </span>
                    <span>12+ ชม.</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="12" 
                    step="0.5" 
                    value={formData.sleep}
                    onChange={(e) => handleInputChange('sleep', parseFloat(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
              </div>

              {/* Screen Time */}
              <div 
                id="q-screenTime" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('screenTime') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  4. เวลาเฉลี่ยที่ใช้งานอุปกรณ์หน้าจอ (มือถือ/แท็บเล็ต/คอมพิวเตอร์) เพื่อความบันเทิงต่อวัน <span className="text-error font-bold">*</span>
                </label>
                <div className="relative max-w-xs">
                  <input 
                    type="number" 
                    placeholder="เช่น 6" 
                    min="0"
                    max="24"
                    step="1"
                    value={formData.screenTime}
                    onChange={(e) => handleInputChange('screenTime', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-body-lg outline-none transition-all pr-16"
                  />
                  <span className="absolute right-4 top-4 text-on-surface-variant font-medium">ชั่วโมง</span>
                </div>
              </div>

              {/* Workload */}
              <div 
                id="q-workload" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('workload') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  5. ความรู้สึกต่อภาระงาน การบ้าน หรือกิจกรรมวิชาการสะสมสะสมในช่วงนี้ <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {workloadOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('workload', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.workload === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hobbies Frequency */}
              <div 
                id="q-hobbies" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('hobbies') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  6. ความถี่ในการมีโอกาสทำกิจกรรมอดิเรกหรือผ่อนคลายความเครียดในช่วงนี้ <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {hobbiesOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('hobbies', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.hobbies === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div 
                id="q-nutrition" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('nutrition') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  7. คุณมีการรับประทานอาหารที่ครบหมู่และตรงเวลาอย่างสม่ำเสมอหรือไม่ <span className="text-error font-bold">*</span>
                </label>
                <div className="flex gap-4">
                  {nutritionOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('nutrition', opt.value)}
                      className={`flex-1 px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.nutrition === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Card C: Somatic & Social Support */}
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">health_and_safety</span>
                ระบบช่วยเหลือรอบข้างและปฏิกิริยาตึงเครียดของร่างกาย
              </h2>

              {/* Social Support */}
              <div 
                id="q-socialSupport" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('socialSupport') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  8. คุณมีผู้ช่วยเหลือรอบข้างที่สามารถรับฟัง ระบาย หรือให้คำแนะนำเมื่อเจอปัญหาการเรียนได้ <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {socialSupportOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('socialSupport', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.socialSupport === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Symptoms */}
              <div 
                id="q-physicalSymptoms" 
                className={`p-4 rounded-xl transition-all duration-300 space-y-4 border ${
                  invalidFields.includes('physicalSymptoms') ? 'border-error bg-error-container/5 ring-1 ring-error' : 'border-transparent'
                }`}
              >
                <label className="block font-headline-md text-headline-md text-on-surface">
                  9. คุณมีอาการทางอ้อมจากความเครียดสะสม เช่น ปวดตึงบ่าศีรษะ กล้ามเนื้อกระตุก นอนไม่หลับเรื้อรัง <span className="text-error font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {physicalSymptomsOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleInputChange('physicalSymptoms', opt.value)}
                      className={`px-4 py-3 border rounded-lg transition-all text-label-md ${
                        formData.physicalSymptoms === opt.value
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext1}
                  className="bg-primary text-white px-10 py-4 rounded-xl font-headline-md hover:bg-primary-container shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 group"
                >
                  ถัดไป
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Emotional Exhaustion (EE - 9 Items) */}
        {step === 2 && (
          <div className="space-y-stack-lg transition-all duration-300">
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">psychology</span>
                ส่วนที่ 1: ด้านความอ่อนล้าทางอารมณ์และร่างกาย (Emotional Exhaustion)
              </h2>
              
              <p className="text-on-surface-variant font-label-md">
                โปรดเลือกตอบคำถามที่ตรงกับตัวคุณมากที่สุดในช่วงที่ผ่านมา (คำอธิบายช้อยส์: 1 = ไม่เลย, 2 = นานๆ ครั้ง, 3 = บางครั้ง, 4 = บ่อย, 5 = บ่อยมาก)
              </p>

              <div className="space-y-6 mt-6">
                {eeQuestions.map((qText, idx) => (
                  <div 
                    key={idx}
                    id={`q-eeAnswers-${idx}`}
                    className={`p-5 rounded-xl border transition-all duration-300 space-y-4 ${
                      invalidFields.includes(`eeAnswers-${idx}`)
                        ? 'border-error bg-error-container/5 ring-1 ring-error'
                        : 'border-outline-variant/30 bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-body-lg text-on-surface text-left font-semibold">{qText} <span className="text-error font-bold">*</span></p>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                      {likertChoices.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleArrayInputChange('eeAnswers', idx, opt.value)}
                          className={`py-3 px-1 border rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            formData.eeAnswers[idx] === opt.value
                              ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                              : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                          }`}
                        >
                          <span className="text-base sm:text-lg font-bold">{opt.value}</span>
                          <span className="text-[10px] sm:text-[11px] leading-none text-center truncate w-full">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto text-on-surface-variant font-label-md hover:text-primary flex items-center justify-center gap-2 group transition-all py-3"
                >
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  ย้อนกลับ
                </button>
                <button
                  type="button"
                  onClick={handleNext2}
                  className="w-full sm:w-auto bg-primary text-white px-12 py-4 rounded-xl font-headline-md hover:bg-primary-container shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  ถัดไป
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Cynicism (CY - 9 Items) */}
        {step === 3 && (
          <div className="space-y-stack-lg transition-all duration-300">
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">sentiment_very_dissatisfied</span>
                ส่วนที่ 2: ด้านการเมินเฉยและการลดค่าความเป็นบุคคล (Cynicism / Depersonalization)
              </h2>
              
              <p className="text-on-surface-variant font-label-md">
                โปรดเลือกตอบคำถามที่ตรงกับตัวคุณมากที่สุดในช่วงที่ผ่านมา (คำอธิบายช้อยส์: 1 = ไม่เลย, 2 = นานๆ ครั้ง, 3 = บางครั้ง, 4 = บ่อย, 5 = บ่อยมาก)
              </p>

              <div className="space-y-6 mt-6">
                {cyQuestions.map((qText, idx) => (
                  <div 
                    key={idx}
                    id={`q-cyAnswers-${idx}`}
                    className={`p-5 rounded-xl border transition-all duration-300 space-y-4 ${
                      invalidFields.includes(`cyAnswers-${idx}`)
                        ? 'border-error bg-error-container/5 ring-1 ring-error'
                        : 'border-outline-variant/30 bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-body-lg text-on-surface text-left font-semibold">{qText} <span className="text-error font-bold">*</span></p>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                      {likertChoices.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleArrayInputChange('cyAnswers', idx, opt.value)}
                          className={`py-3 px-1 border rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            formData.cyAnswers[idx] === opt.value
                              ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                              : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                          }`}
                        >
                          <span className="text-base sm:text-lg font-bold">{opt.value}</span>
                          <span className="text-[10px] sm:text-[11px] leading-none text-center truncate w-full">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto text-on-surface-variant font-label-md hover:text-primary flex items-center justify-center gap-2 group transition-all py-3"
                >
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  ย้อนกลับ
                </button>
                <button
                  type="button"
                  onClick={handleNext3}
                  className="w-full sm:w-auto bg-primary text-white px-12 py-4 rounded-xl font-headline-md hover:bg-primary-container shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  ถัดไป
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Reduced Efficacy (RE - 9 Items) */}
        {step === 4 && (
          <div className="space-y-stack-lg transition-all duration-300">
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">stars</span>
                ส่วนที่ 3: ด้านความรู้สึกไม่ประสบความสำเร็จและประสิทธิภาพลดลง (Reduced Efficacy)
              </h2>
              
              <p className="text-on-surface-variant font-label-md">
                โปรดเลือกตอบคำถามที่ตรงกับตัวคุณมากที่สุดในช่วงที่ผ่านมา (คำอธิบายช้อยส์: 1 = ไม่เลย, 2 = นานๆ ครั้ง, 3 = บางครั้ง, 4 = บ่อย, 5 = บ่อยมาก)
              </p>

              <div className="space-y-6 mt-6">
                {reQuestions.map((qText, idx) => (
                  <div 
                    key={idx}
                    id={`q-reAnswers-${idx}`}
                    className={`p-5 rounded-xl border transition-all duration-300 space-y-4 ${
                      invalidFields.includes(`reAnswers-${idx}`)
                        ? 'border-error bg-error-container/5 ring-1 ring-error'
                        : 'border-outline-variant/30 bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-body-lg text-on-surface text-left font-semibold">
                        {qText} <span className="text-error font-bold">*</span>
                        {idx >= 5 && <span className="text-primary font-medium text-label-sm ml-2">(เชิงบวก - คำนวณแบบกลับคะแนน)</span>}
                      </p>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                      {likertChoices.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleArrayInputChange('reAnswers', idx, opt.value)}
                          className={`py-3 px-1 border rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            formData.reAnswers[idx] === opt.value
                              ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                              : 'border-outline-variant text-on-surface-variant hover:border-primary hover:bg-surface-container'
                          }`}
                        >
                          <span className="text-base sm:text-lg font-bold">{opt.value}</span>
                          <span className="text-[10px] sm:text-[11px] leading-none text-center truncate w-full">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto text-on-surface-variant font-label-md hover:text-primary flex items-center justify-center gap-2 group transition-all py-3"
                >
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary text-white px-12 py-4 rounded-xl font-headline-md hover:bg-primary-container shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  ส่งแบบประเมิน
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Security Statement */}
      <div className="mt-20 flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto opacity-80">
        <div className="w-full md:w-1/2">
          <img 
            alt="A calming student illustrations"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFb28roVh425qfiy7eR3yhoUR3WsB-B5gClAKTBH-bxJv2EBfRZ4QDBS7ASV6AejF_wG7D16044wkNFLgWfBk0sWOnMlIm-yq6xp0dbB4NfpQPwSaJHvf20tgbLDS1O3vFbmG8ziSwGmWVnfOpvQhfMZUxaaL9dYpP6Wp2SDCb_KPge7lWH4vA-n1aFefDy0C0E5qF9t-yvIkOsXBRuPEkTvfaleffB418nDMYp3pBbqjORN5fpyNleEKWM5zQOf-YdhTq3ChTLw"
            className="w-full h-auto rounded-2xl border border-outline-variant/30"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="font-headline-md text-headline-md text-secondary">ข้อมูลของคุณจะถูกรักษาเป็นความลับสูงสุด</h3>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลทั้งหมดจะถูกใช้เพื่อประมวลผลความเสี่ยงเบื้องต้นในระดับของเว็บเบราว์เซอร์เท่านั้น 
            ไม่มีการเชื่อมต่อ API ไปยังระบบเซิร์ฟเวอร์ภายนอก ทำให้มั่นใจได้ว่าข้อมูลส่วนบุคคลของคุณได้รับการจัดเก็บตามมาตรฐานความปลอดภัย PDPA
          </p>
        </div>
      </div>
    </main>
  );
}
