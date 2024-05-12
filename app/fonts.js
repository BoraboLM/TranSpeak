import { Inter, Pacifico, Poppins, Merriweather_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export const poppins = Poppins({
    weight: ['400','500', '600', '700', '800', '900'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap',
})

export const merriweather = Merriweather_Sans({
    weight: ['400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap',
})