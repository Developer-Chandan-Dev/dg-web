'use client';
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';

/**
 * CustomButton — reusable Tailwind button with gradient, ring, and animation support
 *
 * Props:
 * • size:    "sm" | "md" | "lg"
 * • variant: "outline" | "solid"
 * • color:   Tailwind color (cyan, blue, etc.)
 * • gradient: Tailwind gradient class (optional)
 * • ringColor: color used for ring/border (default: same as color)
 * • border:  true | false — show or hide ring
 * • rounded: "sm" | "md" | "lg" | "xl" | "full"
 * • float:   Add GSAP float hover animation
 */
const COLOR_MAP = {
  cyan: {
    outline:
      'text-cyan-500 hover:bg-cyan-500 hover:text-white shadow-cyan-500 hover:shadow-lg',
    solid:
      'bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-500 hover:shadow-lg',
  },
  blue: {
    outline:
      'text-blue-500 hover:bg-blue-500 hover:text-white shadow-blue-500 hover:shadow-lg',
    solid:
      'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500 hover:shadow-lg',
  },
  rose: {
    outline:
      'text-rose-500 hover:bg-rose-500 hover:text-white shadow-rose-500 hover:shadow-lg',
    solid:
      'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500 hover:shadow-lg',
  },
  green: {
    outline:
      'text-green-500 hover:bg-green-500 hover:text-white shadow-green-500 hover:shadow-lg',
    solid:
      'bg-green-500 text-white hover:bg-green-600 shadow-green-500 hover:shadow-lg',
  },
  indigo: {
    outline:
      'text-indigo-500 hover:bg-indigo-500 hover:text-white shadow-indigo-500 hover:shadow-lg',
    solid:
      'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500 hover:shadow-lg',
  },
};

interface CustomButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'solid';
  color?: keyof typeof COLOR_MAP;
  gradient?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  ringColor?: string;
  border?: boolean;
  float?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

const CustomButton = ({
  size = 'md',
  variant = 'outline',
  color = 'cyan',
  gradient = '',
  rounded = 'md',
  ringColor = '',
  border = true,
  float = false,
  className = '',
  children = null,
  disabled = false,
  ...props
}: CustomButtonProps) => {
  const ring = ringColor || color;
  const showRing = border ? `ring-2 ring-${ring}-500` : '';

  const SIZE = {
    sm: 'px-[11px] py-[9px] text-sm',
    md: 'px-4 py-[10px] text-[14px]',
    lg: 'px-5 py-[14px] text-[18px]',
  };

  const ROUNDED = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const COLOR_MAP = {
    cyan: {
      outline:
        'text-cyan-500 hover:bg-cyan-500 hover:text-white shadow-cyan-500 hover:shadow-lg',
      solid:
        'bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-500 hover:shadow-lg',
    },
    blue: {
      outline:
        'text-blue-500 hover:bg-blue-500 hover:text-white shadow-blue-500 hover:shadow-lg',
      solid:
        'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500 hover:shadow-lg',
    },
    rose: {
      outline:
        'text-rose-500 hover:bg-rose-500 hover:text-white shadow-rose-500 hover:shadow-lg',
      solid:
        'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500 hover:shadow-lg',
    },
    green: {
      outline:
        'text-green-500 hover:bg-green-500 hover:text-white shadow-green-500 hover:shadow-lg',
      solid:
        'bg-green-500 text-white hover:bg-green-600 shadow-green-500 hover:shadow-lg',
    },
    indigo: {
      outline:
        'text-indigo-500 hover:bg-indigo-500 hover:text-white shadow-indigo-500 hover:shadow-lg',
      solid:
        'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500 hover:shadow-lg',
    },
  };

  const isGradient = Boolean(gradient);
  const variantClass = isGradient
    ? `text-white ${gradient} shadow-${ring}-500 hover:shadow-lg`
    : COLOR_MAP[color][variant] || COLOR_MAP.cyan.outline;

  const base =
    'font-semibold uppercase transition-all cursor-pointer focus:outline-none focus-visible:ring-4 disabled:opacity-40 disabled:pointer-events-none';

  const classes = clsx(
    base,
    SIZE[size],
    ROUNDED[rounded],
    showRing,
    variantClass,
    className
  );

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!float || !ref.current) return;
    const tl = gsap.timeline({ paused: true });
    tl.to(ref.current, { y: -6, duration: 0.25, ease: 'power1.out' });
    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();
    ref.current.addEventListener('mouseenter', handleMouseEnter);
    ref.current.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      ref.current?.removeEventListener('mouseenter', handleMouseEnter);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, [float]);

  return (
    <button ref={ref} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;

// ✅ Usage Examples

// 🔹 1. Basic Button with Border
// <CustomButton color="blue">Click Me</CustomButton>

// 🔹 2. No Border
// <CustomButton border={false} color="rose">No Border</CustomButton>

// 🔹 3. Custom Ring Color
// <CustomButton color="green" ringColor="pink">Green with Pink Border</CustomButton>

// 🔹 4. Gradient + Custom Ring
// <CustomButton
// gradient="bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500"
// ringColor="indigo"
//     >
//     Gradient Ring
// </CustomButton>
