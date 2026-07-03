function getUploadConfig() {
    // 提供全局上传配置
    const globalUploadConfig = {
        url: 'https://api.looplan.cn/Storage.upload',
        type: 'upload',
        headers: {
            Authorization: localStorage.getItem('token') || '',
        }
    };
    return globalUploadConfig
}

export {
    getUploadConfig
}