import Script from 'next/script';

export default function JivoChat() {
  return (
    <Script
      id="jivosite-widget"
      src="//code.jivosite.com/widget/VsY7YlCKnw"
      strategy="afterInteractive"
    />
  );
}
