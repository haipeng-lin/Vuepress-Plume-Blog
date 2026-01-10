---
title: MCP
createTime: 2025/12/20 23:52:15
permalink: /AI/r80xshz2/
---


## 概述

MCP （Model Context Protocol），模型上下文协议，简单来说，是一种用来负责两个大模型之间的通信，类似于后端开发中的 RPC 框架，实现两个不同服务器上的服务进行通信。

## 动手实操

### 开通 MCP 服务

点击链接[MCP.so]([https://mcp.so/zh](https://link.zhihu.com/?target=https%3A//mcp.so/zh))，搜索百度地图的 MCP 服务。根据指引去 [百度地图开放平台](https://lbsyun.baidu.com/apiconsole/key)申请一个 **AK**，作为后续的参数

### 引入依赖

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-mcp</artifactId>
    <version>1.0.1-beta6</version>
</dependency>
```

### 新建 AI 服务接口

```java
public interface McpService {

    @SystemMessage("你是一个地图助手")
    Flux<String> chat(@UserMessage String message);
    
}
```

### 百度 MCP 服务接口

```java
public interface BaiduMcpService {

    Flux<String> chatWithBaiduMCP(String question);

}
```

### 百度 MCP 服务实现类

将百度的 ak 替换成你的

```java
@Service
public class BaiduMcpServiceImpl implements BaiduMcpService {

    @Autowired
    private OpenAiStreamingChatModel openAiStreamingChatModel;

    @Override
    public Flux<String> chatWithBaiduMCP(String question) {
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("https://mcp.map.baidu.com/sse?ak=你的ak")
                .build();
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
        McpToolProvider toolProvider = McpToolProvider.builder()
                .mcpClients(mcpClient)
                .build();
        McpService mcpService = AiServices.builder(McpService.class)
                .streamingChatLanguageModel(openAiStreamingChatModel)
                .toolProvider(toolProvider)
                .build();
        return mcpService.chat(question);
    }
}
```

### Controller 层

```java
@RequestMapping("/api/v1/chat")
@RestController
public class MCPController {
    
    @Autowired
    private BaiduMcpService baiduMcpService;

    @GetMapping(value = "/mcp")
    public Flux<String> streamMemory(@RequestParam("message") String message) {
        return baiduMcpService.chatWithBaiduMCP(message);
    }

}
```

### 测试

```
http://localhost:8080/api/v1/chat/mcp?message=查询以下从广州到深圳的公交
```

![image-20251220164500988](https://img.haipeng-lin.cn/1766220301315.png)
