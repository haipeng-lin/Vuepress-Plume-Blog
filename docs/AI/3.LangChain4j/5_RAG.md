---
title: RAG
createTime: 2025/12/20 23:52:15
permalink: /AI/kb7egng0/
---


## 概述

简单来说，RAG 是一种在发送给 LLM 之前，从你的数据中找到并注入相关信息片段到提示中的方法。 这样 LLM 将获得（希望是）相关信息，并能够使用这些信息回复， 这应该会**降低产生幻觉**的概率。

相关信息片段可以使用各种[信息检索](https://en.wikipedia.org/wiki/Information_retrieval)方法找到。 最流行的方法有：

- **全文（关键词）搜索**：这种方法使用 TF-IDF 和 BM25 等技术， 通过匹配查询（例如，用户提问的内容）中的关键词与文档数据库进行搜索。 它根据每个文档中这些关键词的频率和相关性对结果进行排名。
- **向量搜索**：也称为"语义搜索"。 使用嵌入模型将我们的文本文档转换为数字向量。 然后根据查询向量和文档向量之间的余弦相似度 或其他相似度/距离度量找到并排序文档。简单来说就是将一些文本转变成多维的向量存储进数据库中

RAG 的三个核心过程：

- 索引
- 检索
- 生成

## 简要概念

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

## 核心 API

### 文档加载器

文档加载器，用于把磁盘或者网络中的数据加载进程序

- **FileSystemDocumentLoader**：根据本地磁盘绝对路径加载
- **ClassPathDocumentLoader**：相对于类路径加载
- **UrlDocumentLoader**：根据url路径加载

### 文档解析器

文档解析器，用于解析使用文档加载器加载进内存的内容，把非纯文本数据转化成纯文本

- **TextDocumentParser**：解析纯文本格式的文件
- **ApachePdfBoxDocumentParser**，解析pdf格式文件
- **ApachePoiDocumentParser**，解析微软的office文件，例如DOC、PPT、XLS
- **ApacheTikaDocumentParser**（默认），几乎可以解析所有格式的文件

### 文档分割器

文档分割器，用于把一个大的文档，切割成一个一个的小片段：

- **DocuemntByParagraphSplitter**：按照段落分割文本
- **DocumentByLineSplitter**：按照行分割文本
- **DocumentBySentenceSplitter**：按照句子分割文本
- **DocumentByWordSplitter**，按照词分割文本
- **DocumentByCharacterSplitter**，按照固定数量的字符分割文本
- **DocumentByRegexSplitter**，按照正则表达式分割文本
- **DocumentSplitters.recursive(…)**(默认)，递归分割器,优先段落分割，再按照行分割，再按照句子分割，再按照词分割

## 向量数据库

**内存存储 (In-Memory)**：通常用于测试或小型演示。

- 实现类：`InMemoryEmbeddingStore`

**持久化数据库 (Vector Databases)**：用于生产环境，常见的有：

- **Redis**: `RedisEmbeddingStore`
- **Milvus**: `MilvusEmbeddingStore`
- **Pinecone**: `PineconeEmbeddingStore`
- **Elasticsearch**: `ElasticsearchEmbeddingStore`
- **Chroma**: `ChromaEmbeddingStore`
- **PostgreSQL (pgvector)**: `PgVectorEmbeddingStore`

## 动手实操

### 环境准备

- 已安装 PostgreSQL 数据库（版本：15），和安装 pgvector 插件。安装教程：[Linux安装PostgreSQL](https://haipeng-lin.cn/blog/h0qjsice/)

- 开通阿里云百炼的 text-embedding-v4 向量模型，以及开通一个密钥

- 新建一个测试文件

  ```shell
  6年1班的前五名学生成绩如下：
  
  - 小红：语文100分，数学100分，英语100分
  - 小强：语文90分，数学100分，英语100分
  - 小青：语文90分，数学90分，英语100分
  - 小白：语文80分，数学80分，英语100分
  - 小黑：语文80分，数学80分，英语80分
  ```

### 引入依赖

```xml
<!-- pgvector 向量存储 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-pgvector</artifactId>
</dependency>
```

### 配置 yml 

配置 embedding-model 模型名称和 key

```yml
langchain4j:
  open-ai:
    # 普通对话
    chat-model:
      model-name: ZhipuAI/GLM-4.6
      api-key: 
      base-url: https://api-inference.modelscope.cn/v1/
    # 流式对话
    streaming-chat-model:
      model-name: Qwen/Qwen3-VL-8B-Instruct
      api-key: 
      base-url: https://api-inference.modelscope.cn/v1/
  community:
    dashscope:
      chat-model:
        model-name: qwen-max
        api-key: 
      embedding-model:	// [!code ++]
        model-name: text-embedding-v4	// [!code ++]
        api-key: 你的密钥	// [!code ++]
```

### 配置 PgVector 

```java
@Configuration
public class PgVectorConfig {

    @Bean("pgVectorEmbeddingStore")
    public EmbeddingStore<TextSegment> embeddingStore() {
        return PgVectorEmbeddingStore.builder()
                .host("8.155.33.36")          // 数据库地址
                .port(55432)                 // 端口
                .user("postgres")           // 用户名
                .password("20020307")       // 密码
                .database("postgres")        // 数据库名
                .table("test_embeddings")   // 向量表名（不存在会自动创建）
                .dimension(1024)            // text-embedding-v4的推荐向量维度
                .build();
    }
}
```

### 配置 RagConfig

```java
@Configuration
public class RagConfig {

    // 我们已经在 yml 配置了向量模型
    @Resource
    private EmbeddingModel embeddingModel;

    @Resource
    private PgVectorEmbeddingStore pgVectorEmbeddingStore;
    
    @Bean
    public ContentRetriever contentRetriever() {
        
        // 1、文档加载器
        List<Document> documents = FileSystemDocumentLoader.loadDocuments("src/main/resources/docs");
        // 2、文档分割器：将每个文档按每段进行分割，最大 1000 字符，每次重叠最多 200 个字符
        DocumentByParagraphSplitter paragraphSplitter = new DocumentByParagraphSplitter(1000, 200);
        // 3、自定义文档加载器
        EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
                .documentSplitter(paragraphSplitter)
                // 为了提高搜索质量，为每个 TextSegment 添加文档名称
                .textSegmentTransformer(textSegment -> TextSegment.from(
                        textSegment.metadata().getString("file_name") + "\n" + textSegment.text(),
                        textSegment.metadata()
                ))
                // 使用向量模型
                .embeddingModel(embeddingModel)
                // 指定 PgVector 向量存储
                .embeddingStore(pgVectorEmbeddingStore)
                .build();
        // 4、加载文档
        ingestor.ingest(documents);
        // 5、自定义内容查询器
        ContentRetriever contentRetriever = EmbeddingStoreContentRetriever.builder()
                .embeddingStore(pgVectorEmbeddingStore)
                .embeddingModel(embeddingModel)
                .maxResults(5) // 最多 5 个检索结果
                .minScore(0.75) // 过滤掉分数小于 0.75 的结果
                .build();
        return contentRetriever;
    }
}
```

### 配置向量存储

```java
@AiService(wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        streamingChatModel = "openAiStreamingChatModel",
        contentRetriever = "contentRetriever",	   // 内容检索器			// [!code ++]
        chatMemoryProvider = "chatMemoryProvider"  // 聊天记忆提供者		
)
public interface OpenAiService {

    @SystemMessage("你是一名解答难题的小助手")
    String chat(String message);

    @SystemMessage("你是一名解答难题的小助手")	
    Flux<String> chatWhitStream(String message);

    @SystemMessage("你是一名解答难题的小助手")
    Flux<String> chatWithStreamMemory(@MemoryId String memoryId, @UserMessage String message);
}
```

### Controller 层

```java
@RequestMapping("/api/v1/chat")
@RestController
public class ChatController {

    @Autowired
    private OpenAiService openAiService;
    
    @GetMapping(value = "/stream")	// [!code ++]
    public Flux<String> chatOllamSearch(@RequestParam("message") String message) {	// [!code ++]
        return openAiService.chatWhitStream(message);	// [!code ++]
    }	// [!code ++]

    @GetMapping(value = "stream/memory", produces = TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamMemory(@RequestParam("memoryId") String memoryId, @RequestParam("message") String message) {
        return openAiService.chatWithStreamMemory(memoryId, message);
    }   
}
```

### 测试

```
http://localhost:8080/api/v1/chat/stream?message=6年1班的成绩第一名和第三名是谁，各科成绩多少，总成绩多少
```

![image-20251220173925009](https://img.haipeng-lin.cn/1766223565271.png)
