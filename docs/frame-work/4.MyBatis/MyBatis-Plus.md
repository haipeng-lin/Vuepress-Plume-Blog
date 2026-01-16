## 1.简介

MyBatis-Plus（简称 MP）是一个基于 MyBatis 框架的增强工具，它在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

- [MP 官方文档](https://mybatis.plus/)

重要功能特性：

- **无侵入**：只做增强不做改变，引入它不会对现有项目产生影响
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作
- **支持主键自动生成**：支持多种主键策略，可自由配置，完美解决主键问题
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，写分页等同于写基本 List 查询

## 2.SpringBoot 使用 MP

### 2.1 引入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3.1</version>
</dependency>
```

### 2.2 yml 配置

```yml
# MyBatis-Plus 配置
mybatis-plus:
  configuration:
    # 开启下划线转驼峰
    map-underscore-to-camel-case: true
    # 开启SQL语句打印（开发环境使用）
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  # 全局配置
  global-config:
    db-config:
      # AUTO 自增 NONE 空 INPUT 用户输入 ASSIGN_ID 雪花 ASSIGN_UUID 唯一 UUID
      id-type: auto
      # 逻辑删除配置
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
  # XML 映射文件位置
  mapper-locations: classpath*:/mapper/**/*.xml
```

### 2.3 创建实体类

```java
@Data
@TableName("user")
public class User {
    
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    private Integer age;
    
    private String email;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}
```

### 2.4 创建  Mapper 接口

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 无需编写任何方法，即可获得 CRUD 功能
}
```

## 3.核心功能

### 3.1  CRUD



### 3.2 条件构造器

常用的条件构造器：

- **QueryWrapper**：普通查询条件构造器
- **UpdateWrapper**：更新条件构造器
- **LambdaQueryWrapper**：支持 Lambda 表达式的查询条件构造器
- **LambdaUpdateWrapper**：支持 Lambda 表达式的更新条件构造器

#### 3.2.1 QueryWrapper

```java
@Test
public void testQueryWrapper() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    
    // WHERE name LIKE '%张%' AND age > 20
    queryWrapper.like("name", "张").gt("age", 20);
    
    // WHERE name LIKE '%张%' OR age > 20
    queryWrapper.like("name", "张").or().gt("age", 20);
    
    // 注：nested() 用于生成括号
    // WHERE (name LIKE '%张%' AND age < 40) OR email IS NOT NULL
    queryWrapper.nested(w -> w.like("name", "张").lt("age", 40))
                .or().isNotNull("email");
    
    // ORDER BY age DESC, id ASC
    queryWrapper.orderByDesc("age").orderByAsc("id");
    
    // SELECT id, name, age FROM user ...
    queryWrapper.select("id", "name", "age");
    
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

#### 3.2.2 UpdateWrapper 

```java
@Test
public void testUpdateWrapper() {
    UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
    
    // SET name = '小红', age = 30 WHERE name LIKE '%张%'
    updateWrapper.set("name", "小红").set("age", 30).like("name", "张");
    
    userMapper.update(null, updateWrapper);
}
```

#### 3.2.3 LambdaQueryWrapper

和普通 Wrapper 的区别：第一个参数由**列名**变为**实体类的 get 方法**

```java
@Test
public void testLambdaQueryWrapper() {
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
    
    // WHERE name LIKE '%张%' AND age > 20
    wrapper.like(User::getName, "张").gt(User::getAge, 20);
    
    // 条件判断
    String name = "张";
    wrapper.like(StringUtils.isNotBlank(name), User::getName, name);
    
    List<User> users = userMapper.selectList(wrapper);
    users.forEach(System.out::println);
}
```

#### 3.2.4 LambdaUpdateWrapper 

```java
@Test
public void testLambdaUpdateWrapper() {
    LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
    
    // SET name = '小红', age = 30 WHERE name LIKE '%张%'
    wrapper.set(User::getName, "小红")
           .set(User::getAge, 30)
           .like(User::getName, "张");
    
    userMapper.update(null, wrapper);
}
```

