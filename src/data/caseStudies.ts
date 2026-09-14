export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  machineSummary: string;
  status: string;
  scope: string;
  tags: readonly string[];
  context: readonly string[];
  problem: readonly string[];
  contribution: readonly string[];
  constraints: readonly string[];
  decisions: readonly { title: string; description: string }[];
  flow: readonly { title: string; description: string }[];
  rejected: readonly { title: string; description: string }[];
  artifacts: readonly { title: string; description: string }[];
  currentStatus: readonly string[];
};

export const caseStudyDisclosure =
  "An anonymized case study based on enterprise product design work. Client, company, implementation and commercial details are intentionally omitted.";

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "safe-agent-autonomy",
    title: "为企业运维 Agent 划定可控的自主边界",
    shortTitle: "Agent autonomy",
    summary:
      "把“Agent 能不能执行”拆成分级授权、确定性门禁、熔断与证据链，让自动化能力随风险逐级开放。",
    machineSummary:
      "A product model for safe enterprise operations agents using graded autonomy, explicit approval gates, allow-listed actions, circuit breakers, evidence trails and human override.",
    status: "Product design · Validated prototype",
    scope: "Agent governance · Enterprise IT operations",
    tags: ["AI Agents", "Governance", "AIOps"],
    context: [
      "企业运维 Agent 不只回答问题。它会读取监控与配置数据、生成判断，并可能调用工具改变生产系统。能力越接近执行，错误的影响范围就越大。",
      "因此，产品问题不是“是否使用 Agent”，而是不同场景下允许 Agent 走到哪一步、由谁批准、如何停止，以及事后能否还原决策依据。",
    ],
    problem: [
      "把自主能力设计成一个开关，会把低风险建议与高风险写操作混在一起。用户无法理解权限边界，平台也无法对不同动作实施差异化治理。",
      "另一个风险是把模型自己报告的置信度当成执行依据。概率输出可以帮助排序，但不能替代权限、规则与业务约束。",
    ],
    contribution: [
      "定义从建议到受控执行的自主等级，并把每一级映射到明确的用户责任与系统门禁。",
      "将审批、白名单、熔断、审计、人工接管和证据链纳入同一个产品模型，而不是作为上线后的补丁。",
      "通过交互原型验证建议、批准、执行、失败与回退在一条任务链中的信息连续性。",
    ],
    constraints: [
      "生产环境中的写操作必须遵循最小权限，读取能力不能自然继承为修改能力。",
      "高风险动作需要确定性规则和人工责任点，不能仅依赖模型判断。",
      "用户必须能够看到动作原因、输入证据、执行记录与失败位置。",
      "任何自动化路径都需要可停止、可降级、可回退。",
    ],
    decisions: [
      {
        title: "用等级表达自主权，而不是一个自动化开关",
        description:
          "L1 只给建议；L2 生成动作草案并等待人工批准；L3 只在预先授权、规则确定且动作进入白名单时自动执行。不设计无人监督的 L4。",
      },
      {
        title: "模型负责推理，确定性系统负责放行",
        description:
          "置信度用于排序和解释；权限、对象范围、时间窗口、变更规则与风险条件由可审计的门禁决定。",
      },
      {
        title: "证据链与动作链同时设计",
        description:
          "每个建议与动作都保留来源、理由、审批、工具调用、结果和异常，使用户能在一次阅读中回答“为什么做”和“实际做了什么”。",
      },
      {
        title: "把失败视为正式状态",
        description:
          "熔断、超时、部分成功、权限拒绝与人工接管都有明确出口，避免 Agent 在异常后继续尝试或静默失败。",
      },
    ],
    flow: [
      { title: "Observe", description: "读取事件、对象、关系与当前运行状态。" },
      { title: "Reason", description: "形成建议，标注证据、假设与不确定性。" },
      { title: "Gate", description: "检查自主等级、权限、白名单、规则与风险条件。" },
      { title: "Approve", description: "需要时由责任人确认动作、范围与影响。" },
      { title: "Act", description: "调用受限工具并持续检查超时、失败与熔断条件。" },
      { title: "Record", description: "写入结果、差异、异常、人工干预与后续建议。" },
    ],
    rejected: [
      {
        title: "通用、无边界的 AI 助手",
        description: "它隐藏权限与责任差异，也无法让用户预测一次请求会触发什么动作。",
      },
      {
        title: "用模型自报置信度直接放行",
        description: "统计置信度不是业务授权，不能替代确定性控制。",
      },
      {
        title: "默认开放写工具",
        description: "读取和修改是两种不同风险等级，必须分别授权。",
      },
      {
        title: "无人监督的最高自治",
        description: "在企业运维语境下，缺少责任点与紧急停止机制的自治不可接受。",
      },
    ],
    artifacts: [
      { title: "Autonomy model", description: "自主等级、用户责任、动作权限与升级条件。" },
      { title: "Action register", description: "动作风险、门禁、审批、熔断与回退要求。" },
      { title: "Interaction prototype", description: "建议、批准、执行、失败与审计状态的端到端原型。" },
      { title: "Governance specification", description: "权限、证据、人工接管与可追溯性规则。" },
    ],
    currentStatus: [
      "已完成产品模型与交互原型层面的验证。",
      "本案例不声称已经生产上线，也不公开内部实施状态、客户信息或业务结果。",
    ],
  },
  {
    slug: "agent-tool-architecture",
    title: "把 Agent、工具与业务能力组织成可治理的系统",
    shortTitle: "Agent-tool system",
    summary:
      "用“业务任务—场景 Agent—领域工具—触发方式—治理策略”组织能力，避免 Agent 数量膨胀与工具权限失控。",
    machineSummary:
      "A governed capability architecture that separates business jobs, scenario agents, domain tools, triggers and policies while keeping write authority explicit and auditable.",
    status: "Product design · Validated prototype",
    scope: "Agent architecture · Tool governance",
    tags: ["AI Agents", "MCP", "Platform design"],
    context: [
      "当多个产品域同时接入 AI，最容易出现的不是能力不足，而是命名、入口、工具和权限各自生长：一个功能一个 Agent、一个页面一个助手、每个团队维护一套调用方式。",
      "用户看到的是不断增加的 Agent 名称，平台承担的却是重复工具、重叠职责、不可见权限与难以追踪的调用关系。",
    ],
    problem: [
      "如果按页面或功能创建 Agent，数量会随产品菜单线性增长，却不能回答“用户究竟要完成什么工作”。",
      "如果把所有 API 包装成一个通用工具箱，Agent 可以调用什么、何时能写、失败由谁处理都会变得模糊。",
    ],
    contribution: [
      "从用户要完成的业务任务反推 Agent 边界，而不是从已有页面或模型能力出发。",
      "将用户可见的场景 Agent 与可复用的领域工具分层，建立统一的触发、授权与审计关系。",
      "用能力目录和交互原型检查重复能力、越权写操作与跨产品依赖。",
    ],
    constraints: [
      "同一领域能力需要被多个场景复用，不能复制成互不兼容的 Agent。",
      "读取、建议与写入必须分开授权，工具描述不能等同于调用许可。",
      "工程术语需要留在平台治理层，业务用户只应看到任务、条件与结果。",
      "跨产品调用需要统一身份、上下文、错误语义与追踪记录。",
    ],
    decisions: [
      {
        title: "Agent 以业务任务命名",
        description: "Agent 对应一个有开始、判断与完成条件的工作，而不是一个页面、按钮或模型能力。",
      },
      {
        title: "工具按领域沉淀并复用",
        description: "监控、配置、工单与自动化能力作为受治理工具存在，同一工具可以服务多个场景 Agent。",
      },
      {
        title: "触发方式是一等设计对象",
        description: "用户发起、事件触发、定时触发与工作流调用拥有不同的上下文、响应时间和责任边界。",
      },
      {
        title: "策略决定可调用范围",
        description: "工具是否可见、是否可写、作用对象、调用次数与审批要求由策略控制，并进入统一审计。",
      },
    ],
    flow: [
      { title: "Business job", description: "以用户需要完成的工作定义入口与成功条件。" },
      { title: "Scenario agent", description: "管理任务上下文、推理过程与多步协作。" },
      { title: "Domain tool", description: "提供边界清晰、可复用、可观测的读取或动作能力。" },
      { title: "Trigger", description: "声明由人、事件、计划或工作流何时启动。" },
      { title: "Policy", description: "校验身份、权限、对象范围、风险和审批要求。" },
      { title: "Trace", description: "记录输入、工具调用、状态变化、结果与人工反馈。" },
    ],
    rejected: [
      {
        title: "一个功能对应一个 Agent",
        description: "它复制现有菜单结构，制造命名膨胀，却没有形成新的任务能力。",
      },
      {
        title: "所有能力放进通用工具箱",
        description: "工具边界、权限与异常责任无法按业务风险治理。",
      },
      {
        title: "把 MCP 等工程概念直接暴露给业务用户",
        description: "用户需要理解任务与后果，而不是学习平台内部的连接协议。",
      },
      {
        title: "绕过目录的私有调用",
        description: "无法统一发现、授权、版本管理和审计的能力会成为长期治理盲点。",
      },
    ],
    artifacts: [
      { title: "Capability map", description: "业务任务、Agent、工具、触发与策略之间的映射。" },
      { title: "Agent and tool catalog", description: "能力边界、输入输出、权限与复用关系。" },
      { title: "Governance rules", description: "身份、授权、写操作、配额、审计与版本要求。" },
      { title: "Platform prototype", description: "面向业务用户和平台管理员的双层交互原型。" },
    ],
    currentStatus: [
      "已完成能力架构、目录模型与关键治理交互的产品设计验证。",
      "公开版本不披露内部能力清单、接口数量、实现计划与组织分工。",
    ],
  },
  {
    slug: "incident-resolution-loop",
    title: "让告警、配置关系与工单形成连续的处置闭环",
    shortTitle: "Incident workflow",
    summary:
      "把监控事件、关系上下文、根因证据、工单与执行回写串成同一条任务链，减少跨系统复制与判断断点。",
    machineSummary:
      "A cross-product incident resolution loop connecting monitoring events, configuration relationships, evidence-based root cause analysis, ticket drafting, dispatch recommendations and auditable write-back.",
    status: "Product design · Validated prototype",
    scope: "AIOps · CMDB · ITSM workflow",
    tags: ["AIOps", "CMDB", "ITSM"],
    context: [
      "真实的事件处置横跨多个产品域：监控系统发现异常，配置关系解释影响范围，分析能力提出根因，工单承接协作，自动化工具执行动作。",
      "如果每一步只在自己的页面完成，用户就需要反复复制对象、时间线、证据与结论。系统拥有数据，任务却没有连续上下文。",
    ],
    problem: [
      "常见的 AI 助手只停留在聊天侧栏，能够总结当前页面，却无法承接前序状态、推动后续动作或把结果写回原任务。",
      "跨产品跳转也容易丢失对象身份、事件窗口与证据来源，导致同一判断被重复执行。",
    ],
    contribution: [
      "以一次事件从发现到关闭的完整责任链为主线，重新组织跨产品入口与状态。",
      "定义监控对象、配置关系、指标、日志、分析结论和工单之间的上下文传递。",
      "设计人工确认点、动作建议、执行回写与审计视图，验证闭环而不是单次回答。",
    ],
    constraints: [
      "不同系统对同一对象可能使用不同标识，需要可追踪的对象映射。",
      "分析结论必须附带证据与时间窗口，不能只给出自然语言答案。",
      "工单和执行动作会改变业务状态，必须保留人工控制与责任归属。",
      "失败、重复、过期与部分完成不能被压缩成一个“已处理”状态。",
    ],
    decisions: [
      {
        title: "以任务状态贯穿产品，而不是以页面承接上下文",
        description: "事件对象、证据、假设、责任人与下一步动作随着任务移动，页面只是同一状态的不同观察窗口。",
      },
      {
        title: "RCA 必须展示证据结构",
        description: "结论同时关联关系路径、时间线、指标或日志信号，并区分事实、推断与待验证项。",
      },
      {
        title: "Agent 先生成可审阅的动作草案",
        description: "工单内容、指派建议与执行步骤在写入前可检查、修改和批准，避免把自然语言回答直接当成系统动作。",
      },
      {
        title: "结果回写原任务并驱动下一状态",
        description: "执行结果、失败原因和人工处置回到事件与工单上下文，支持继续分析、升级或关闭。",
      },
    ],
    flow: [
      { title: "Event", description: "接收监控事件并识别受影响对象与时间窗口。" },
      { title: "Context", description: "补充配置关系、变更、相邻指标与历史事件。" },
      { title: "Analysis", description: "形成带证据的根因假设与影响判断。" },
      { title: "Ticket draft", description: "生成可编辑的摘要、证据、优先级与处理建议。" },
      { title: "Decision", description: "由责任人确认指派、动作范围与风险。" },
      { title: "Execution", description: "调用受限流程或工具，并记录每一步结果。" },
      { title: "Write-back", description: "同步工单、事件、对象状态与审计记录。" },
    ],
    rejected: [
      {
        title: "与工作流分离的聊天助手",
        description: "回答不能自然变成任务状态、责任分配或后续动作。",
      },
      {
        title: "在系统之间复制粘贴上下文",
        description: "容易丢失对象、时间与来源，也让审计链在人工转述处断裂。",
      },
      {
        title: "把分析结论直接视为变更批准",
        description: "诊断、决策与执行责任必须分开。",
      },
      {
        title: "只设计成功路径",
        description: "真实处置包含重复事件、证据冲突、工具失败、人工接管与重新开启。",
      },
    ],
    artifacts: [
      { title: "End-to-end task model", description: "事件、分析、工单、执行与回写的状态关系。" },
      { title: "Context contract", description: "跨产品传递的对象、时间、证据、责任人与状态字段。" },
      { title: "Decision views", description: "根因证据、工单草案、批准与执行结果的交互原型。" },
      { title: "Exception matrix", description: "重复、过期、失败、部分完成与人工接管路径。" },
    ],
    currentStatus: [
      "已完成端到端任务模型与关键页面原型的验证。",
      "公开案例不包含客户环境、内部工单、产品截图、接口细节或生产效果数字。",
    ],
  },
] as const;

export function getCaseStudyHref(study: Pick<CaseStudy, "slug">) {
  return `/work/${study.slug}/`;
}
