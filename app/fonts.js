import { Inter, Pacifico, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export const poppins = Poppins({
    weight: ['500','400'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap',
})
