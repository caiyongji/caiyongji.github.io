---
title: About
toc: false
---

ccccccc  Hextra is designed to be a simple, fast, and flexible theme for building modern static websites. It is especially well-suited for documentation websites but can also be used for various types of sites, such as blogs, portfolios, and more.

Hugo, like Jekyll, is a static site generator. What sets Hugo apart is that it is a single binary, making it easy to install and run on various platforms. It is also extremely fast and reliable, capable of rendering a site with thousands of pages in milliseconds.

Hextra is built with a mindset focused on having a minimal footprint. To get started, no extra dependencies like Node.js packages are required; all you need is a single YAML configuration file, along with your Markdown content. Thus, we can focus on writing quality content instead of setting up tooling.

## 代码示例

以下是一个简单的 Go 语言 Hello World 程序：


```python
print("Hello, World!")
```

```xml
<!-- 定义数据源，使用自己实现的数据源 -->
<bean id="dataSource" class="cn.itcast.usermanage.spring.DynamicDataSource">
<!-- 设置多个数据源 -->
<property name="targetDataSources">
<map key-type="java.lang.String">
<!-- 这个key需要和程序中的key一致 -->
<entry key="master" value-ref="masterDataSource"/>
<entry key="slave" value-ref="slave01DataSource"/>
</map>
</property>
<!-- 设置默认的数据源，这里默认走写库 -->
<property name="defaultTargetDataSource" ref="masterDataSource"/>
</bean>
```