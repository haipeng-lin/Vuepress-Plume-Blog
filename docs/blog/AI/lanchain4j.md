---
title: lanchain4j
createTime: 2025/12/04 23:52:53
permalink: /blog/fsft26fj/
cover: https://img.haipeng-lin.cn/20251214224800.png
coverStyle:
    layout: left
    ratio: '16:9'
    width: 300
excerpt: '1.介绍:一个将 LLM （语言大模型）**快速且简单**的集成到 Java 应用程序中的大模型应用框架'
tags:
    - linux
    - PostgreSQL

---
# 初识Lanchain4j

## 1.介绍

一个将 LLM （语言大模型）**快速且简单**的集成到 Java 应用程序中的大模型应用框架

## 2.核心功能

- 集成 LLM 提供商
- 集成嵌入（向量）存储
- 集成嵌入模型
- RAG（检索-增强-生成）

## 3.使用场景

- 智能辅助客服
- 知识库
- 处理大量非结构化数据（文件、网页等）并从中提取结构化信息

## 4.练手

### 4.1 Maven依赖

```yml
<!-- langchain4j 核心依赖 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
    <version>${langChain4j.version}</version>
</dependency>

<!-- openai 集成依赖 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
    <version>${langChain4j.version}</version>
</dependency>

<!-- langchain4j 启动starter -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-spring-boot-starter</artifactId>
    <version>1.0.1-beta6</version>
</dependency>

<!-- openai 启动starter -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
    <version>1.0.1-beta6</version>
</dependency>
```

### 4.2 Yml配置

```yml
langchain4j:
  open-ai:
    # 普通聊天模型
    chat-model:
      api-key: sk-351577a18cf4473da669e62ec20b182c
      model-name: qwen-max
      base-url: https://dashscope.aliyuncs.com/compatible-mode/v1
```

### 4.3 AI服务

```java
/**
 * wiringMode：
 *      EXPLICIT：手动指定具体模型
 * chatModel：
 *      openAiChatModel：注入openAiChatModel的模型
 */
@AiService(wiringMode = EXPLICIT,
        chatModel = "openAiChatModel"
)
public interface AiAssistantService {
    String chat(String message);
}
```

### 4.4 Controller层

```java
@Slf4j
@RestController
@RequestMapping("/ai/chat")
public class AiController {

    @Autowired
    private AiAssistantService aiSqlAssistantService;

    @Anonymous
    @GetMapping("/test")
    public String test(@RequestParam("question")String question) {
        return aiSqlAssistantService.chat(question);
    }
}
```







# Lanchain4j实现有记忆的AI调用

## 1.技术选型

- Java：17
- Lanchain4j：1.0.1
- LLM（百炼阿里）
  - chat模型：qwen-max
  - embedding模型：text-embedding-v4

## 2.步骤



## 3.练手

### 3.1 Maven依赖

```xml
<!-- langchain4j 核心依赖 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
    <version>${langChain4j.version}</version>
</dependency>

<!-- openai 集成依赖 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
    <version>${langChain4j.version}</version>
</dependency>

<!-- langchain4j 启动starter -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-spring-boot-starter</artifactId>
    <version>1.0.1-beta6</version>
</dependency>

<!-- openai 启动starter -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
    <version>1.0.1-beta6</version>
</dependency>

<!-- pg向量 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-pgvector</artifactId>
    <version>1.0.0-beta3</version>
</dependency>

<!-- 响应流式输出 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-reactor</artifactId>
    <version>1.0.1-beta6</version>
</dependency>

<!-- list -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>${guava.version}</version>
</dependency>
```

### 3.2 Yml配置

```yml
langchain4j:
  open-ai:
    # 普通聊天模型
    chat-model:
      api-key: sk-351577a18cf4473da669e62ec20b182c
      model-name: qwen-max
      base-url: https://dashscope.aliyuncs.com/compatible-mode/v1
    # 流式相应模型
    streaming-chat-model:
      api-key: sk-351577a18cf4473da669e62ec20b182c
      model-name: qwen-max
      base-url: https://dashscope.aliyuncs.com/compatible-mode/v1
    # 向量模型
    embedding-model:
      api-key: sk-351577a18cf4473da669e62ec20b182c
      model-name: text-embedding-v4
      base-url: https://dashscope.aliyuncs.com/compatible-mode/v1
```

### 3.3 AI服务

```java
@AiService(wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        streamingChatModel = "openAiStreamingChatModel",
        chatMemoryProvider = "chatMemoryProvider",
        contentRetriever = "contentRetriever"
)
public interface AiAssistantService {
    String chat(String message);

    @SystemMessage("👉 将文本改写成类似小红书的 Emoji 风格")
    Flux<String> chatWithStream(@MemoryId String memoryId, @UserMessage String message);
}
```

### 3.4 AI配置

```java
@Configuration
public class AiConfiguration {

    /**
     * 聊天记忆 提供者
     *
     * @param persistentChatMemoryStore 对话内容持久化对象
     * @return 对话记忆 provider
     */
    @Bean(name = "chatMemoryProvider")
    public ChatMemoryProvider jdbcChatMemoryProvider(PersistentChatMemoryStore persistentChatMemoryStore) {
        return memoryId -> MessageWindowChatMemory
                .builder()
                .id(memoryId)
                // 这里使用了自定义的会话存储对象, 可以通过其实现对话过程内容的持久化
                // 本地测试的话可以使用 InMemoryChatMemoryStore对象实现内存存储
                .chatMemoryStore(persistentChatMemoryStore)
                .maxMessages(5)
                .build();
    }

    /**
     * 向量存储对象
     *
     * @param embeddingModel 向量模型
     * @return 向量存储对象
     */
    public EmbeddingStore<TextSegment> embeddingStore(EmbeddingModel embeddingModel) {
        return PgVectorEmbeddingStore
                .builder()
                .host("8.155.33.36")                          // 必需：PostgresSQL 实例的主机
                .port(55432)                                 // 必需：PostgresSQL 实例的端口
                .database("postgres")                        // 必需：数据库名称
                .user("postgres")                                // 必需：数据库用户
                .password("20020307")                          // 必需：数据库密码
                .table("test_embedding")                      // 必需：存储嵌入的表名
                .dimension(embeddingModel.dimension())       // 必需：嵌入的维度
                .metadataStorageConfig(DefaultMetadataStorageConfig.defaultConfig()) // 元数据存储配置
                .build();
    }

    /**
     * 内容检索器
     *
     * @param embeddingModel 向量模型
     * @return 内容检索器
     */
    @Bean(name = "contentRetriever")
    public ContentRetriever contentRetriever(EmbeddingModel embeddingModel) {
        return EmbeddingStoreContentRetriever
                .builder()
                .embeddingStore(this.embeddingStore(embeddingModel))
                .embeddingModel(embeddingModel)
                .maxResults(10)
                .minScore(0.65)
                .build();
    }
}

```

### 3.5 记忆持久化&检索

```java
@Service
public class PersistentChatMemoryStore implements ChatMemoryStore {
    final ArrayListMultimap<Object, ChatMessage> messagesStore = ArrayListMultimap.create();

    @Override
    public List<ChatMessage> getMessages(Object memoryId) {
        return messagesStore.get(memoryId);
    }

    @Override
    public void updateMessages(Object memoryId, List<ChatMessage> messages) {
        messagesStore.put(memoryId, messages.get(messages.size() - 1));
    }


    @Override
    public void deleteMessages(Object memoryId) {
        messagesStore.removeAll(memoryId);
    }
}
```

### 3.6 Controller层

```java
@Slf4j
@RestController
@RequestMapping("/ai/chat")
public class AiController {

    @Autowired
    private AiAssistantService aiSqlAssistantService;

    @Anonymous
    @GetMapping("/test")
    public String test(@RequestParam("question")String question) {
        return aiSqlAssistantService.chat(question);
    }

    @Anonymous
    @GetMapping(value = "/stream", produces = "text/stream;charset=utf-8")
    public Flux<String> streamMemory(@RequestParam("id") String id, @RequestParam("question") String question) {
        final Flux<String> chatResponse = aiSqlAssistantService.chatWithStream(id, question);
        return chatResponse
                .doOnNext(partial -> log.info("chat stream partial data:{}", partial))
                .doOnError(e -> log.error("stream output error", e))
                .doOnComplete(() -> log.info("chat stream complete"));
    }
}
```





# RAG（检索-增强-生成）

## 1.简要概念

**核心概念**：

- Document：文档。LangChain4j 世界中的知识载体
- Metadata：元数据。标记文档上下文信息
- TextSegment：文本片段。当一个文档被拆分成多个部分后，每一段就是一个 TextSegment
- Embedding：嵌入向量。将文字转化为“数字世界的理解形式”

**文档处理组件**：

- Document Loader：文档加载器。从各类来源中读取原始内容
- Document Parser：文档解析器。从含有表格、HTML 标签的富文本中提取可用的纯文本
- Document Transformer：文档转换器。可选，对文档内容进行加工，比如摘要、去重、敏感词处理
- Document Splitter：文档拆分器。支持按段落、按句子、按字符智能拆分

**嵌入处理组件**：

- Embedding Model：嵌入模型。将高维数据（如文本、图像或其他类型的对象）转换为低维的向量表示
- Embedding Store：嵌入存储。存储和管理嵌入向量，相似度查询，元数据过滤
- Embedding Store Ingestor：嵌入存储摄取器。=== 嵌入模型 + 拆分器 + 存储器

## 2.详细概念

### 2.1 Document

Documnet表示一整篇文档，如一篇PDF文档或者一个网页内容。目前仅能表示文本信息，LangChain4j官方文档说未来Document会支持图片和表格。

Document核心方法：

- Document.text()：返回文档中的文本信息
- Document.metadata()：返回文档的原数据信息
- Document.toTextSegment（）：将文档转换为文本片段
- Document.from(String, Metadata)：根据文本和元数据创建文本对象
- Document.from(String)：根据文本创建Document对象

### 2.2 Metadata

每个文档都包含元数据，它存储有关`文档`的元信息。例如其名称，来源，最后更新日期，所有者。

Document核心方法：

- Document.text()：返回文档中的文本信息
- Document.metadata()：返回文档的原数据信息
- Document.toTextSegment（）：将文档转换为文本片段
- Document.from(String, Metadata)：根据文本和元数据创建文本对象
- Document.from(String)：根据文本创建Document对象

### 2.3 Document Loader

将指定位置的文档解析转换为文件输入流和元数据。目前支持多种内置加载器

- 