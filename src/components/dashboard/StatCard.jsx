const COLORS = {
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-600",    value: "text-blue-700"   },
  green:  { bg: "bg-green-50",  icon: "bg-green-100 text-green-600",   value: "text-green-700"  },
  amber:  { bg: "bg-amber-50",  icon: "bg-amber-100 text-amber-600",   value: "text-amber-700"  },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", value: "text-purple-700" },
};

export default function StatCard({ icon, label, value, sub, color = "blue" }) {
  const c = COLORS[color] ?? COLORS.blue;

  return (
    <div className={`animate-fade-up rounded-2xl border border-gray-100 ${c.bg} p-4 sm:p-5 flex items-start gap-3 sm:gap-4`}>
      <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg ${c.icon}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide truncate">
          {label}
        </p>
        <p className={`text-xl sm:text-2xl font-extrabold mt-0.5 tabular-nums leading-none ${c.value}`}>
          {value}
        </p>
        {sub && (
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
        )}
      </div>
    </div>
  );
}
