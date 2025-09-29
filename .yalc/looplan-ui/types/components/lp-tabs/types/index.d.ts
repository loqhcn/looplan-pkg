export interface TabItem {
    [key: string]: any;
}
export interface TabKeys {
    value: string;
    title: string;
}
export interface TabsProps {
    data: TabItem[];
    keys: TabKeys;
    type: string;
    full: boolean;
    column: boolean;
    modelType: 'field' | 'index';
    modelField?: string;
}
export interface TabChangeEvent {
    value: any;
    item: TabItem;
    index: number;
}
export interface TabsEmits {
    change: [event: TabChangeEvent];
}
export type TabSize = 'large' | 'default' | 'small';
export type TabType = 'default' | 'card' | 'border-card' | 'button';
