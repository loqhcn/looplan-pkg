export interface TestProps {
  title?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'glass'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  showStats?: boolean
  animated?: boolean
}

export interface TestEmits {
  (e: 'click', value: string): void
  (e: 'change', newValue: string): void
  (e: 'stats', data: { type: string, value: any }): void
}