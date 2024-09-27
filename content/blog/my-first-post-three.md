---
title: "我的第3333篇博客文章"
date: 2023-04-15T14:33:00+08:00
draft: false
tags: ["Hugo", "博客"]
categories: ["技术"]
---

# 欢迎来到我的博客

这是我使用 Hugo 创建的第一篇博客文章。

## Hugo 简介

Hugo 是一个快速而灵活的静态网站生成器，使用 Go 语言编写。

### 为什么选择 Hugo？

1. 速度快
2. 易于使用
3. 主题丰富

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

