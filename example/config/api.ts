import { ModelSpace, modelSpaceMap } from 'looplan'

const baseURL = "http://localhost:9000";
const baseURLData = "http://localhost:9002";

function setupModelSpace() {
    // 主服务空间
    const mainSpace = new ModelSpace({
        url: `${baseURL}`,
        provideToken: () => {
            return localStorage.getItem('token') || ''
        },
    });
    const dataSpace = new ModelSpace({
        url: `${baseURLData}`,
        provideToken: () => {
            return localStorage.getItem('dataToken') || ''
        }
    });

    const modelSpace = new ModelSpace({
        url: `${baseURLData}`,
        provideToken: () => {
            return localStorage.getItem('dataToken') || ''
        },
    });
    modelSpaceMap.set('main', mainSpace)
    modelSpaceMap.set('data', dataSpace)
    modelSpaceMap.set('model', modelSpace)
}

export  {
    setupModelSpace,
}