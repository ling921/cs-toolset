import type { Locale } from './types';
type PageContent = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};
export const contentPages: Record<'about' | 'privacy', Record<Locale, PageContent>> = {
  about: {
    en: {
      title: 'About CS Toolset',
      description:
        'What CS Toolset is, how its browser-based utilities work, and where to find the open-source code.',
      intro: 'A small, considered home for the little tasks that interrupt a good flow.',
      sections: [
        {
          heading: 'Built for everyday development',
          paragraphs: [
            'CS Toolset brings common generators, encoders, converters and testers into one searchable space. Open a tool, do the task, and move on. You can use every tool without creating an account.',
            'The site is made with Svelte 5 and SvelteKit. Every page is generated as static HTML during the build and can be hosted on any static web host. The tools run in your browser, including when the installed site is offline after its assets have been cached.'
          ]
        },
        {
          heading: 'Tools with honest boundaries',
          paragraphs: [
            'Random identifiers and passwords use the browser cryptographic random source. JWT signatures can be checked when you supply a key, but issuer, audience and claims still need your review. MD5 and SHA-1 exist for legacy compatibility, not new security designs. Cron preview follows the implemented parser and should be compared against the scheduler you deploy.',
            'Each tool page explains its inputs, gives an example and shows related tools. If you notice a problem or have a useful tool idea, open an issue in the public repository.'
          ]
        },
        {
          heading: 'Open source',
          paragraphs: [
            'The source is published at github.com/ling921/cs-toolset under the Apache License 2.0. The version and short Git commit shown in the footer help identify the precise build you are viewing.'
          ]
        }
      ]
    },
    'zh-CN': {
      title: '关于 CS Toolset',
      description: '了解 CS Toolset 的浏览器端工具、静态站点架构、能力边界与开源仓库。',
      intro: '把开发过程中的小事放在一个安静、顺手的地方。',
      sections: [
        {
          heading: '为日常开发而做',
          paragraphs: [
            'CS Toolset 将常用生成、编码、转换与测试工具放在一个可搜索的地方。打开工具，处理问题，然后继续工作。使用所有工具都不需要注册账号。',
            '本站使用 Svelte 5 和 SvelteKit，在构建时将每个页面生成静态 HTML，可部署到任意静态托管服务。工具在浏览器内运行；安装后缓存完成的页面也可以离线使用。'
          ]
        },
        {
          heading: '清楚说明能力边界',
          paragraphs: [
            '随机标识和密码使用浏览器的加密安全随机源。JWT 可在提供密钥后验证签名，但签发者、受众及声明仍需自行核对。MD5 和 SHA-1 仅供旧系统兼容，不适合新的安全设计。Cron 预览遵循本站解析器规则，正式配置前请与实际调度器核对。',
            '每个工具页提供输入说明、示例与相关工具。发现问题或想到新的实用工具，欢迎在公开仓库提交 issue。'
          ]
        },
        {
          heading: '开源项目',
          paragraphs: [
            '源码托管于 github.com/ling921/cs-toolset，遵循 Apache License 2.0。页脚中的版本号和 Git 短提交号可以帮助确认当前站点的具体构建版本。'
          ]
        }
      ]
    }
  },
  privacy: {
    en: {
      title: 'Privacy',
      description:
        'How CS Toolset handles your tool inputs, local preferences, offline cache and hosting requests.',
      intro: 'The useful thing about a local tool is that your working data can stay local.',
      sections: [
        {
          heading: 'Tool inputs stay in your browser',
          paragraphs: [
            'The generators, parsers, formatters and converters process data on your device. Tool inputs and results are not sent to an application server, saved to an account or stored in browser storage. The site does not include analytics, ads or remote fonts.',
            'Copying a result happens only when you press a copy button. Downloading a result creates a local file through your browser. As with any website, do not paste secrets into tools unless you trust your browser, device and extensions.'
          ]
        },
        {
          heading: 'Preferences on this device',
          paragraphs: [
            'We use localStorage for your theme, language, favorite tools and a short list of recently visited tools. Those settings do not contain tool inputs or outputs. Clear this site’s browser data to remove them.',
            'To make the installed site work offline, a service worker caches the static HTML, scripts, styles and icons. It does not cache submitted values or generated results. The cache is refreshed when you accept an available update.'
          ]
        },
        {
          heading: 'Hosting and external links',
          paragraphs: [
            'The hosting provider may process standard request metadata, such as IP addresses, URLs and timestamps, under its own policies. Following the GitHub link takes you to a separate website with its own privacy practices.'
          ]
        }
      ]
    },
    'zh-CN': {
      title: '隐私说明',
      description: '了解 CS Toolset 如何处理工具输入、本地偏好、离线缓存以及托管请求。',
      intro: '本地工具最可贵的一点，是让你的工作数据留在自己的设备上。',
      sections: [
        {
          heading: '工具输入留在浏览器',
          paragraphs: [
            '生成、解析、格式化和转换均在你的设备上执行。工具输入与输出不会上传到应用服务器、保存到账号，或写入浏览器存储。本站不接入统计分析、广告或远程字体。',
            '只有点击复制按钮时才会写入剪贴板。下载结果通过浏览器在本地创建文件。与任何网站一样，处理秘密信息前仍应确认你信任自己的浏览器、设备和扩展程序。'
          ]
        },
        {
          heading: '保存在本机的偏好',
          paragraphs: [
            'localStorage 只保存主题、语言、收藏的工具和近期访问的工具列表，不保存工具输入或输出。清除本站的浏览器数据即可删除这些设置。',
            '为了离线使用，Service Worker 会缓存静态 HTML、脚本、样式和图标，不缓存你提交的值或生成的结果。发现新版本后，只有在你接受更新时才切换缓存。'
          ]
        },
        {
          heading: '托管与外部链接',
          paragraphs: [
            '托管服务提供方可能根据其政策在日志中处理 IP 地址、请求路径和时间等常规请求信息。点击 GitHub 链接会前往另一个网站，适用其自身的隐私实践。'
          ]
        }
      ]
    }
  }
};
