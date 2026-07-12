type GuillocheProps = {
  color?: string;
  opacity?: number;
  className?: string;
};

export default function Guilloche({ color = "#1f3d2f", opacity = 0.14, className }: GuillocheProps) {
  const id = "guilloche-pattern";
  return (
    <svg
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="120" height="60" patternUnits="userSpaceOnUse">
          <g stroke={color} fill="none" strokeWidth="0.7" opacity={opacity}>
            <path d="M-10 30 Q 20 0, 50 30 T 110 30 T 170 30" />
            <path d="M-10 20 Q 20 -10, 50 20 T 110 20 T 170 20" />
            <path d="M-10 40 Q 20 10, 50 40 T 110 40 T 170 40" />
            <path d="M-10 10 Q 20 -20, 50 10 T 110 10 T 170 10" />
            <path d="M-10 50 Q 20 20, 50 50 T 110 50 T 170 50" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
