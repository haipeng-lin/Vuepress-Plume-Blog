---
title: Hello LangChain4j
createTime: 2025/12/14 18:23:32
permalink: /AI/LangChain4j/
---


## 基础知识


相关链接：

- [Langchain4j 中文文档](https://docs.langchain4j.info/)


## 动手实操

### 引入依赖

```xml
<!-- langchain4j 集成 springboot相关的依赖 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-spring-boot-starter</artifactId>
</dependency>

<!-- OpenAI ，兼容多种模型 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
</dependency>
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
</dependency>
```

### yml 配置

声明模型信息，即可实现对应模型的自动注入

```yml
langchain4j:
  open-ai:
    chat-model:
      model-name: # 模型名称
      api-key: # 模型 key
      base-url: # 模型 url
```

### 业务层

- wiringMode = EXPLICIT：用户自己指定相关的bean
- chatModel = "openAiChatModel"：指定 AI 模型为：openAiChatModel（和yml配置对应）

```java
@AiService(wiringMode = EXPLICIT,
        chatModel = "openAiChatModel"
)
public interface OpenAiService {

    String chat(String message);
}
```

### 测试

```java
@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
class AiTest {

    @Autowired
    private OpenAiService openAiService;

    @Test
    void chat() {
        log.info(openAiService.chat("你好，你是谁啊"));
    }
}
```

测试结果：

![image-20251213111251808](https://img.haipeng-lin.cn/1765595572024.png)

