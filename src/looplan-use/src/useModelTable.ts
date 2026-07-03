import { useModelSpace, ModelSpace, ModelClient, LooplanException } from "looplan"
import { ref, reactive, markRaw } from 'vue';
import type { FilterProps, ModelTableColumn, ModelTableProps, ModelTableOperationColumn, ModelTableForm } from '@/LpModelRender/types';
import type { ModelData, ModelItem } from "../types/model";
import type { TableUsageData } from "@/LooplanModel/types/usage-table";
import type { FormUsageData } from "@/LooplanModel/types/usage-form";
import type { UsageHandle } from "@/LooplanModel/types/usage";

interface ModelUsageItem {
    usage?: string;
    data?: Record<string, any>;
}

function createDefaultFilter(): FilterProps {
    return {
        tabFilters: [],
        searchs: [],
        searchOption: {
            labelWidth: 80,
        }
    };
}

function createDefaultForm(): ModelTableForm {
    return {
        title: (data: any) => data ? `编辑 ${data.name || ''}` : '新增',
        add: {
            enable: true,
        },
        items: []
    };
}

function toWidthValue(value?: string) {
    if (value === '' || value === undefined) {
        return undefined;
    }
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? value : numberValue;
}

function usageHandleToOperationItem(handle: UsageHandle) {
    const command = handle.command || '';
    if (command === 'delete') {
        return {
            title: handle.title,
            name: command,
            type: 'danger' as const,
            icon: 'delete'
        };
    }
    if (command === 'edit') {
        return {
            title: handle.title,
            name: command,
            type: 'primary' as const,
            icon: 'edit'
        };
    }
    return {
        title: handle.title,
        name: command,
        type: 'primary' as const,
    };
}


function usageDataToModelTableProps(usages: ModelUsageItem[] = [], modelData: ModelData): Partial<ModelTableProps> {
    const fallback = modelDataToModelTableProps(modelData);
    if (!Array.isArray(usages) || usages.length === 0) {
        return fallback;
    }

    const tableUsage = usages.find((item) => item?.usage === 'table')?.data as TableUsageData | undefined;
    const formUsage = usages.find((item) => item?.usage === 'form')?.data as FormUsageData | undefined;
    const filterUsage = usages.find((item) => item?.usage === 'filter')?.data as FormUsageData | undefined;

    const columns = tableUsage?.columns?.length
        ? tableUsage.columns.map((column) => ({
            title: column.title,
            name: column.name,
            width: toWidthValue(column.width),
            minWidth: toWidthValue(column.minWidth),
            align: column.align,
            fixed: column.fixed,
            component: column.component,
            componentProps: column.componentProps,
        }))
        : (fallback.columns || []);

    const rowHandles = tableUsage?.rowHandles || [];
    const operationColumn: ModelTableOperationColumn | undefined = rowHandles.length > 0
        ? {
            title: '操作',
            width: 200,
            items: rowHandles.map((handle) => usageHandleToOperationItem(handle)),
        }
        : fallback.operationColumn;

    const form = createDefaultForm();
    if (fallback.form?.items?.length) {
        form.items = fallback.form.items;
    }
    if (formUsage?.items?.length) {
        form.items = formUsage.items.map((item) => ({
            title: item.title,
            name: item.name,
            component: item.component,
            componentProps: item.componentProps,
            rules: item.validates || [],
        }));
    }
    if (formUsage?.labelWidth !== undefined) {
        form.labelWidth = formUsage.labelWidth;
    }

    const tableHandleCommands = new Set((tableUsage?.handles || []).map((item) => item.command));
    if (tableHandleCommands.size > 0) {
        form.add = {
            ...(form.add || { enable: true }),
            enable: tableHandleCommands.has('add'),
        };
    }

    const filter = createDefaultFilter();
    const filterItems = filterUsage?.items?.length
        ? filterUsage.items
        : form.items;
    filter.searchs = filterItems.map((item) => ({
        title: item.title,
        name: item.name,
        component: item.component,
        componentProps: item.componentProps,
    }));
    if (filterUsage?.labelWidth !== undefined) {
        filter.searchOption = {
            labelWidth: filterUsage.labelWidth,
        };
    }

    const headerHandles = tableUsage?.handles || [];

    return {
        columns,
        operationColumn,
        filter,
        form,
        headerHandles,
    };
}

/**
 * 模型数据生成模型表格props
 * @param modelData 
 * @returns
 */
function modelDataToModelTableProps(modelData: ModelData): Partial<ModelTableProps> {
    const {
        items = []
    } = modelData;

    const filter = createDefaultFilter();
    const form = createDefaultForm();

    const columns: ModelTableColumn[] = [];
    items.forEach((item: ModelItem) => {
        // 表格渲染行
        columns.push({
            title: item.title,
            name: item.name,
            width:120
        })

        // 生成筛选
        filter.searchs.push({
            title: item.title,
            name: item.name,
        })
        // 表单
        form.items.push({
            title: item.title,
            name: item.name,
        })
    })
    // 添加ID列
    columns.unshift({
        title: 'ID',
        name: 'id',
        width:80
    })


    // 操作列
    const operationColumn: ModelTableOperationColumn = {
        title: '操作',
        width: 200,
        items: [
            {
                title: '编辑',
                name: 'edit',
                type: 'primary',
                icon: 'edit'
            },
            {
                title: '删除',
                name: 'delete',
                type: 'danger',
                icon: 'delete'
            }
        ]
    }

    return {
        // 表格字段
        columns,
        // 表格行操作
        operationColumn,
        // 筛选
        filter,
        // 表单
        form
    }
}


interface UseModelTableOptions{
    /**
     * 模型路径
     * @todo 当model传递ModelClient实例时，需要主动传递模型路径
     */
    modelPath?: string;

    /**
     * 处理表格props
     */
    handle:(props:Partial<ModelTableProps>)=>Partial<ModelTableProps>
    /**
     * 调用用途配置名
     * @param usages 调用用途配置名数组, 规则: `类型:配置名`
     * @example `['table:default','form:default']` | `default`
     */
    usages?: string[] | string;

}

/**
 * 模型表格
 * @param model 模型名称或模型实例
 * - 模型名称格式：`空间名称@账户名/模型名`
 * @param options 选项
 * @returns 
 */
function useModelTable(model: string | ModelClient, options?: UseModelTableOptions) {

    console.log('useModelTable',model,options)
    let modelSpace: ModelSpace | null = null;
    let spaceName = '';
    let modelPath = options?.modelPath || '';
    const isReady = ref(false);


    const tableModel = ref<ModelClient | null>(null);
    if (typeof model == 'string') {
        const splitStr = model.split('@');
        spaceName = splitStr[0];
        modelPath = splitStr[1];
        modelSpace = useModelSpace(spaceName);
        if(!modelSpace){
            throw new LooplanException(`模型空间 ${spaceName} 不存在`,0,{
                spaceName,
            });
        };
        if (modelSpace) {
            tableModel.value = markRaw(modelSpace.useModel(modelPath));
        }
    } else {
        tableModel.value = markRaw(model as ModelClient);
    }

    const modelTableProps = reactive<ModelTableProps>({
        model: model,
        columns: [],
        order: {
            id: 'desc'
        },
        events: {},
        commands: {}
    })

    async function initModelTable() {
        // 加载模型结构
        const modelRenderObj = modelSpace?.useCloudObject('ModelRender');
        const loadModelName = modelPath.replace('/', '@');
        // 获取表格渲染数据
        const reqData:Record<string,any> = {
            name: loadModelName
        };
        if(options?.usages){
            reqData.usages = options.usages;
        }
      
        const ret = await modelRenderObj.table(reqData);
        console.log('modelRowRet', ret)
        // 生成表格渲染数据
        if (ret.code != 200) {
            console.log('获取模型表格渲染数据失败', ret)
            return;
        }
        const propsData = usageDataToModelTableProps(ret.data.usages, ret.data.modelData);
        console.log('propsData', propsData);
        Object.assign(modelTableProps, propsData);

        // 处理表格props
        if (options?.handle) {
          const _props = options.handle(modelTableProps);
          Object.assign(modelTableProps, _props);
        }

        isReady.value = true;
    }
    initModelTable();

    return {
        isReady,
        tableModel,
        modelPath,
        modelTableProps
    }

}

export {
    useModelTable
}
