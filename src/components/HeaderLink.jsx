// components/HeaderLink.tsx
'use client'

export default function HeaderLink({ href, children, ...props }) {
  function handleClick(event) {
    if (href !== '/wiki') {
      sessionStorage.removeItem("edit-cards");
    }
   
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
