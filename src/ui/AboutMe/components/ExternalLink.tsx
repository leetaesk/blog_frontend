interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLink = ({ href, children, className }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank" // 새 탭에서 열기
      rel="noopener noreferrer" // 보안 필수 옵션
      className={className}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
