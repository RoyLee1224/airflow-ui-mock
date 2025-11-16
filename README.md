# Airflow UI Mock

这是一个 Apache Airflow 主页的模拟项目，使用 React + TypeScript + Chakra UI 构建，并通过 Vitest Browser Mode 进行测试。

## 功能特点

- ✨ 使用 React 19 和 TypeScript 构建
- 🎨 使用 Chakra UI v3 作为 UI 组件库
- 🧪 使用 Vitest Browser Mode 进行浏览器测试
- 📸 自动化截图测试功能
- 🚀 GitHub Actions 自动化测试工作流

## 项目结构

```
airflow-ui-mock/
├── src/
│   ├── components/
│   │   ├── AirflowHomePage.tsx       # Airflow 主页组件
│   │   └── AirflowHomePage.test.tsx  # 组件测试
│   ├── test/
│   │   └── setup.ts                  # 测试设置
│   ├── App.tsx                       # 应用入口
│   └── main.tsx                      # React 入口
├── screenshots/                      # 测试截图输出目录
├── .github/workflows/                # GitHub Actions 工作流
└── vitest.config.ts                 # Vitest 配置
```

## 安装依赖

```bash
pnpm install
```

## 开发

启动开发服务器：

```bash
pnpm dev
```

访问 http://localhost:5173 查看应用。

## 测试

### 运行所有测试

```bash
pnpm test:run
```

### 交互式测试

```bash
pnpm test
```

### 使用 UI 界面测试

```bash
pnpm test:ui
```

## 截图测试

项目包含以下截图测试：

1. **完整页面截图** - 捕获整个 Airflow 主页
2. **Header 截图** - 仅捕获顶部导航栏
3. **统计卡片截图** - 捕获 DAGs 统计信息
4. **DAGs 表格截图** - 捕获 DAGs 列表表格

所有截图都保存在 `screenshots/` 目录中。

## 构建

```bash
pnpm build
```

## 技术栈

- **框架**: React 19
- **语言**: TypeScript
- **UI 库**: Chakra UI v3
- **构建工具**: Vite
- **测试框架**: Vitest
- **浏览器测试**: @vitest/browser-playwright
- **包管理器**: pnpm

## CI/CD

项目使用 GitHub Actions 进行自动化测试：

- 每次 push 到 `main` 分支或以 `claude/` 开头的分支时触发
- 每次创建 Pull Request 时触发
- 自动运行所有测试
- 上传截图和测试结果作为 artifacts

## License

MIT
