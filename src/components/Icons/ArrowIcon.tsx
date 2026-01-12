interface ArrowIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function ArrowIcon({ className = "", width = 10, height = 6 }: ArrowIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.707108 0.707108L4.70711 4.70711L8.70711 0.707108"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default ArrowIcon;
