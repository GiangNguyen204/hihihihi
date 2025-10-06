import React from 'react';

interface Member {
  id: number;
  name: string;
  role: string;
  quote?: string;
  avatar?: string;
}

const PersonCard = ({ member }: { member: Member }) => {
  const [showQuote, setShowQuote] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const startHover = () => {
    if (!member.quote) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setShowQuote(true);
      timerRef.current = null;
    }, 800);
  };

  const endHover = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowQuote(false);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center group relative z-20"
      onMouseEnter={startHover}
      onMouseLeave={endHover}
      onFocus={startHover}
      onBlur={endHover}
      tabIndex={0}
      aria-describedby={member.quote ? `quote-${member.id}` : undefined}
    >
      {member?.quote && (
        <div
          id={`quote-${member.id}`}
          role="status"
          className={`absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 w-64 px-5 py-4 rounded-2xl pointer-events-none transition-all duration-300 ease-out ${
            showQuote ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
          }`}
          style={{
            zIndex: 50,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRight: '1px solid rgba(255, 255, 255, 0.8)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          />

          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            <p className="text-sm leading-relaxed text-gray-700 font-medium">{member.quote}</p>
          </div>
        </div>
      )}

      <div className="relative">
        <div
          className="relative overflow-hidden rounded-full w-32 h-32 lg:w-36 lg:h-36 transition-all duration-300  group-hover:scale-105"
          style={{
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
            background: '#2B7FFF',
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
              animation: 'spin 3s linear infinite',
              padding: '3px',
            }}
          >
            <div className="w-full h-full rounded-full bg-white" />
          </div>

          <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
            <img
              src={member.avatar || 'https://i.pravatar.cc/150?img=0'}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>

        {member.quote && (
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-4 text-center px-2 transition-all duration-300 group-hover:transform group-hover:-translate-y-0.5">
        <p className="font-bold text-blue-900 text-lg md:text-xl whitespace-nowrap mb-1 transition-colors duration-300 group-hover:text-blue-600">
          {member.role}
        </p>
        <p className="text-gray-600 text-base md:text-lg whitespace-nowrap transition-colors duration-300 group-hover:text-gray-800">
          {member.name}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PersonCard;
