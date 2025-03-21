import type { FC, SVGProps } from 'react';

type IconProps = {
  className?: string;
  fill?: string;
} & SVGProps<SVGSVGElement>;

export const Logo: FC<IconProps> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8.06" {...props}>
  <path d="M0,0h1.51s-.29,3.36,2.74,5.49c0,0,2.63-5.49,2.63-5.49h9.12s0,.68-.07,1.26h-4.98v6.36s-.69.29-1.42.41V1.28h-1.73l-2.98,6.24C-.31,5.18,0,0,0,0Z" fill="currentColor"/>
  <path className="fill-amaranth-700" d="M5.4,7.75l2.31-4.96c.23-.49.72-.81,1.27-.81h5.23s-.2.81-.47,1.26h-1.53v3.74s-.59.38-1.26.63V3.24h-1.44c-.37,0-.72.22-.87.56l-1.99,4.26s-.9-.17-1.24-.32Z"/>
</svg>
);