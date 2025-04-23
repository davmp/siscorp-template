export interface LoaderProps {
  className?: string;
  loaderClassName?: string;
  children?: React.ReactNode;
  radius?: string;
  width?: string;
}

const defaultProps = {
  radius: "40",
  width: "10",
};

export default function Loader({ className, ...props }: LoaderProps) {
  return (
    <span
      className={`absolute inset-0 bg-background/5 backdrop-blur-[2px] ${className}`}
    >
      {props.children || (
        <svg
          className={`max-w-10 max-h-10 absolute inset-0 m-auto animate-spin stroke-primary-light ${props.loaderClassName}`}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r={props.radius || defaultProps.radius}
            strokeWidth={props.width || defaultProps.width}
            strokeLinecap="round"
            className="stroke-inherit opacity-25"
          />
          <circle
            cx="50"
            cy="50"
            r={props.radius || defaultProps.radius}
            strokeWidth={props.width || defaultProps.width}
            strokeLinecap="round"
            className="stroke-inherit opacity-75"
            strokeDasharray="150 50 50 150 150 50 50 150"
          />
        </svg>
      )}
    </span>
  );
}
