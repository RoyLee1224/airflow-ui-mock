# Argos CI 视觉测试设置指南

## 📋 概述

Argos CI 会在每个 Pull Request 中自动捕获和对比 UI 截图，帮助审查者快速发现视觉变化。

## 🚀 设置步骤

### 1. 在 Argos CI 注册账号

1. 访问 [https://argos-ci.com](https://argos-ci.com)
2. 使用 GitHub 账号登录
3. 授权 Argos 访问你的 GitHub 仓库

### 2. 安装 Argos GitHub App

1. 在 Argos 仪表板中，点击 "Add a project"
2. 选择 `RoyLee1224/airflow-ui-mock` 仓库
3. 完成 GitHub App 安装（会要求授权）

### 3. 获取 ARGOS_TOKEN

1. 在 Argos 项目设置中找到 **Settings** → **Tokens**
2. 复制你的项目 Token
3. 这个 token 将用于 CI/CD 上传截图

### 4. 在 GitHub 仓库设置 Secret

1. 访问 GitHub 仓库：`https://github.com/RoyLee1224/airflow-ui-mock`
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 设置：
   - Name: `ARGOS_TOKEN`
   - Value: 粘贴从 Argos 复制的 token
5. 点击 **Add secret**

### 5. 更新依赖

在本地运行：

```bash
pnpm install
```

这会安装 `@argos-ci/cli`。

## 🔧 配置文件说明

### `argos.config.js`

已创建的配置文件包含：
- 截图目录：`./screenshots`
- 基准分支：`main`
- Token 从环境变量 `ARGOS_TOKEN` 读取

### GitHub Actions Workflow

`.github/workflows/test.yml` 已更新，包含：
1. 运行测试生成截图
2. 上传截图到 Argos
3. 备份截图为 GitHub Artifacts

## 📸 工作流程

### 在 PR 中使用

1. **创建 PR**：
   ```bash
   git checkout -b feature/new-ui-changes
   # 做一些 UI 修改
   git commit -am "Update dashboard UI"
   git push origin feature/new-ui-changes
   ```

2. **GitHub Actions 自动运行**：
   - 运行 Vitest 测试
   - 生成截图
   - 上传到 Argos

3. **在 PR 中查看**：
   - Argos 会在 PR 中添加一个状态检查
   - 点击 "Details" 查看视觉差异
   - 审查者可以直接在 Argos UI 中查看所有变化

### 本地测试

```bash
# 运行测试生成截图
pnpm test:run

# 手动上传到 Argos（需要设置 ARGOS_TOKEN 环境变量）
export ARGOS_TOKEN=your_token_here
pnpm argos
```

## 🎨 截图最佳实践

### 1. 稳定的测试数据

使用固定的 mock 数据确保截图一致：

```typescript
const mockData = {
  timestamp: '2025-11-16 10:00:00', // 固定时间
  count: 42, // 固定数值
};
```

### 2. 等待动画完成

在截图前等待动画：

```typescript
// 等待 1 秒让动画完成
await new Promise(resolve => setTimeout(resolve, 1000));
await page.screenshot({ path: 'screenshot.png' });
```

### 3. 隐藏动态元素

隐藏时钟、实时更新的元素：

```typescript
await page.evaluate(() => {
  // 隐藏时钟元素
  document.querySelector('.live-clock')?.remove();
});
```

## 🔍 审查 UI 变化

### Argos 仪表板

1. 访问 Argos 项目页面
2. 点击 PR 对应的 build
3. 查看所有截图差异：
   - **绿色**：没有变化
   - **黄色**：有变化待审核
   - **红色**：新增或删除的截图

### 批准变化

如果 UI 变化是预期的：
1. 在 Argos UI 中点击 **Approve**
2. 这将更新基准截图
3. PR 状态检查变为通过 ✅

### 拒绝变化

如果发现意外的 UI 变化：
1. 在 Argos UI 中查看具体差异
2. 修复代码
3. 推送新的提交
4. CI 会重新运行并上传新截图

## 📊 报告示例

Argos 会在 PR 中显示：

```
✅ Argos — No visual changes detected
🟡 Argos — 3 screenshots changed
❌ Argos — 2 screenshots failed
```

点击状态可以查看详细的视觉差异报告。

## 🛠️ 故障排查

### Token 错误

```
Error: ARGOS_TOKEN is not set
```

**解决**：确保在 GitHub Secrets 中设置了 `ARGOS_TOKEN`

### 截图不一致

**可能原因**：
- 动画未完成
- 动态时间戳
- 随机数据

**解决**：使用固定的 mock 数据和足够的等待时间

### Upload 失败

```
Error: Failed to upload screenshots
```

**解决**：检查网络连接和 token 有效性

## 📚 资源

- [Argos 官方文档](https://argos-ci.com/docs)
- [Playwright 截图指南](https://playwright.dev/docs/screenshots)
- [GitHub Actions 文档](https://docs.github.com/actions)

## 🎯 下一步

1. ✅ 完成 Argos 账号设置
2. ✅ 添加 ARGOS_TOKEN 到 GitHub Secrets
3. ✅ 创建测试 PR 验证集成
4. 📝 根据需要调整截图测试

---

**需要帮助？** 查看 [Argos CI Discord](https://discord.gg/argos-ci) 或提交 issue。
