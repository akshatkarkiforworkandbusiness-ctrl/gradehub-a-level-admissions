"use client";

import { useEffect, useState } from "react";
import { AlertCircle, FileText, Download, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
  const [data, setData] = useState<any>(null);
  const [downloading, setDownloading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generatePDF = () => {
    setDownloading(true);
    setErrorMsg(null);
    import("html2pdf.js").then((html2pdf) => {
      const element = document.getElementById("report-container");
      if (!element) {
        setErrorMsg("Failed to find report container.");
        setDownloading(false);
        return;
      }
      const opt: any = {
        margin:       0.3,
        filename:     'My_Grade_Tracking_Summary.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      try {
        const pdfObj = html2pdf.default || html2pdf;
        pdfObj().from(element).set(opt).save().then(() => {
          setDownloading(false);
        }).catch((err: any) => {
          console.error("PDF Save Error:", err);
          setErrorMsg("Failed to generate PDF automatically. You can print manually using Ctrl+P.");
          setDownloading(false);
        });
      } catch(err) {
         console.error("html2pdf initialization error:", err);
         setErrorMsg("Failed to initialize PDF engine. You can print manually using Ctrl+P.");
         setDownloading(false);
      }
    }).catch(err => {
      console.error("Failed to import html2pdf:", err);
      setErrorMsg("Failed to load PDF library.");
      setDownloading(false);
    });
  };

  useEffect(() => {
    document.body.className = "bg-gray-100 text-black";
    const stored = sessionStorage.getItem("predictedReportData");
    if (stored) {
      setData(JSON.parse(stored));
      setTimeout(() => {
        generatePDF();
      }, 500);
    } else {
      setDownloading(false);
    }
  }, []);

  if (!data) {
    return (
      <div className="p-10 font-sans text-center text-gray-600 bg-white min-h-screen flex flex-col items-center justify-center">
        <FileText size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">No Grade Tracking Data Found</h2>
        <p className="text-sm text-gray-500 mb-6">Please calculate your UMS or subject predictions on the Grade Predictor tool first.</p>
        <Link href="/grade-predictor" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Go to Grade Predictor
        </Link>
      </div>
    );
  }

  const {
    reportType,
    studentName,
    teacherEval,
    currentUms,
    maxUms,
    totalA2Ums,
    targetGrade,
    requiredRemaining,
    isPossible,
    subjects
  } = data;

  const dateStr = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen py-8 font-sans">
      {downloading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-3 animate-pulse text-sm font-medium">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Generating PDF Summary...
        </div>
      )}

      {errorMsg && !downloading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-4 text-xs font-medium">
          <span>{errorMsg}</span>
          <button onClick={() => window.print()} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs transition-colors">
            Print Manually
          </button>
        </div>
      )}

      {/* Control Action Bar */}
      <div className="mb-6 flex items-center gap-4">
        <Link href="/grade-predictor" className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm">
          <ArrowLeft size={14} /> Back to Predictor
        </Link>
        <button onClick={() => window.print()} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm">
          <Printer size={14} /> Print
        </button>
        <button onClick={generatePDF} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm">
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* A4 Document Container */}
      <div id="report-container" className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10 relative shadow-xl overflow-hidden flex flex-col rounded-sm">
        
        {/* Header Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-md text-[11px] leading-relaxed mb-6 font-medium flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Student Planning Document:</strong> This document is a self-generated personal study tracking summary created on GradeHub. It is intended for student planning purposes only and is <u>not valid</u> for official examination board or university verification.
          </div>
        </div>

        {/* Title */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">My Grade Tracking & UMS Projection Summary</h1>
            <p className="text-xs text-gray-600">Personal Academic Target & Study Projection</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p><strong>Generated On:</strong> {dateStr}</p>
            <p><strong>Student Name:</strong> {studentName || "A-Level Student"}</p>
          </div>
        </div>

        {/* Grade Breakdown Table */}
        <div className="mb-8">
          <h2 className="text-sm font-serif font-bold mb-3 uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">
            Grade & Target Projections
          </h2>
          
          <table className="w-full text-left text-xs mb-4 border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-800 bg-gray-50">
                <th className="py-2.5 px-3 font-bold text-gray-900">Subject</th>
                <th className="py-2.5 px-3 font-bold text-gray-900">AS Achieved / Current</th>
                <th className="py-2.5 px-3 font-bold text-gray-900">Target A2 Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportType === "subject" ? (
                subjects?.map((sub: any, i: number) => (
                  <tr key={i}>
                    <td className="py-3 px-3 font-medium text-gray-900">
                      {sub.name || `Subject ${i+1}`}
                      {sub.isAsOnly && <span className="ml-2 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">AS Level Only</span>}
                    </td>
                    <td className="py-3 px-3 uppercase text-gray-700">{sub.asGrade}</td>
                    <td className="py-3 px-3 font-bold text-sm text-gray-900">
                      {sub.predictedGrade === "N/A (AS Level)" ? (
                        <span className="text-xs font-normal italic text-gray-500">N/A (AS Level Only)</span>
                      ) : (
                        sub.predictedGrade
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-3 font-medium text-gray-900">Advanced Level UMS Projection</td>
                  <td className="py-3 px-3 text-gray-700">{currentUms} / {maxUms} UMS</td>
                  <td className="py-3 px-3 font-bold text-sm text-gray-900">{isPossible ? targetGrade : "N/A"}</td>
                </tr>
              )}
            </tbody>
          </table>

          {reportType === "ums" ? (
            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded text-xs text-gray-700 leading-relaxed">
              <strong>UMS Math Projection:</strong> Based on official Pearson Edexcel / CAIE IAL regulations, achieving target grade <strong>{targetGrade}</strong> requires <strong>{requiredRemaining} UMS marks</strong> in remaining A2 modules (out of {parseInt(totalA2Ums) - parseInt(maxUms)} available).
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded text-xs text-gray-700 leading-relaxed">
              <strong>Personal Tracking Note:</strong> These target grade entries reflect your personal academic study goals and prior AS performance.
            </div>
          )}
        </div>

        {/* Study Notes */}
        {teacherEval && (
          <div className="mb-8">
            <h2 className="text-sm font-serif font-bold mb-3 uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">
              Personal Study & Strategy Notes
            </h2>
            <div className="text-xs text-gray-800 leading-relaxed bg-gray-50 p-3.5 rounded border border-gray-200 whitespace-pre-wrap">
              "{teacherEval}"
            </div>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="mt-auto pt-6 border-t border-gray-300 text-center text-[10px] text-gray-500 space-y-1">
          <p>GradeHub Student Planning Tool &copy; {new Date().getFullYear()}. All calculations are estimates for personal organization.</p>
          <p>Not affiliated with UCAS, Pearson Edexcel, CAIE, AQA, OCR, or any university admissions board.</p>
        </div>

      </div>
    </div>
  );
}
