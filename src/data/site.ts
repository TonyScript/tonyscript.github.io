export const site = {
  name: "Tony Pang",
  handle: "TonyScript",
  headline: "Product Manager · ITOM · AIOps · AI",
  description:
    "具有工程背景的企业软件产品经理，长期关注 ITOM、AIOps、AI Agent，以及 AI 如何改变软件与运维。",
  location: "Shanghai, China",
  email: "tonyscript@gmail.com",
  github: "https://github.com/TonyScript",
  website: "https://tonyscript.github.io",
} as const;

export const primaryNav = [
  { href: "/projects/", label: "Work" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
  { href: "/resume/", label: "Resume" },
  { href: "/ai/", label: "AI profile" },
] as const;

export const focusAreas = [
  {
    name: "ITOM / ITSM",
    description: "企业 IT 运维、服务管理与复杂基础设施产品。",
  },
  {
    name: "AIOps",
    description: "告警、分析、基线与面向运维场景的 AI 能力。",
  },
  {
    name: "AI Agents",
    description: "企业环境中的工具、权限、上下文与工作流设计。",
  },
  {
    name: "CMDB / Monitoring",
    description: "配置数据、发现、监控、可观测性与告警管理。",
  },
] as const;

export const experiments = [
  {
    name: "Global Identity Generator",
    description:
      "面向测试与学习场景的多地区虚构地址、手机号和支付标识生成工具。",
    meta: "Side project · Public repository · 2025",
    href: "https://github.com/TonyScript/Global_Identity_Generator",
  },
  {
    name: "ChinaTravelEasy",
    description:
      "为外国游客组织中国支付、交通、文化与旅行规划信息的多语言平台实验。",
    meta: "Side project · Public repository · 2025",
    href: "https://github.com/TonyScript/ChinaTravelEasy",
  },
  {
    name: "AI Customer Service Website",
    description:
      "以静态页面验证 AI 客服产品叙事、信息结构与响应式实现的公开项目。",
    meta: "Side project · Public repository · 2025",
    href: "https://github.com/TonyScript/ai-customer-service",
  },
] as const;

export const legacyArticles = [
  {
    title: "IFTTT — 让互联网为你工作",
    date: "2017-12-22",
    category: "生活与工具",
    href: "/2017/12/22/2017-12-22-Introducing-IFTTT/",
  },
  {
    title: "在 Mac 上使用终端配置 GitHub 账号",
    date: "2017-12-17",
    category: "Engineering",
    href: "/2017/12/17/2017-12-17-Using-GitHub-In-Terminal/",
  },
  {
    title: "用 VSCode 写 Python",
    date: "2017-12-17",
    category: "Engineering",
    href: "/2017/12/17/2017-12-17-Writing-Python-With-VSCode/",
  },
  {
    title: "写给 iOS 程序员的 Xamarin 入门教程",
    date: "2017-03-22",
    category: "Engineering",
    href: "/2017/03/22/2017-03-22-Xamarin.iOS-Getting-Started/",
  },
  {
    title: "写给 iOS 程序员的 Ionic 入门教程",
    date: "2017-03-16",
    category: "Engineering",
    href: "/2017/03/16/2017-03-16-ionic-getting-started/",
  },
  {
    title: "Xamarin.iOS 集成第三方库",
    date: "2017-03-14",
    category: "Engineering",
    href: "/2017/03/14/2017-03-14-Xamarin.iOS-Binding-Project/",
  },
  {
    title: "Xamarin.iOS 初步体验",
    date: "2017-03-02",
    category: "Engineering",
    href: "/2017/03/02/2017-03-03-a-small-bite-of-xamarin.iOS/",
  },
  {
    title: "2016 年技术路径",
    date: "2017-03-01",
    category: "Engineering",
    href: "/2017/03/01/2017-03-01-tech-path-of-2016/",
  },
  {
    title: "Sketch 常用快捷键",
    date: "2017-02-24",
    category: "Design",
    href: "/2017/02/24/2017-02-24-sketch-shortcuts/",
  },
  {
    title: "爱乐之城",
    date: "2017-02-21",
    category: "Misc",
    href: "/2017/02/21/2017-02-21-la-la-land/",
  },
] as const;
