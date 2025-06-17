import chalk from 'chalk';
import type { JsPlugin } from '@farmfe/core';

type OptionsType = {
    enable?: boolean;
}

const OPTIONS: OptionsType = {
    enable: true
}

const EMPTY_STRING = '';
const EXP_CHAR = '%';



function templateKeys(str: string) {
    str += EMPTY_STRING;
    const keys: Array<string> = [];
    let start = false;
    let key = EMPTY_STRING;
    for (let i = 0, len = str.length; i < len; i++) {
        const char = str[i];
        if (!start && char === EXP_CHAR) {
            start = true;
            continue;
        }
        if (char === EXP_CHAR && start) {
            if (key) {
                keys.push(key);
            }
            start = false;
            continue;
        }
        if (start && (char !== EXP_CHAR)) {
            key += char;
        }
    }
    return keys;
}


function transformHTML(content: string) {
    if (!content || typeof content !== 'string') {
        return content;
    }
    if (content.includes(EXP_CHAR)) {
        const keys = templateKeys(content);
        const env = process.env || {};
        keys.forEach(key => {
            const value = env[key] || '';
            if (!value) {
                const message = `[farm_html_template]:not find env key:${key} `
                console.error(chalk.redBright(message));
                return;
            }
            const template = `${EXP_CHAR}${key}${EXP_CHAR}`;
            while (content.includes(template)) {
                content = content.replace(template, value);
            }
        });
        return content;

    }
    return content;

}


export default function farm_html_template(options?: OptionsType): JsPlugin {
    const { enable } = Object.assign({}, OPTIONS, options || {});
    // 返回一个暴露钩子的对象
    return {
        name: 'farm-html-template',
        transform: {
            filters: { resolvedPaths: ['\\.(html|htm)$'] },
            async executor(params) {
                const { content } = params;
                if (!enable) {
                    return {
                        content,
                        sourceMap: null,
                        moduleType: 'html'
                    }
                }
                const tcontent = transformHTML(content);
                return {
                    content: tcontent,
                    sourceMap: null,
                    moduleType: 'html'
                }
            }
        }
    }
}