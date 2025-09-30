import {
  LucideIcon
} from 'lucide-react-native';

interface IconProps {
    name: LucideIcon,
    color: string,
    size: number
}

export function Icon ({ name, color, size }: IconProps) {
  
  const LucideIcn = name

  if (!LucideIcn) {
    console.warn(`Ícone Lucide "${name}" não encontrado. Verifique o nome ou a importação.`);
    return null; 
  }

  return (
    <LucideIcn
      color={color}
      size={size}
    />
  );
};