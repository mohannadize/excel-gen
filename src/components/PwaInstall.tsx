import "@khmyznikov/pwa-install";

export default function PwaInstall(props: {
  icon: string
}) {
  return <pwa-install {...props}></pwa-install>
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        icon: string;
      };
    }
  }
}