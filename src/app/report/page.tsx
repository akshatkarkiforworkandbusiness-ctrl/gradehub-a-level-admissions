"use client";

import { useEffect, useState } from "react";

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
        margin:       0,
        filename:     'Statement_of_Predicted_Grades.pdf',
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
          setErrorMsg("Failed to generate PDF. You can try printing manually.");
          setDownloading(false);
        });
      } catch(err) {
         console.error("html2pdf initialization error:", err);
         setErrorMsg("Failed to initialize PDF engine.");
         setDownloading(false);
      }
    }).catch(err => {
      console.error("Failed to import html2pdf:", err);
      setErrorMsg("Failed to load PDF library.");
      setDownloading(false);
    });
  };

  useEffect(() => {
    document.body.className = "bg-gray-200 text-black";
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
    return <div className="p-10 font-sans text-center text-gray-500 bg-white min-h-screen">No report data found. Please generate it from the Grade Predictor.</div>;
  }

  const {
    reportType,
    studentName,
    candidateNumber,
    centerNumber,
    authPerson,
    authTitle,
    signature,
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
    <div className="flex flex-col items-center bg-gray-200 min-h-screen py-10 font-sans">
      
      {downloading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-3 animate-pulse">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Generating PDF...
        </div>
      )}

      {errorMsg && !downloading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-4">
          <span>{errorMsg}</span>
          <button 
            onClick={() => window.print()}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            Print Manually
          </button>
          <button 
            onClick={generatePDF}
            className="bg-white hover:bg-gray-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-sm transition-colors"
          >
            Retry Download
          </button>
        </div>
      )}

      {/* Manual Action Bar for easy access even when it succeeds */}
      {!downloading && !errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-4 opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">Download Complete!</span>
          <button onClick={() => window.print()} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded text-sm transition-colors">Print</button>
          <button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors">Download Again</button>
        </div>
      )}

      {/* Scaled wrapper to fit screen visually without affecting A4 print size */}
      <div style={{ transform: "scale(0.85)", transformOrigin: "top center", marginBottom: "-10%" }}>
        
        {/* Actual A4 Container */}
        <div id="report-container" className="w-[210mm] min-h-[297mm] bg-white text-black p-12 relative shadow-2xl overflow-hidden flex flex-col">
          
          {/* Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 z-0">
            <h1 className="text-8xl font-bold -rotate-45 uppercase text-black whitespace-nowrap">Predicted Report</h1>
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            {/* Header / Letterhead */}
            <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-serif font-bold text-black mb-1">Statement of Predicted Grades</h1>
                <p className="text-sm text-gray-700">Issued by Official Examination Centre</p>
              </div>
              <div className="text-right text-sm text-gray-800 space-y-1">
                <p><strong>Date of Issue:</strong> {dateStr}</p>
                <p><strong>Centre Number:</strong> {centerNumber || "Not Provided"}</p>
              </div>
            </div>

            {/* Student Details */}
            <div className="mb-10 grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg border border-gray-300">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Candidate Name</p>
                <p className="font-medium text-lg text-black">{studentName || "Not Provided"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Candidate Number</p>
                <p className="font-medium text-lg text-black">{candidateNumber || "Not Provided"}</p>
              </div>
            </div>

            {/* Grade Breakdown */}
            <div className="mb-10">
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wide border-b border-gray-300 pb-2 text-black">Academic Assessment</h2>
              
              <table className="w-full text-left mb-6 border-collapse">
                <thead>
                  <tr className="border-b-2 border-black bg-gray-50">
                    <th className="py-3 px-3 font-semibold text-black">Subject</th>
                    <th className="py-3 px-3 font-semibold text-black">AS Level Achieved</th>
                    <th className="py-3 px-3 font-semibold text-black">Predicted A-Level (A2)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportType === "subject" ? (
                    subjects?.map((sub: any, i: number) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-4 px-3 text-black font-medium">
                          {sub.name || `Subject ${i+1}`}
                          {sub.isAsOnly && <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">AS Level Only</span>}
                        </td>
                        <td className="py-4 px-3 text-black">{sub.asGrade}</td>
                        <td className="py-4 px-3 font-bold text-xl text-black">
                          {sub.predictedGrade === "N/A (AS Level)" ? (
                            <span className="text-sm font-normal italic text-gray-500">N/A (No A2 Equivalent)</span>
                          ) : (
                            sub.predictedGrade
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-3 text-black font-medium">Advanced Level (A2) UMS</td>
                      <td className="py-4 px-3 text-black">{currentUms} / {maxUms} UMS</td>
                      <td className="py-4 px-3 font-bold text-xl text-black">{isPossible ? targetGrade : "N/A"}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {reportType === "ums" ? (
                <div className="bg-gray-50 border border-gray-300 p-4 rounded text-sm text-black">
                  <strong>Basis of Prediction:</strong> The candidate requires <strong>{requiredRemaining} UMS marks</strong> in their remaining A2 units (out of {parseInt(totalA2Ums) - parseInt(maxUms)} available) to achieve the predicted grade. This prediction is based on prior AS level attainment, internal assessments, and continuous evaluation.
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-300 p-4 rounded text-sm text-black">
                  <strong>Basis of Prediction:</strong> The grades stated above represent the center's formal prediction of the candidate's final A-Level attainment. These predictions are rigorously calculated based on prior AS level examination performance, internal mock assessments, and continuous academic evaluation throughout the course.
                </div>
              )}
            </div>

            {/* Teacher Evaluation */}
            {teacherEval && (
              <div className="mb-10">
                <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wide border-b border-gray-300 pb-2 text-black">Academic Reference</h2>
                <div className="text-black leading-relaxed text-sm whitespace-pre-wrap italic bg-gray-50 p-4 rounded border border-gray-200">
                  "{teacherEval}"
                </div>
              </div>
            )}

            {/* Signatures & Authentication */}
            <div className="mt-auto pt-12 border-t-2 border-black w-full">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-4">Authorized By</p>
                  
                  <div className="h-16 mb-2 w-48 relative">
                    {signature ? (
                      <img src={signature} alt="Signature" className="h-full object-contain mix-blend-multiply absolute bottom-0" />
                    ) : (
                      <div className="w-full border-b border-dashed border-gray-400 h-full flex items-end pb-1 text-gray-500 text-xs italic">
                        (No signature provided)
                      </div>
                    )}
                  </div>
                  
                  <p className="font-bold text-black">{authPerson || "_______________________"}</p>
                  <p className="text-sm text-gray-700">{authTitle || "Official Representative"}</p>
                </div>

                <div className="text-right">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center opacity-40 mx-auto">
                    <span className="text-xs font-bold uppercase rotate-[-20deg] text-black">Official Seal</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center text-xs text-gray-500">
                This document is generated digitally. Valid only when presented alongside official awarding body certificates.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
