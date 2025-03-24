
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'2xl': '1280px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				outfit: ['Outfit', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Category colors for visual distinction
				strategic: {
					DEFAULT: 'hsl(var(--strategic))',
					light: 'hsl(var(--strategic-light))'
				},
				prioritization: {
					DEFAULT: 'hsl(var(--prioritization))',
					light: 'hsl(var(--prioritization-light))'
				},
				requirements: {
					DEFAULT: 'hsl(var(--requirements))',
					light: 'hsl(var(--requirements-light))'
				},
				planning: {
					DEFAULT: 'hsl(var(--planning))',
					light: 'hsl(var(--planning-light))'
				},
				discovery: {
					DEFAULT: 'hsl(var(--discovery))',
					light: 'hsl(var(--discovery-light))'
				},
				analytics: {
					DEFAULT: 'hsl(var(--analytics))',
					light: 'hsl(var(--analytics-light))'
				},
				development: {
					DEFAULT: 'hsl(var(--development))',
					light: 'hsl(var(--development-light))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-up': 'fade-up 0.4s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'float': 'float 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
