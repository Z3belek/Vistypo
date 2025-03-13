import React, { useRef, FC, ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ children, onMouseDown, onMouseUp, onMouseLeave, ...rest }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.99)';
    }
    onMouseDown?.(event);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(1)';
    }
    onMouseUp?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(1)';
    }
    onMouseLeave?.(event);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      {...rest}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
