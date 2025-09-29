export interface TableColumn {
    /**
     * 列标题
     */
    title: string;
    /**
     * 列名
     */
    name: string;
    /**
     * 列宽度
     *
     */
    width?: string;
}
export interface TableDataItem {
    [key: string]: any;
}
type TableData = TableDataItem[];
export interface TableProps {
    columns: TableColumn[];
    data: TableData;
}
export {};
