export interface FormRule {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    len?: number;
    pattern?: RegExp;
    validator?: (rule: FormRule, value: any, callback: (error?: Error) => void) => void;
    trigger?: 'blur' | 'change' | 'submit';
}
export type FormRules = Record<string, FormRule | FormRule[]>;
export type FormValidateCallback = (isValid: boolean, invalidFields?: string) => void;
export interface FormItemContext {
    prop: string;
    validate: () => Promise<void>;
    resetField: () => void;
    clearValidate: () => void;
}
export type FormSize = 'large' | 'default' | 'small';
export type FormLabelPosition = 'left' | 'right' | 'top';
export type FormItemValidateState = '' | 'success' | 'error' | 'validating';
