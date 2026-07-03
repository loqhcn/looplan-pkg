

// TODO 模型项类型
interface ModelItem {
    title: string;
    name: string;
    type: string;
    describe: string;
    notnull: boolean;
    [key: string]: any;
}

// TODO 模型关联类型
/**
 * 模型关联类型
 */
interface ModelRelation {
    title: string;
    name: string;
    modelId: number;
    modelField: string;
    relationModelId: string;
    relationModelField: string;
    relationType: string;
    relationFields: string[];
    [key: string]: any;
}

/**
 * 模型实现项类型
 */
interface ModelImplementItem {
    title: string;
    name: string;
    modelId: number;
    modelField: string;
    relationModelId: string;
    relationModelField: string;
    relationType: string;
    relationFields: string[];
    [key: string]: any;
}

interface ModelData {
    table: string;
    row?: {
        database?: string;
        [key: string]: any;
    };
    relations?:ModelRelation[];
    items:ModelItem[];
    [key: string]: any;
}

export type {
    ModelItem,
    ModelRelation,
    ModelImplementItem,
    ModelData
}