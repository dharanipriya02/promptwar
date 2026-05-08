import React, { useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';
import { useTranslate } from '../../hooks/useTranslate';

function TranslateButton({ text, onTranslated }) {
  const { translate, loading } = useTranslate();
  const [isTranslated, setIsTranslated] = useState(false);
  const [originalText] = useState(text);

  const handleTranslate = async () => {
    if (isTranslated) {
      onTranslated(originalText);
      setIsTranslated(false);
      return;
    }

    const translated = await translate(text);
    if (translated && translated !== text) {
      onTranslated(translated);
      setIsTranslated(true);
    }
  };

  return (
    <button 
      className={`translate-btn glass ${isTranslated ? 'active' : ''}`} 
      onClick={handleTranslate}
      disabled={loading}
      title={isTranslated ? "Show original" : "Translate to your language"}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Languages size={14} />
      )}
      <span>{isTranslated ? 'Original' : 'Translate'}</span>

      <style jsx>{`
        .translate-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          transition: all var(--transition-base);
        }

        .translate-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: var(--accent-cyan-light);
          border-color: var(--accent-cyan);
        }

        .translate-btn.active {
          background: rgba(6, 182, 212, 0.1);
          color: var(--accent-cyan-light);
          border-color: var(--accent-cyan);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export default TranslateButton;
