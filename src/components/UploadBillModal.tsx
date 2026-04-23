import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2, Zap, Copy, Check, Download } from 'lucide-react';

const API_BASE = 'https://fearless-achievement-production.up.railway.app/api/clarity-price';

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  insurance_eob: 'Insurance Explanation of Benefits',
  hospital_bill: 'Hospital Bill',
  lab_bill: 'Lab Bill',
  pharmacy_bill: 'Pharmacy Bill',
  dental_bill: 'Dental Bill',
  medical_bill: 'Medical Bill',
  clinic_bill: 'Clinic Bill',
  specialist_bill: 'Specialist Bill',
};

const ASSESSMENT_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  fair: { bg: 'bg-green-100', text: 'text-green-700', label: 'Fair' },
  high: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'High' },
  very_high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Very High' },
  extreme: { bg: 'bg-red-100', text: 'text-red-700', label: 'Extreme' },
};

function formatMoney(amount: number | undefined | null): string {
  if (amount == null) return '$0.00';
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface UploadBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFile?: File | null;
  onFileConsumed?: () => void;
}

export default function UploadBillModal({ isOpen, onClose, initialFile, onFileConsumed }: UploadBillModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success' | 'error' | 'details'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = useCallback(async (fileToAnalyze?: File) => {
    const targetFile = fileToAnalyze || file;
    if (!targetFile) return;
    if (fileToAnalyze) setFile(fileToAnalyze);
    setStatus('uploading');

    try {
      const headers = { 'x-user-id': 'anonymous' };

      const formData = new FormData();
      formData.append('image', targetFile);

      const uploadRes = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed with status ${uploadRes.status}`);
      }

      const { billId } = await uploadRes.json();
      setStatus('analyzing');

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          clearInterval(interval);
          reject(new Error('Analysis timed out after 3 minutes'));
        }, 3 * 60 * 1000);

        const interval = setInterval(async () => {
          try {
            const pollRes = await fetch(`${API_BASE}/bills/${billId}`, { headers });

            if (!pollRes.ok) {
              throw new Error(`Poll failed with status ${pollRes.status}`);
            }

            const data = await pollRes.json();

            if (data.bill?.status === 'complete' || data.bill?.status === 'completed') {
              clearInterval(interval);
              clearTimeout(timeout);
              setAnalysisResult(data.bill);
              setStatus('success');
              resolve();
            } else if (data.bill?.status === 'failed') {
              clearInterval(interval);
              clearTimeout(timeout);
              reject(new Error('Analysis failed'));
            }
          } catch (err) {
            clearInterval(interval);
            clearTimeout(timeout);
            reject(err);
          }
        }, 3000);
      });
    } catch {
      setStatus('error');
    }
  }, [file]);

  useEffect(() => {
    if (initialFile && isOpen) {
      startAnalysis(initialFile);
      onFileConsumed?.();
    }
  }, [initialFile, isOpen]);

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setAnalysisResult(null);
    setCopied(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleCopyScript = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (status === 'details') {
      contentRef.current?.scrollTo(0, 0);
    }
  }, [status]);

  const handleDownloadReport = () => {
    const provider = analysisResult?.provider;
    const providerName = provider?.providerName || 'Unknown Provider';
    const serviceDate = provider?.serviceDate
      ? new Date(provider.serviceDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const assessmentColor = (assessment: string) => {
      switch (assessment) {
        case 'fair': return '#16a34a';
        case 'high': return '#d97706';
        case 'very_high': return '#ea580c';
        case 'extreme': return '#dc2626';
        default: return '#6b7280';
      }
    };

    const lineItemRows = (analysisResult?.lineItems || []).map((item: any, i: number) => {
      const style = ASSESSMENT_STYLES[item.analysis?.assessment] || ASSESSMENT_STYLES.fair;
      const color = assessmentColor(item.analysis?.assessment);
      return `
        <tr style="background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px;">
            ${item.description}
            ${item.analysis?.reasoning ? `<br><span style="color: #9ca3af; font-size: 11px;">${item.analysis.reasoning}</span>` : ''}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: center; color: #6b7280;">${item.cptCode || '—'}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: right; font-weight: 600;">${formatMoney(item.billedAmount)}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: right; color: #6b7280;">${formatMoney(item.referencePricing?.fairPriceRange?.low)} — ${formatMoney(item.referencePricing?.fairPriceRange?.high)}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: center;">
            <span style="display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; color: ${color}; background: ${color}15;">${style.label}</span>
          </td>
        </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Findr Analysis - ${providerName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <!-- Header -->
  <div style="background: #1a1a2e; color: white; padding: 40px 48px;">
    <div style="font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Findr Health</div>
    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 3px; opacity: 0.6; margin-top: 4px;">Document Analysis Report</div>
  </div>

  <div style="padding: 40px 48px;">
    <!-- Provider Info -->
    <div style="margin-bottom: 32px;">
      <div style="font-size: 24px; font-weight: 700; margin-bottom: 4px;">${providerName}</div>
      <div style="font-size: 14px; color: #6b7280;">${documentTypeLabel}${serviceDate ? ` &middot; ${serviceDate}` : ''}</div>
    </div>

    ${provider?.verdictMessage ? `
    <div style="padding: 16px 20px; border-radius: 12px; margin-bottom: 32px; font-size: 14px; font-weight: 600; ${isOvercharged ? 'background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca;' : 'background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;'}">
      ${provider.verdictMessage}
    </div>` : ''}

    <!-- Summary -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 36px;">
      <tr>
        <td style="width: 25%; padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px 0 0 8px;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af; font-weight: 700; margin-bottom: 6px;">Total Billed</div>
          <div style="font-size: 22px; font-weight: 700;">${formatMoney(analysisResult?.totalBilled)}</div>
        </td>
        <td style="width: 25%; padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af; font-weight: 700; margin-bottom: 6px;">Fair Market</div>
          <div style="font-size: 22px; font-weight: 700;">${formatMoney(provider?.totalEstimatedFair)}</div>
        </td>
        <td style="width: 25%; padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af; font-weight: 700; margin-bottom: 6px;">Your Responsibility</div>
          <div style="font-size: 22px; font-weight: 700;">${formatMoney(provider?.patientResponsibility)}</div>
        </td>
        <td style="width: 25%; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0 8px 8px 0;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #16a34a; font-weight: 700; margin-bottom: 6px;">Potential Savings</div>
          <div style="font-size: 22px; font-weight: 700; color: #16a34a;">${formatMoney(potentialSavings)}</div>
        </td>
      </tr>
    </table>

    ${analysisResult?.lineItems?.length ? `
    <!-- Charges Breakdown -->
    <div style="margin-bottom: 36px;">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Charges Breakdown</div>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 10px 16px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280; font-weight: 700; border-bottom: 2px solid #e5e7eb;">Service</th>
            <th style="padding: 10px 16px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280; font-weight: 700; border-bottom: 2px solid #e5e7eb;">CPT</th>
            <th style="padding: 10px 16px; text-align: right; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280; font-weight: 700; border-bottom: 2px solid #e5e7eb;">Billed</th>
            <th style="padding: 10px 16px; text-align: right; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280; font-weight: 700; border-bottom: 2px solid #e5e7eb;">Fair Range</th>
            <th style="padding: 10px 16px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280; font-weight: 700; border-bottom: 2px solid #e5e7eb;">Assessment</th>
          </tr>
        </thead>
        <tbody>${lineItemRows}</tbody>
      </table>
    </div>` : ''}

    ${analysisResult?.explanation ? `
    <!-- Explanation -->
    <div style="margin-bottom: 36px;">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">What This Means</div>
      <div style="font-size: 14px; color: #374151; line-height: 1.7; padding: 20px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">${analysisResult.explanation}</div>
    </div>` : ''}

    ${analysisResult?.callScript ? `
    <!-- Call Script -->
    <div style="margin-bottom: 36px;">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">What To Say When You Call</div>
      <div style="font-size: 13px; color: #374151; line-height: 1.7; padding: 20px; background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a; white-space: pre-wrap;">${analysisResult.callScript}</div>
    </div>` : ''}

    ${analysisResult?.negotiationScript ? `
    <!-- Negotiation Script -->
    <div style="margin-bottom: 36px;">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">Negotiation Script</div>
      <div style="font-size: 13px; color: #374151; line-height: 1.7; padding: 20px; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0; white-space: pre-wrap;">${analysisResult.negotiationScript}</div>
    </div>` : ''}
  </div>

  <!-- Footer -->
  <div style="padding: 24px 48px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 11px; display: flex; justify-content: space-between;">
    <span>Generated by Findr Health &mdash; findrhealth.com</span>
    <span>${generatedDate}</span>
  </div>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  const overchargedItems = (analysisResult?.lineItems || []).filter(
    (item: any) => item.analysis?.assessment !== 'fair' && item.billedAmount > (item.referencePricing?.fairPriceRange?.high || 0)
  );

  const potentialSavings = analysisResult?.potentialSavings
    ?? overchargedItems.reduce((sum: number, item: any) => sum + (item.billedAmount - (item.referencePricing?.fairPriceRange?.high || 0)), 0);

  const documentTypeLabel = DOCUMENT_TYPE_LABELS[analysisResult?.provider?.documentType] || analysisResult?.provider?.documentType || 'Medical Document';

  const isOvercharged = potentialSavings > 0 || overchargedItems.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pt-24 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full bg-white rounded-[3rem] shadow-2xl relative overflow-hidden pointer-events-auto max-h-[85vh] flex flex-col ${status === 'details' ? 'max-w-2xl' : 'max-w-xl'}`}
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between shrink-0">
                <div>
                   <h2 className="text-2xl font-display font-bold">
                     {status === 'details' ? 'Full Analysis' : 'Analyze Your Document'}
                   </h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Findr Document Intelligence</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div ref={contentRef} className="p-10 overflow-y-auto">
                {status === 'idle' && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-16 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-findr/30 hover:bg-findr-light/10 transition-all group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-findr group-hover:scale-110 transition-all shadow-sm">
                       {file ? <FileText size={40} /> : <Upload size={40} />}
                    </div>
                    <div className="text-center">
                       <p className="text-lg font-bold mb-1">
                         {file ? file.name : "Choose a file or drag it here — bills, EOBs, denial letters, statements"}
                       </p>
                       <p className="text-sm text-gray-400 font-medium tracking-tight">Supports PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
                )}

                {(status === 'uploading' || status === 'analyzing') && (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="relative mb-10">
                       <div className="w-32 h-32 border-4 border-gray-100 rounded-full" />
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-4 border-t-findr border-r-transparent border-b-transparent border-l-transparent rounded-full"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <FileText size={40} className="text-findr" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">
                      {status === 'uploading' ? "Uploading securely..." : "Reading your document..."}
                    </h3>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto">
                      We're identifying what type of document this is, extracting the details, and figuring out what it means for you.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-10">
                       <AlertCircle size={48} />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">Something went wrong</h3>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto mb-8">
                      We couldn't process this document. It may be a format we don't support yet, or it took too long to analyze. Try uploading a clearer image or a PDF.
                    </p>
                    <button
                      onClick={reset}
                      className="px-8 py-4 bg-black text-white rounded-2xl font-black text-lg hover:bg-cobalt transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {status === 'success' && (
                  <div className="py-6 flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-zest rounded-full flex items-center justify-center text-black mb-6 shadow-xl shadow-zest/20"
                    >
                       <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold mb-2 tracking-tight">Analysis Complete!</h3>
                    {analysisResult?.provider?.providerName && (
                      <p className="text-gray-500 font-medium mb-4">
                        {analysisResult.provider.providerName} — {documentTypeLabel}
                      </p>
                    )}
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-8 w-full text-left">
                       <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">What We Found</span>
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase">
                            {overchargedItems.length} Found
                          </span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">Potential Savings</span>
                          <span className="text-3xl font-display font-bold text-findr">
                            {formatMoney(potentialSavings)}
                          </span>
                       </div>
                    </div>
                    <button onClick={() => setStatus('details')} className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-cobalt transition-colors group">
                       View Full Analysis <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}

                {status === 'details' && analysisResult && (
                  <div className="space-y-8">
                    {/* Back button */}
                    <button
                      onClick={() => setStatus('success')}
                      className="flex items-center gap-2 text-gray-500 hover:text-black font-bold text-sm transition-colors"
                    >
                      <ArrowLeft size={16} /> Back to Summary
                    </button>

                    {/* Provider header */}
                    <div>
                      <h3 className="text-2xl font-display font-bold tracking-tight">
                        {analysisResult.provider?.providerName || 'Unknown Provider'}
                      </h3>
                      <p className="text-gray-400 font-medium text-sm mt-1">{documentTypeLabel}</p>
                      {analysisResult.provider?.serviceDate && (
                        <p className="text-gray-400 text-sm mt-1">
                          Service Date: {new Date(analysisResult.provider.serviceDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                      {analysisResult.provider?.verdictMessage && (
                        <div className={`mt-4 p-4 rounded-2xl text-sm font-bold ${isOvercharged ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                          {analysisResult.provider.verdictMessage}
                        </div>
                      )}
                    </div>

                    {/* Summary bar */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Billed</p>
                        <p className="text-xl font-display font-bold">{formatMoney(analysisResult.totalBilled)}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fair Market</p>
                        <p className="text-xl font-display font-bold">{formatMoney(analysisResult.provider?.totalEstimatedFair)}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Your Responsibility</p>
                        <p className="text-xl font-display font-bold">{formatMoney(analysisResult.provider?.patientResponsibility)}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Potential Savings</p>
                        <p className="text-xl font-display font-bold text-green-700">{formatMoney(potentialSavings)}</p>
                      </div>
                    </div>

                    {/* Line items */}
                    {analysisResult.lineItems?.length > 0 && (
                      <div>
                        <h4 className="text-lg font-display font-bold mb-4">Charges Breakdown</h4>
                        <div className="space-y-3">
                          {analysisResult.lineItems.map((item: any, i: number) => {
                            const style = ASSESSMENT_STYLES[item.analysis?.assessment] || ASSESSMENT_STYLES.fair;
                            return (
                              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div>
                                    <p className="font-bold text-sm">
                                      {item.description}
                                      {item.cptCode && <span className="text-gray-400 font-medium ml-1">({item.cptCode})</span>}
                                    </p>
                                  </div>
                                  <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-black uppercase ${style.bg} ${style.text}`}>
                                    {style.label}
                                  </span>
                                </div>
                                <div className="flex gap-6 text-sm">
                                  <div>
                                    <span className="text-gray-400">Billed: </span>
                                    <span className="font-bold">{formatMoney(item.billedAmount)}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Fair: </span>
                                    <span className="font-bold">
                                      {formatMoney(item.referencePricing?.fairPriceRange?.low)} — {formatMoney(item.referencePricing?.fairPriceRange?.high)}
                                    </span>
                                  </div>
                                </div>
                                {item.analysis?.reasoning && (
                                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.analysis.reasoning}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {analysisResult.explanation && (
                      <div>
                        <h4 className="text-lg font-display font-bold mb-4">What This Means</h4>
                        <p className="text-gray-600 leading-relaxed">{analysisResult.explanation}</p>
                      </div>
                    )}

                    {/* Call Script */}
                    {analysisResult.callScript && (
                      <div>
                        <h4 className="text-lg font-display font-bold mb-4">What To Say When You Call</h4>
                        <div className="relative p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap pr-10">{analysisResult.callScript}</p>
                          <button
                            onClick={() => handleCopyScript(analysisResult.callScript)}
                            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-200 transition-colors"
                            title="Copy script"
                          >
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-400" />}
                          </button>
                          {copied && (
                            <p className="text-xs text-green-600 font-bold mt-2">Copied!</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Negotiation Script */}
                    {analysisResult.negotiationScript && (
                      <div>
                        <h4 className="text-lg font-display font-bold mb-4">Negotiation Script</h4>
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{analysisResult.negotiationScript}</p>
                        </div>
                      </div>
                    )}

                    {/* Download Report */}
                    <div>
                      <button
                        onClick={handleDownloadReport}
                        className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-cobalt transition-colors group"
                      >
                        <Download size={20} /> Download Report
                      </button>
                      <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-3">Opens print dialog — select "Save as PDF"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {status === 'idle' && (
                <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex flex-col py-6 shrink-0">
                  <button
                    disabled={!file}
                    onClick={() => startAnalysis()}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                      file
                        ? "bg-findr text-white hover:bg-black shadow-findr/20"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    Start Analysis <Zap size={20} />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-black uppercase tracking-widest mt-6">
                     100% HIPAA SECURE & ENCRYPTED
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
