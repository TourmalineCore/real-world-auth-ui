/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

function Button({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx('button', className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
