# 搜索模块设计

## 1. 功能描述

搜索模块的目标是在博客网站中提供一个全局搜索功能，允许用户通过输入关键字快速找到与博客文章相关的内容。搜索功能需要支持：
- 搜索博客的标题、描述、内容、以及标签。
- 实时显示搜索结果，用户输入时自动显示相关内容。
- 支持快捷键（Windows：Ctrl+K，Mac：Command+K）打开搜索框，提升用户体验。

## 2. 技术栈

- **前端框架**：Next.js（基于 React）
- **样式库**：Tailwind CSS
- **状态管理**：React Hooks (`useState`, `useEffect`)
- **搜索算法**：字符串匹配，或引入 `fuse.js` 实现模糊搜索
- **持久化数据**：通过文件系统（`fs`）和 Markdown 文件存储文章内容，使用 `getBlogPosts()` 读取数据

## 3. 功能需求

- **实时搜索**：用户输入关键字时，自动搜索并展示匹配结果，结果显示在下拉列表中。
- **匹配范围**：搜索博客的标题、描述、内容、标签。
- **快捷键支持**：提供快捷键（Ctrl+K 或 Command+K）快速打开搜索框。
- **结果点击跳转**：点击搜索结果后，用户能够跳转到对应的博客文章详情页面。

## 4. 详细设计

### 4.1 搜索框组件

#### 4.1.1 功能
搜索框位于导航栏中，用户可以在此输入查询关键字，系统根据输入内容实时更新匹配的搜索结果。通过监听快捷键（Ctrl+K 或 Command+K）用户能够快速聚焦到搜索框。

#### 4.1.2 实现步骤

1. **搜索框布局**：
   - 将 `<input>` 输入框集成到导航栏组件中，用户可以在此输入查询词。
   - 搜索框使用 `onKeyDown` 事件监听用户输入，当检测到快捷键时，自动聚焦到输入框。
   
2. **监听快捷键**：
   - 使用 `useEffect` 监听键盘事件，检测用户是否按下了 Ctrl+K 或 Command+K，如果按下，则触发焦点聚焦到搜索框。

3. **实时显示搜索结果**：
   - 当用户输入时，使用 `useState` 存储查询词，通过 `useEffect` 实时搜索并更新结果。
   - 搜索逻辑可以简单地使用字符串匹配，也可以引入 `fuse.js` 实现模糊匹配。
   - 匹配结果需要分类（如标题匹配、内容匹配、标签匹配等）。

4. **搜索结果展示**：
   - 匹配结果将以下拉列表的形式展示在搜索框下方。
   - 每个搜索结果可以展示博客文章的标题及其摘要，用户点击结果时，可以跳转到相应的文章详情页面。

5. **页面跳转**：
   - 搜索结果为每个文章提供链接 (`<Link>`)，点击搜索结果时跳转到博客详情页。

#### 4.1.3 示例代码

```jsx
import { useState, useEffect } from 'react';
import { getBlogPosts } from './lib/getBlogPosts';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const posts = getBlogPosts(); // 假设已经通过 getBlogPosts() 获取所有博客文章
  
  useEffect(() => {
    // 监听快捷键 Ctrl+K (Windows) 或 Command+K (Mac)
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus(); // 聚焦到搜索框
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();  // 转换为小写进行匹配
    setQuery(searchQuery);

    // 过滤符合搜索条件的文章
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery) || 
      post.description.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
    setResults(filteredPosts);
  };

  return (
    <div className="relative">
      <input 
        id="searchInput"
        type="text" 
        placeholder="Search (Ctrl+K / Command+K)" 
        value={query} 
        onChange={handleSearch}
        className="search-input" // 自定义 Tailwind CSS 样式
      />
      {query && results.length > 0 && (
        <ul className="absolute z-50 bg-white border rounded-lg w-full mt-2">
          {results.map(result => (
            <li key={result.slug} className="p-2 hover:bg-gray-200">
              <Link href={`/blog/${result.slug}`}>
                <a className="block">
                  <p className="font-semibold">{result.title}</p>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 4.2 搜索逻辑

#### 4.2.1 搜索范围
- **博客标题**：用户输入的关键字需要与博客标题匹配。
- **博客描述**：博客的简要描述也需要包含在搜索范围内。
- **博客正文**：搜索时，博客的正文内容也是一个匹配维度，尤其是长尾搜索，用户可能记住正文的一部分。
- **标签**：博客的标签（tags）也需被搜索到，方便用户通过标签找到相关内容。

#### 4.2.2 搜索算法
初期可采用字符串的 `includes()` 方法进行基本的模糊匹配。为了提升搜索体验和匹配精度，后期可以引入 `fuse.js` 库，支持更加智能的模糊搜索。

```js
// 引入 fuse.js 库进行模糊搜索
import Fuse from 'fuse.js';

const fuse = new Fuse(posts, {
  keys: ['title', 'description', 'content', 'tags'], // 设置匹配的字段
  threshold: 0.4 // 模糊匹配的灵敏度，数值越低匹配越严格
});

const handleSearch = (e) => {
  const searchQuery = e.target.value;
  setQuery(searchQuery);
  
  // 使用 fuse.js 进行模糊搜索
  const results = fuse.search(searchQuery);
  setResults(results.map(result => result.item)); // 获取符合条件的文章
};
```

### 4.3 快捷键支持

#### 4.3.1 快捷键触发
- 使用 `window.addEventListener('keydown')` 监听键盘按键。
- 当用户按下 `Ctrl+K` (Windows) 或 `Command+K` (Mac) 时，搜索框自动聚焦，用户可以立即开始输入搜索内容。

#### 4.3.2 代码实现
```js
useEffect(() => {
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      document.getElementById('searchInput').focus(); // 搜索框聚焦
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 4.4 搜索结果展示

#### 4.4.1 结果显示
- 搜索结果将以下拉列表的形式展示在搜索框下方，包含博客标题和简要描述。
- 每条搜索结果都可以点击跳转到相应的文章详情页面。

#### 4.4.2 样式设计
- 使用 Tailwind CSS 为下拉列表和结果项设计样式。
- 下拉列表在用户输入时显示，使用绝对定位确保其展示在搜索框下方，并设置 `z-index` 以确保不会被其他元素覆盖。

```css
.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
}

.search-results {
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  z-index: 50;
}
```

### 5. 模块设计总结

- **搜索范围**：匹配博客标题、描述、正文和标签。
- **快捷键支持**：通过 `Ctrl+K` 或 `Command+K` 快速打开搜索

框。
- **结果展示**：实时显示搜索结果，用户点击结果后跳转到博客详情页。
- **性能优化**：引入 `fuse.js` 提供模糊匹配功能，提高用户搜索体验。

### 6. 后续扩展功能

- **搜索历史**：记录用户的搜索历史，方便快速搜索曾经访问的文章。
- **热门搜索**：为用户提供热门搜索建议，提高用户体验。