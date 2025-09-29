export interface TextProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  copyable?: boolean
  disabled?: boolean
}

export interface TextEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'change', value: string): void
  (e: 'copy', text: string): void
}