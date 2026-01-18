const packagesModules = import.meta.glob('./../../packages/**/src/index.(ts|js)', {
    // 立即加载，即立即执行模块中的代码
    eager: true
});



const packages: any[] = [];
const packageDocs: any[] = [];

for (const path in packagesModules) {
    const match = path.match(/packages\/(.*)\/src\/index\.(ts|js)/);
    const pkgName = match ? match[1] : '';
    packages.push({
        name: pkgName,
        path: path,
        packageConfig:{
            name: pkgName,
            title: pkgName,
            type:'local',
            version: '1.0.0',
            components:[

            ],
        },
        module: packagesModules[path]
    });
    packageDocs.push({
        name: pkgName,
        path: `/docs/${pkgName}`,
    });
}

console.log('packages', packages);
console.log('packageDocs', packageDocs);

export {
    packages,
    packageDocs
}
