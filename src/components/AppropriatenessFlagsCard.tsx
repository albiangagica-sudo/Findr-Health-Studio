import React, { useState } from 'react';

type AppropriatenessFlagMessage = {
  headline?: string;
  actionPrompt?: string;
  observation?: string;
  context?: string;
  conditional?: string;
  action?: string;
};

type AppropriatenessFlag = {
  type?: string;
  category?: string;
  variant?: string | null;
  affectedLineItemIds?: string[];
  message?: AppropriatenessFlagMessage;
};

type LineItemReference = {
  _id?: string;
  description?: string;
};

type Props = {
  flags?: AppropriatenessFlag[];
  lineItems?: LineItemReference[];
};

function resolveLineItemDescription(id: string, lineItems: LineItemReference[]): string | null {
  if (!id || !lineItems) return null;
  // Try exact _id match first (Mongoose ObjectId case)
  const byId = lineItems.find(item => item._id === id);
  if (byId?.description) return byId.description;
  // Fall back: parse 'line_N' synthetic ID and use array index
  const match = id.match(/^line_(\d+)$/);
  if (match) {
    const index = parseInt(match[1], 10);
    if (lineItems[index]?.description) return lineItems[index].description;
  }
  return null;
}

export default function AppropriatenessFlagsCard({ flags, lineItems }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (!flags || flags.length === 0) return null;

  const toggleExpand = (index: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="bg-[#F7EBFF] rounded-2xl p-4 my-4">
      <h2 className="text-base font-bold mb-3" style={{ color: '#6829FF' }}>
        Things worth asking about
      </h2>

      <div className="space-y-4">
        {flags.map((flag, index) => {
          const message = flag.message || {};
          const isExpanded = expanded.has(index);

          const affectedDescriptions = (flag.affectedLineItemIds || [])
            .map(id => resolveLineItemDescription(id, lineItems || []))
            .filter((d): d is string => !!d);

          return (
            <div key={index} className="bg-white rounded-xl p-4 space-y-3">
              {message.headline && (
                <p className="text-sm font-bold text-gray-900 leading-relaxed">
                  {message.headline}
                </p>
              )}

              {affectedDescriptions.length > 0 && (
                <p className="text-xs text-gray-500">
                  {affectedDescriptions.join(', ')}
                </p>
              )}

              {message.actionPrompt && (
                <div
                  className="border rounded-lg p-3 bg-white"
                  style={{ borderColor: '#6829FF' }}
                >
                  <p className="text-sm font-medium" style={{ color: '#6829FF' }}>
                    {message.actionPrompt}
                  </p>
                </div>
              )}

              <button
                onClick={() => toggleExpand(index)}
                className="text-xs font-medium hover:underline"
                style={{ color: '#2E5BFF' }}
              >
                {isExpanded ? 'Less ↑' : 'More about this ↓'}
              </button>

              {isExpanded && (
                <div className="space-y-3 pt-2 border-t border-gray-200">
                  {message.context && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {message.context}
                    </p>
                  )}
                  {message.conditional && (
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      {message.conditional}
                    </p>
                  )}
                  {message.action && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {message.action}
                    </p>
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
