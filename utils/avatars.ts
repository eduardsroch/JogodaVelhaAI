export const PREDEFINED_AVATARS: { [key: string]: string } = {
  robot: `<svg viewBox="0 0 100 100"><rect x="20" y="30" width="60" height="50" rx="5" fill="#adb5bd"/><rect x="30" y="20" width="40" height="10" fill="#6c757d"/><circle cx="35" cy="45" r="5" fill="#fff"/><circle cx="65" cy="45" r="5" fill="#fff"/><rect x="40" y="60" width="20" height="5" fill="#6c757d"/></svg>`,
  cat: `<svg viewBox="0 0 100 100"><path d="M50 85 C 20 95, 20 55, 50 60 C 80 55, 80 95, 50 85 Z" fill="#ffc107"/><path d="M45 70 A 5 5 0 0 1 55 70 A 5 5 0 0 1 45 70" fill="#f8f9fa"/><path d="M25 50 A 30 30 0 0 1 50 20 A 30 30 0 0 1 75 50 L 50 60 Z" fill="#ffc107"/><circle cx="40" cy="50" r="3" fill="#212529"/><circle cx="60" cy="50" r="3" fill="#212529"/></svg>`,
  rocket: `<svg viewBox="0 0 100 100"><path d="M50 10 L65 40 L35 40 Z" fill="#f44336"/><rect x="35" y="40" width="30" height="40" fill="#e9ecef"/><path d="M35 80 L20 90 L35 85 Z" fill="#ff9800"/><path d="M65 80 L80 90 L65 85 Z" fill="#ff9800"/><path d="M50 80 L40 95 L60 95 Z" fill="#ff9800"/><circle cx="50" cy="55" r="8" fill="#2196f3"/></svg>`,
  star: `<svg viewBox="0 0 100 100"><path d="M50 5 L61 39 L98 39 L68 62 L79 96 L50 75 L21 96 L32 62 L2 39 L39 39 Z" fill="#ffeb3b"/></svg>`,
  ghost: `<svg viewBox="0 0 100 100"><path d="M20 90 L20 50 A 30 30 0 0 1 80 50 L80 90 L70 80 L60 90 L50 80 L40 90 L30 80 Z" fill="#f8f9fa"/><circle cx="40" cy="55" r="5" fill="#212529"/><circle cx="60" cy="55" r="5" fill="#212529"/></svg>`,
};

export const generateAvatar = (name: string): string => {
  if (!name) {
    return `data:image/svg+xml;base64,${btoa(PREDEFINED_AVATARS.robot)}`;
  }

  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = hash % 360;
  
  const gen_char_code = (char_code: number, shift: number) => {
    return (char_code >> shift) & 1;
  }
  
  const rects = Array.from({ length: 25 }).map((_, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const sym_col = col > 2 ? 4 - col : col;
      
      const char_code_index = row * 3 + sym_col;
      const char_code = name.length > char_code_index ? name.charCodeAt(char_code_index) : 32;

      const fill = gen_char_code(char_code, i%8) === 1 
          ? `hsl(${hue}, 70%, 55%)` 
          : `hsl(${(hue + 180) % 360}, 10%, 90%)`;

      return `<rect x="${col * 20}" y="${row * 20}" width="20" height="20" fill="${fill}" />`;
  }).join('');
  
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};