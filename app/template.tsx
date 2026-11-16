// A template remounts on every navigation, so each new page plays the short "page-enter" rise.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
