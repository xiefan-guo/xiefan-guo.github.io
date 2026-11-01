_https://xiefan-guo.github.io/_

## 代码结构

本站使用静态 HTML、CSS 和 JavaScript，无需构建。

- `index.html`、`papers.html`、`activities.html`、`blog.html`：主站页面内容。
- `posts/`：Blog 文章；文章专用样式按需加载。
- `assets/images/`：主站头像和文章插图统一存放于此。
- `assets/data/`：文章使用的文献目录、基准数据及可下载的审查记录。
- `assets/css/styles.css`：主站和文章的共享字体、布局、组件及响应式样式。共享页面容器使用 `.content.page`，避免重复添加内联间距。
- `assets/js/news.js`：首页 News 的展开与收起。
- `assets/js/blog.js`：Blog 搜索和置顶排序。
- `assets/js/back-to-top.js`：长文章的返回顶部按钮。

首页 News 的常显条目直接写入 `#newsList`；需要折叠的历史条目添加 `extra hidden` 类。招聘提示文字使用 `.opportunity-label`。

## 维护 Blog 列表

文章入口统一维护在 `blog.html` 的 `#blogPosts` 列表中。

- **新增文章**：复制一个 `li.post-list-item`，更新链接、标题和日期，放在希望显示的位置。
- **置顶**：给文章的 `li` 添加 `data-pinned="true"`；删除该属性即可取消。脚本会在标题旁自动生成小号置顶标记，将置顶文章排在前面，其余文章保持 HTML 中的顺序。
- **搜索**：按文章标题搜索，不区分大小写；多个关键词同时匹配。

HTML 中也建议把置顶文章放在前面，以便禁用 JavaScript 时仍保持置顶顺序。无 JavaScript 时所有文章标题链接与日期照常显示。

样式位于 `assets/css/styles.css` 的 Blog 部分，交互逻辑位于 `assets/js/blog.js`。
