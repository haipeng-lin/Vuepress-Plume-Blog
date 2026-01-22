---
title: SpringBoot集成支付宝沙箱
createTime: 2025/12/29 21:58:43
permalink: /blog/qxc60hk5/
cover: https://img.haipeng-lin.cn/20251230234727.png
coverStyle:
  layout: left
  ratio: "16:9"
  width: 300
excerpt: '下载：[支付宝开放平台密钥工具] 安装并打开工具后，加签方式选"密钥"，加密算法选"RSA2"，最后生成应用公钥和应用私钥。到支付宝沙箱开放平台的接口加签方式，选择自定义密钥和公钥模式，粘贴上一步获取到的应用公钥，生成支付宝公钥'
tags:
  - SpringBoot
  - 支付宝
show: true
articleGPT: 本文详述了 SpringBoot 集成支付宝沙箱支付的完整流程，涵盖沙箱环境搭建、RSA2 密钥配置及内网穿透工具的使用准备。文章深入解析了 SDK 依赖引入、支付表单生成及异步回调验签的核心代码逻辑。通过模拟从下单到支付成功的完整业务闭环，助力开发者快速掌握支付宝支付的接入技巧与技术细节。
---

## 环境配置

### 个人沙箱环境

[支付宝开放平台-沙箱](https://open.alipay.com/develop/sandbox/app)

获取以下信息：

沙箱应用：

- APPID
- 支付宝网关地址：https://openapi-sandbox.dl.alipaydev.com/gateway.do

沙箱账号：

- 商户账号和登录密码
- 买家账号和登录密码

### 密钥配置

下载：[支付宝开放平台密钥工具](https://opendocs.alipay.com/common/02kipk?pathHash=0d20b438)，安装并打开工具后，加签方式选"密钥"，加密算法选"RSA2"，最后生成**应用公钥**和**应用私钥**

到支付宝沙箱开放平台的接口加签方式，选择自定义密钥和公钥模式，粘贴上一步获取到的应用公钥，生成**支付宝公钥**

### 内网穿透

- [natapp 官网](https://natapp.cn/)，注册账号并创建一个免费的隧道，配置要穿透的端口号，获取 **authtoken**

- [natapp 工具下载](https://natapp.cn/#download)，解压缩到一个文件夹，cmd，运行命令，获取暴露在外网的域名

  ```
  natapp -authtoken=你的authtoken
  ```

![image-20251229113911606](https://img.haipeng-lin.cn/1766979551728.png)

## SpringBoot 配置

### xml 配置

```xml title="pom.xml"
<properties>
    <java.version>17</java.version>
    <alipay.easysdk>2.2.0</alipay.easysdk>
    <alipay.sdk.java>4.34.0.ALL</alipay.sdk.java>
</properties>
<dependencies>

    <!-- 支付宝依赖沙箱支付 -->
    <dependency>
        <groupId>com.alipay.sdk</groupId>
        <artifactId>alipay-easysdk</artifactId>
        <version>${alipay.easysdk}</version>
    </dependency>

    <!-- 支付宝相关 -->
    <dependency>
        <groupId>com.alipay.sdk</groupId>
        <artifactId>alipay-sdk-java</artifactId>
        <version>${alipay.sdk.java}</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.24</version>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### yml 配置

```yml title="application.yml"
server:
  port: 8088

alipay:
  appId: 9021000140671139
  appPrivateKey: # 你的应用私钥
  alipayPublicKey: # 你的支付宝公钥
  notifyUrl: http://n66a2c57.natappfree.cc/alipay/notify # 替换成内网穿透生成的域名+/alipay/notify
```

### AlipayConfig

```java
@Data
@Component
@ConfigurationProperties(prefix = "alipay")
public class AliPayConfig {
    private String appId;
    private String appPrivateKey;
    private String alipayPublicKey;
    private String notifyUrl;
}
```

### AliPay

```java
@Data
public class AliPay {

    /**
     * 商户订单号：out_trade_no
     */
    private String traceNo;

    /**
     * 订单总金额：totalAmount
     */
    private double totalAmount;

    /**
     * 订单标题：subject
     */
    private String subject;

    /**
     * 支付宝交易号：trade_no
     */
    private String alipayTraceNo;
}
```

### AlipayController

```java
@Slf4j
@RestController
@RequestMapping("/alipay")
public class AliPayController {

    @Autowired
    private AliPayConfig aliPayConfig;

    private static final String GATEWAY_URL = "https://openapi-sandbox.dl.alipaydev.com/gateway.do";
    private static final String FORMAT = "JSON";
    private static final String CHARSET = "utf-8";
    private static final String SIGN_TYPE = "RSA2";

    @GetMapping("/pay")
    public void pay(AliPay aliPay, HttpServletResponse httpResponse) throws Exception {
        AlipayClient alipayClient = new DefaultAlipayClient(GATEWAY_URL, aliPayConfig.getAppId(),
                aliPayConfig.getAppPrivateKey(), FORMAT, CHARSET, aliPayConfig.getAlipayPublicKey(), SIGN_TYPE);
        AlipayTradePagePayRequest request = new AlipayTradePagePayRequest();
        request.setNotifyUrl(aliPayConfig.getNotifyUrl());
        request.setBizContent("{" +
                "\"out_trade_no\":\"" + aliPay.getTraceNo() + "\"," +
                "\"total_amount\":\"" + aliPay.getTotalAmount() + "\"," +
                "\"subject\":\"" + aliPay.getSubject() + "\"," +
                "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"" +
                "}");
        String form = "";
        try {
            // 调用SDK生成表单
            form = alipayClient.pageExecute(request).getBody();
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        httpResponse.setContentType("text/html;charset=" + CHARSET);
        // 直接将完整的表单html输出到页面
        httpResponse.getWriter().write(form);
        httpResponse.getWriter().flush();
        httpResponse.getWriter().close();
    }

    @PostMapping("/notify")  // 注意这里必须是POST接口
    public String payNotify(HttpServletRequest request) throws Exception {
        if (request.getParameter("trade_status").equals("TRADE_SUCCESS")) {
            log.info("=========支付宝异步回调========");
            Map<String, String> params = new HashMap<>();
            Map<String, String[]> requestParams = request.getParameterMap();
            for (String name : requestParams.keySet()) {
                params.put(name, request.getParameter(name));
                // log.info(name + " = " + request.getParameter(name));
            }
            String tradeNo = params.get("out_trade_no");
            String gmtPayment = params.get("gmt_payment");
            String alipayTradeNo = params.get("trade_no");
            // 支付宝验签
            if (Factory.Payment.Common().verifyNotify(params)) {
                // 验签通过
                log.info("交易名称：{}", params.get("subject"));
                log.info("交易状态：{}", params.get("trade_status"));
                log.info("支付宝交易凭证号：{}", params.get("trade_no"));
                log.info("商户订单号：{}", params.get("out_trade_no"));
                log.info("交易金额：{}", params.get("total_amount"));
                log.info("买家在支付宝唯一i：{}", params.get("buyer_id"));
                log.info("买家付款时间：{}", params.get("gmt_payment"));
                log.info("买家付款金额：{}", params.get("buyer_pay_amount"));
                // 处理订单
            }
        }
        return "success";
    }
}
```

### 测试

启动 SpringBoot ，并测试

```
http://localhost:8088/alipay/pay?subject=圆珠笔&traceNo=20&totalAmount=1000
```

页面响应，输入买家账号和密码

![image-20251229112400657](https://img.haipeng-lin.cn/1766978671364.png)

输入支付密码：

![image-20251229112903276](https://img.haipeng-lin.cn/1766978943552.png)

付款成功页面：

![image-20251229112659275](https://img.haipeng-lin.cn/1766978820481.png)

支付宝回调：

![image-20251229113122911](https://img.haipeng-lin.cn/1766979083085.png)
