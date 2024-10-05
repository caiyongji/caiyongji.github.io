在Next.js博客中实现代码高亮显示并添加复制按钮的功能，你可以使用一些常见的工具和库。具体步骤如下：

### 1. 使用 `react-syntax-highlighter` 进行代码高亮
`react-syntax-highlighter` 是一个支持多种编程语言的代码高亮工具。

首先，安装这个库：

```bash
npm install react-syntax-highlighter
```

安装 Prism.js 的高亮主题支持：

```bash
npm install prismjs
```

### 2. 在 Next.js 中使用

在你的 Markdown 渲染组件中，使用 `react-syntax-highlighter` 来渲染带有代码高亮的代码块。

首先创建一个代码块渲染组件 `CodeBlock.js`：

```jsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';

const CodeBlock = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // 恢复按钮状态
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleCopy} 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: isCopied ? '#4CAF50' : '#555',
          color: 'white',
          border: 'none',
          padding: '5px',
          cursor: 'pointer',
        }}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter language={language} style={darcula}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
```

### 3. 修改 Markdown 渲染配置

如果你使用 `react-markdown` 来渲染 Markdown 文件，可以这样配置它使用自定义的代码块渲染器：

```bash
npm install react-markdown remark-gfm
```

在你的页面文件或组件中进行如下配置：

```jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持代码块
import CodeBlock from './CodeBlock';

const BlogPost = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default BlogPost;
```

### 4. 使用方法

现在，你可以传递 Markdown 内容到这个 `BlogPost` 组件中，它会自动渲染代码高亮，并在右上角显示复制按钮。

### 总结

通过使用 `react-syntax-highlighter` 和 `react-markdown`，你可以轻松实现带有代码高亮和复制按钮的 Markdown 渲染。如果需要更多的样式或功能，可以根据需求进一步自定义 `CodeBlock` 组件。