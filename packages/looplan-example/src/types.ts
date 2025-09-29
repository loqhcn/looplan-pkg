export interface TextProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export interface TextEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'change', value: string): void
}