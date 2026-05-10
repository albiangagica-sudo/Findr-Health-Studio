import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type LineItem = {
  description?: string;
  cptCode?: string;
  billedAmount?: number;
  allowedAmount?: number | null;
  patientResponsibility?: number | null;
  additionalAmounts?: Array<{ label: string; value: number }>;
  analysis?: {
    assessment?: 'fair' | 'high' | 'very_high' | 'extreme' | 'unknown';
    reasoning?: string;
    comparedToMedicare?: number;
  };
  referencePricing?: {
    medicareRate?: number;
    fairPriceRange?: { low?: number; high?: number };
  };
  negotiationGuidance?: {
    suggestedRange?: { opening?: number; acceptable?: { low?: number; high?: number }; walkaway?: number };
    discountRange?: string;
    strategy?: string;
  };
  cptTranslation?: {
    plainName?: string;
    patientExperience?: string;
    typicalTime?: string | null;
    validationQuestion?: string;
  } | null;
};

type Props = {
  lineItems: LineItem[];
};

const VERDICT_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  fair: { bg: 'bg-green-50', text: 'text-green-700', label: 'Looks reasonable' },
  high: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'On the high side' },
  very_high: { bg: 'bg-red-50', text: 'text-red-700', label: 'Way above market' },
  extreme: { bg: 'bg-red-50', text: 'text-red-700', label: 'Way above market' },
};

function formatMoney(v: number | null | undefined): string {
  if (v == null) return '—';
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function LineItemBreakdownCard({ lineItems }: Props) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  if (!lineItems || lineItems.length === 0) return null;

  // Show the contextual subtitle only when at least one line has allowedAmount —
  // otherwise "billed" is self-explanatory and an extra line is noise.
  const anyHasAllowed = lineItems.some(item => item.allowedAmount != null);

  function toggleExpand(i: number) {
    setExpandedIndices(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div>
      <h4 className="text-lg font-display font-bold mb-1">Charges Breakdown</h4>
      {anyHasAllowed && (
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Here's what each service was billed at, what your plan allowed (the price they actually negotiated), and what's left for you.
        </p>
      )}
      {!anyHasAllowed && <div className="mb-4" />}

      <div className="space-y-3">
        {lineItems.map((item, i) => {
          const verdictKey = item.analysis?.assessment;
          const verdictStyle = verdictKey && VERDICT_STYLES[verdictKey];
          const isFlagged = verdictKey === 'high' || verdictKey === 'very_high' || verdictKey === 'extreme';
          const hasOwed = item.patientResponsibility != null;
          const hasAllowed = item.allowedAmount != null;
          const hasBilled = item.billedAmount != null;
          const additionalAmounts = item.additionalAmounts || [];
          const fairLow = item.referencePricing?.fairPriceRange?.low;
          const fairHigh = item.referencePricing?.fairPriceRange?.high;
          const hasFairRange = fairLow != null && fairHigh != null;
          const hasReasoning = !!item.analysis?.reasoning;
          const medicareMultiplier = item.analysis?.comparedToMedicare;
          const negotiationOpening = item.negotiationGuidance?.suggestedRange?.opening;

          const hasExpandContent =
            !!item.cptTranslation?.patientExperience ||
            !!item.cptTranslation?.typicalTime ||
            additionalAmounts.length > 0 ||
            hasFairRange ||
            (hasReasoning && !isFlagged) ||
            (negotiationOpening != null && isFlagged);

          const isExpanded = expandedIndices.has(i);

          let headline: string | null = null;
          let supporting: string | null = null;

          if (hasOwed) {
            headline = `You owe ${formatMoney(item.patientResponsibility)}`;
            const supportParts: string[] = [];
            if (hasBilled) supportParts.push(`${formatMoney(item.billedAmount)} billed`);
            if (hasAllowed) supportParts.push(`${formatMoney(item.allowedAmount)} allowed`);
            supporting = supportParts.length > 0 ? supportParts.join(' · ') : null;
          } else if (hasBilled) {
            headline = `${formatMoney(item.billedAmount)} billed`;
            if (hasAllowed) supporting = `${formatMoney(item.allowedAmount)} allowed`;
          }

          return (
            <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm">
                    {item.cptTranslation?.plainName || item.description || 'Service'}
                  </p>
                  {item.cptTranslation?.plainName && (item.description || item.cptCode) && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                      {item.description && item.cptCode && <span className="mx-1">·</span>}
                      {item.cptCode && <span className="font-mono">{item.cptCode}</span>}
                    </p>
                  )}
                  {!item.cptTranslation?.plainName && item.cptCode && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="font-mono">{item.cptCode}</span>
                    </p>
                  )}
                </div>
                {verdictStyle && (
                  <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-black uppercase ${verdictStyle.bg} ${verdictStyle.text}`}>
                    {verdictStyle.label}
                  </span>
                )}
              </div>

              {headline && (
                <div className="mb-2">
                  <p className="font-bold text-base">{headline}</p>
                  {supporting && (
                    <p className="text-xs text-gray-500 mt-0.5">{supporting}</p>
                  )}
                </div>
              )}

              {isFlagged && hasReasoning && (
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {item.analysis!.reasoning}
                </p>
              )}

              {hasExpandContent && (
                <button
                  onClick={() => toggleExpand(i)}
                  className="mt-3 flex items-center gap-1 text-xs font-bold text-findr hover:text-cobalt transition-colors"
                >
                  {isExpanded ? 'Hide details' : 'Show details'}
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              )}

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                  {item.cptTranslation?.patientExperience && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">What this typically involves</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.cptTranslation.patientExperience}</p>
                    </div>
                  )}

                  {item.cptTranslation?.typicalTime && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Time</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.cptTranslation.typicalTime}</p>
                    </div>
                  )}

                  {additionalAmounts.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Breakdown</p>
                      <div className="space-y-1">
                        {additionalAmounts.map((a, j) => (
                          <div key={j} className="flex justify-between text-xs">
                            <span className="text-gray-600">{a.label}</span>
                            <span className="font-medium">{formatMoney(a.value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasFairRange && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Fair price range</p>
                      <p className="text-xs">
                        <span className="font-medium">{formatMoney(fairLow)} — {formatMoney(fairHigh)}</span>
                      </p>
                    </div>
                  )}

                  {hasReasoning && !isFlagged && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Notes</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.analysis!.reasoning}</p>
                    </div>
                  )}

                  {negotiationOpening != null && isFlagged && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Negotiation</p>
                      <p className="text-xs text-gray-600">
                        Open with <span className="font-medium">{formatMoney(negotiationOpening)}</span>
                        {item.negotiationGuidance?.discountRange && (
                          <span className="text-gray-500"> · {item.negotiationGuidance.discountRange} off the billed amount</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
