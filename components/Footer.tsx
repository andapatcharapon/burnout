import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-stack-lg border-t border-outline-variant/30 mt-auto no-print">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter">
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <div className="font-label-md text-label-md font-bold text-on-surface">MindCheck High School</div>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
            © 2026 MindCheck High School. แบบประเมินเบื้องต้นเท่านั้น ไม่ใช่การวินิจฉัยทางการแพทย์
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-gutter">
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:underline decoration-primary transition-all duration-200">
            Data Privacy (PDPA)
          </Link>
          <a href="tel:1323" className="font-label-sm text-label-sm font-bold text-primary hover:underline decoration-primary transition-all duration-200">
            สายด่วนสุขภาพจิต: 1323
          </a>
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:underline decoration-primary transition-all duration-200">
            Project Credits
          </Link>
        </div>
      </div>
    </footer>
  );
}
