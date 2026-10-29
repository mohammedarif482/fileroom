import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const aed = (n) => 'AED ' + Math.round(n).toLocaleString('en-US');

// Random reference numbers for filed returns (ARN, token, TRRN...)
export const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tweens a displayed number toward `value` whenever it changes
export function useCountUp(value, { from = value, duration = 0.7 } = {}) {
  const reduce = prefersReducedMotion();
  const obj = useRef({ v: reduce ? value : from });
  const [shown, setShown] = useState(obj.current.v);

  useEffect(() => {
    if (reduce) {
      obj.current.v = value;
      setShown(value);
      return;
    }
    const t = gsap.to(obj.current, {
      v: value, duration, ease: 'power2.out',
      onUpdate: () => setShown(obj.current.v),
    });
    return () => t.kill();
  }, [value, duration, reduce]);

  return shown;
}

// Demo requests go to the Fileroom WhatsApp number
const WHATSAPP_NUMBER = '917592835002';

export const DEMO_MESSAGE = "Hi Fileroom, I'd like to book a demo for our institute.";

export const whatsappLink = (message = DEMO_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
