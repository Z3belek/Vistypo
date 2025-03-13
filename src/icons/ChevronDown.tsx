import type { FC, SVGProps } from 'react';

type IconProps = {
  className?: string;
  fill?: string;
} & SVGProps<SVGSVGElement>;

export const ChevronDown: FC<IconProps> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);