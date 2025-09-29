export interface TestProps {
  title?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export interface TestEmits {
  (e: 'click', value: string): void
  (e: 'change', newValue: string): void
}