// @ts-nocheck
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
    createPkgTemplateConfig,
    type CreatePkgTemplateContext,
    type CreatePkgTemplateItem,
} from '../tpls/createPkg.config';

interface CreatePkgBody {
    pkgName?: string;
    title?: string;
    componentName?: string;
}

function toPascalCase(input: string): string {
    return input
        .replace(/[^A-Za-z0-9]+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function renderTemplate(content: string, ctx: CreatePkgTemplateContext): string {
    return content
        .replaceAll('__PKG_NAME__', ctx.pkgName)
        .replaceAll('__PKG_TITLE__', ctx.pkgTitle)
        .replaceAll('__COMPONENT_NAME__', ctx.componentName)
        .replaceAll('__COMPONENT_TAG__', ctx.componentTag);
}

async function existsPath(path: string): Promise<boolean> {
    try {
        await stat(path);
        return true;
    } catch {
        return false;
    }
}

async function writeFromTemplate(
    item: CreatePkgTemplateItem,
    ctx: CreatePkgTemplateContext,
    tplsRoot: string,
    packageRoot: string,
    projectRoot: string,
): Promise<string> {
    const templatePath = join(tplsRoot, item.templatePath);
    const templateContent = await readFile(templatePath, 'utf-8');
    const rendered = renderTemplate(templateContent, ctx);
    const finalContent = item.transform ? item.transform(rendered, ctx) : rendered;
    const renderedFileName = renderTemplate(item.fileName, ctx);
    const renderedRelativePath = renderTemplate(item.relativePath, ctx);
    const baseRoot = item.outputRoot === 'project' ? projectRoot : packageRoot;
    const filePath = join(baseRoot, renderedRelativePath, renderedFileName);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, finalContent, 'utf-8');
    return filePath;
}

export default class CreatePkg {
    public test() {
        return {
            ok: true,
            service: 'create-pkg',
        };
    }

    public async create(ctx: any) {
        let body: CreatePkgBody = {};
        try {
            body = await ctx.readJson<CreatePkgBody>();
        } catch {
            return ctx.json({ ok: false, message: '请求体必须是 JSON' }, 400);
        }

        const pkgName = (body.pkgName || '').trim();
        if (!pkgName) {
            return ctx.json({ ok: false, message: 'pkgName 不能为空' }, 400);
        }

        if (!/^[A-Za-z](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(pkgName)) {
            return ctx.json(
                {
                    ok: false,
                    message:
                        'pkgName 格式不正确：需字母开头，可含字母数字中横线，且不能中横线结尾',
                },
                400,
            );
        }

        const pkgTitle = (body.title || pkgName).trim();
        const guessedName = pkgName.replace(/^looplan-/, '') || 'component';
        const rawComponentName = (body.componentName || guessedName).trim();
        const componentName = toPascalCase(rawComponentName) || 'Demo';
        const componentTag = `${pkgName}-${componentName}`.toLowerCase();

        const projectRoot = process.cwd();
        const outputRoot = join(projectRoot, 'packages', pkgName);
        const docsRoot = join(projectRoot, 'public', 'docs', pkgName);
        const tplsRoot = join(process.cwd(), 'src', 'server', 'tpls');

        if (await existsPath(outputRoot)) {
            return ctx.json({ ok: false, message: `组件包已存在: ${pkgName}` }, 409);
        }
        if (await existsPath(docsRoot)) {
            return ctx.json({ ok: false, message: `组件包文档已存在: ${pkgName}` }, 409);
        }

        const templateContext: CreatePkgTemplateContext = {
            pkgName,
            pkgTitle,
            componentName,
            componentTag,
        };

        const writtenFiles: string[] = [];
        for (const item of createPkgTemplateConfig) {
            const targetPath = await writeFromTemplate(
                item,
                templateContext,
                tplsRoot,
                outputRoot,
                projectRoot,
            );
            writtenFiles.push(targetPath);
        }

        return ctx.json({
            ok: true,
            message: `组件包创建成功: ${pkgName}`,
            pkgName,
            componentName,
            files: writtenFiles.map((v) => v.replace(process.cwd(), '.')),
        });
    }
}
