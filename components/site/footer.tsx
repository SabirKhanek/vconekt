'use client';
import { getResponsiveClasses } from '@/constants';
import Link from 'next/link';
import { HTMLProps } from 'react';

export function Footer({}: HTMLProps<HTMLElement>) {
  return (
    <section className={`${'responsive'} relative z-10 py-5`}>
      <div className="flex flex-wrap items-start justify-between gap-5 gap-y-5 border-b border-white/45 pb-3 text-white">
        <div className="min-w-fit flex-1">
          <img className="" src="/logo.png" alt="" />
        </div>
        <div className="min-w-[250px] flex-1">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:underline">Our Story</li>
            <li className="cursor-pointer hover:underline">Contact</li>
            <li className="cursor-pointer hover:underline">News & Press</li>
          </ul>
        </div>
        <div className="min-w-[250px] flex-1">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:underline">
              <a href="mailto:info@vconekt.com">info@vconekt.com</a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a href="tel:13108481237">+13108481237</a>
            </li>
            <li className="cursor-pointer hover:underline">
              7901 4th St N#19454 St. Pertersburg, FL 33702
            </li>
          </ul>
        </div>
        <div className="flex min-w-fit  items-center gap-1">
          {[1, 2, 3].map((v) => (
            <img src="/footer_img.svg" className="h-16 w-16" key={v}></img>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-y-5 py-3 md:flex-row">
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-7">
          <p className="cursor-pointer text-sm font-light  text-white/65 hover:text-white hover:underline">
            © 2024 Vconekt. All Rights Reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="cursor-pointer text-sm font-light text-white/65 hover:text-white hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="cursor-pointer text-sm font-light text-white/65 hover:text-white hover:underline"
          >
            Terms and Conditions
          </Link>
        </div>
        <div className="flex flex-1 flex-row-reverse items-center gap-3  text-primary">
          <a href="https://x.com/vconektofficial">
            <svg
              width="21"
              height="20"
              className="cursor-pointer text-base transition-all duration-150 hover:scale-110"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.785034" width="20" height="20" rx="5" fill="#B2E161" />
              <path
                d="M11.9267 9.08125L16.3939 4H15.3352L11.4565 8.41188L8.35836 4H4.78503L9.46995 10.6716L4.78503 16H5.84373L9.93999 11.3409L13.2117 16H16.785L11.9264 9.08125H11.9267ZM10.4767 10.7303L10.002 10.066L6.22515 4.77981H7.85124L10.899 9.046L11.3737 9.71031L15.3357 15.2556H13.7098L10.4767 10.7306V10.7303Z"
                fill="black"
              />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/vconektofficial/">
            <svg
              width="21"
              height="20"
              className="cursor-pointer text-base transition-all duration-150 hover:scale-110"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4517 0C18.3358 0 19.1836 0.35119 19.8087 0.976311C20.4338 1.60143 20.785 2.44928 20.785 3.33333V16.6667C20.785 17.5507 20.4338 18.3986 19.8087 19.0237C19.1836 19.6488 18.3358 20 17.4517 20H4.11837C3.23431 20 2.38647 19.6488 1.76135 19.0237C1.13622 18.3986 0.785034 17.5507 0.785034 16.6667V3.33333C0.785034 2.44928 1.13622 1.60143 1.76135 0.976311C2.38647 0.35119 3.23431 0 4.11837 0H17.4517ZM6.34059 7.77778C6.04591 7.77778 5.76329 7.89484 5.55492 8.10322C5.34654 8.31159 5.22948 8.5942 5.22948 8.88889V14.4444C5.22948 14.7391 5.34654 15.0217 5.55492 15.2301C5.76329 15.4385 6.04591 15.5556 6.34059 15.5556C6.63527 15.5556 6.91789 15.4385 7.12626 15.2301C7.33464 15.0217 7.4517 14.7391 7.4517 14.4444V8.88889C7.4517 8.5942 7.33464 8.31159 7.12626 8.10322C6.91789 7.89484 6.63527 7.77778 6.34059 7.77778ZM9.67392 6.66667C9.37924 6.66667 9.09662 6.78373 8.88825 6.9921C8.67988 7.20048 8.56281 7.48309 8.56281 7.77778V14.4444C8.56281 14.7391 8.67988 15.0217 8.88825 15.2301C9.09662 15.4385 9.37924 15.5556 9.67392 15.5556C9.96861 15.5556 10.2512 15.4385 10.4596 15.2301C10.668 15.0217 10.785 14.7391 10.785 14.4444V10.3778C11.1239 9.99556 11.6961 9.54667 12.3328 9.27444C12.7028 9.11667 13.2595 9.05222 13.6461 9.17445C13.7744 9.20699 13.8887 9.28029 13.9717 9.38333C14.0295 9.46111 14.1184 9.63445 14.1184 10V14.4444C14.1184 14.7391 14.2354 15.0217 14.4438 15.2301C14.6522 15.4385 14.9348 15.5556 15.2295 15.5556C15.5242 15.5556 15.8068 15.4385 16.0152 15.2301C16.2235 15.0217 16.3406 14.7391 16.3406 14.4444V10C16.3406 9.25556 16.1517 8.59333 15.7584 8.06222C15.3964 7.58062 14.8899 7.22747 14.3128 7.05444C13.3106 6.74 12.2006 6.91444 11.4595 7.23222C11.222 7.33385 10.9909 7.44961 10.7673 7.57889C10.7207 7.32288 10.5857 7.09133 10.3859 6.92463C10.1861 6.75792 9.93414 6.66663 9.67392 6.66667ZM6.34059 4.44444C6.04591 4.44444 5.76329 4.56151 5.55492 4.76988C5.34654 4.97826 5.22948 5.26087 5.22948 5.55556C5.22948 5.85024 5.34654 6.13286 5.55492 6.34123C5.76329 6.5496 6.04591 6.66667 6.34059 6.66667C6.63527 6.66667 6.91789 6.5496 7.12626 6.34123C7.33464 6.13286 7.4517 5.85024 7.4517 5.55556C7.4517 5.26087 7.33464 4.97826 7.12626 4.76988C6.91789 4.56151 6.63527 4.44444 6.34059 4.44444Z"
                fill="#B2E161"
              />
            </svg>
          </a>

          <a href="https://www.instagram.com/vconektofficial/">
            <svg
              width="25"
              height="24"
              className="cursor-pointer text-base transition-all duration-150 hover:scale-110"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.975 2H8.59503C4.95503 2 2.78503 4.17 2.78503 7.81V16.18C2.78503 19.83 4.95503 22 8.59503 22H16.965C20.605 22 22.775 19.83 22.775 16.19V7.81C22.785 4.17 20.615 2 16.975 2ZM12.785 15.88C10.645 15.88 8.90503 14.14 8.90503 12C8.90503 9.86 10.645 8.12 12.785 8.12C14.925 8.12 16.665 9.86 16.665 12C16.665 14.14 14.925 15.88 12.785 15.88ZM18.705 6.88C18.655 7 18.585 7.11 18.495 7.21C18.395 7.3 18.285 7.37 18.165 7.42C18.045 7.47 17.915 7.5 17.785 7.5C17.515 7.5 17.265 7.4 17.075 7.21C16.985 7.11 16.915 7 16.865 6.88C16.815 6.76 16.785 6.63 16.785 6.5C16.785 6.37 16.815 6.24 16.865 6.12C16.915 5.99 16.985 5.89 17.075 5.79C17.305 5.56 17.655 5.45 17.975 5.52C18.045 5.53 18.105 5.55 18.165 5.58C18.225 5.6 18.285 5.63 18.345 5.67C18.395 5.7 18.445 5.75 18.495 5.79C18.585 5.89 18.655 5.99 18.705 6.12C18.755 6.24 18.785 6.37 18.785 6.5C18.785 6.63 18.755 6.76 18.705 6.88Z"
                fill="#B2E161"
              />
            </svg>
          </a>
          <a href="https://www.facebook.com/vconektofficial">
            <svg
              width="25"
              height="24"
              className="cursor-pointer text-base transition-all duration-150 hover:scale-110"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.785 16.19C22.785 19.83 20.615 22 16.975 22H15.785C15.235 22 14.785 21.55 14.785 21V15.23C14.785 14.96 15.005 14.73 15.275 14.73L17.035 14.7C17.175 14.69 17.295 14.59 17.325 14.45L17.675 12.54C17.705 12.36 17.565 12.19 17.375 12.19L15.245 12.22C14.965 12.22 14.745 12 14.735 11.73L14.695 9.28C14.695 9.12 14.825 8.98001 14.995 8.98001L17.395 8.94C17.565 8.94 17.695 8.81001 17.695 8.64001L17.655 6.23999C17.655 6.06999 17.525 5.94 17.355 5.94L14.655 5.98001C12.995 6.01001 11.675 7.37 11.705 9.03L11.755 11.78C11.765 12.06 11.545 12.28 11.265 12.29L10.065 12.31C9.89503 12.31 9.76505 12.44 9.76505 12.61L9.79504 14.51C9.79504 14.68 9.92503 14.81 10.095 14.81L11.295 14.79C11.575 14.79 11.795 15.01 11.805 15.28L11.895 20.98C11.905 21.54 11.455 22 10.895 22H8.59503C4.95503 22 2.78503 19.83 2.78503 16.18V7.81C2.78503 4.17 4.95503 2 8.59503 2H16.975C20.615 2 22.785 4.17 22.785 7.81V16.19Z"
                fill="#B2E161"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
