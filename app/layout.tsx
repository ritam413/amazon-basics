import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DubPilot — Alexa+ Multimodal Studio & AWS Bedrock Copilot',
  description: 'Conversational AI for multilingual video dubbing, synchronized subtitles, and interactive playback on Alexa+ and AWS Bedrock.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%2300CAEC'/><polygon points='40,30 70,50 40,70' fill='%23FFFFFF'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
