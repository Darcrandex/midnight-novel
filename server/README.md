## nest apps

通过命令 `nest g app` 生成的子项目,在开发阶段无法实时编译. 目前还不清楚是什么原因.

现在把子项目当作子模块使用. 缺点是多个不同的子模块在同一个项目中, 需要一起重启.

## 全局配置

官方有[全局配置方案](https://docs.nestjs.com/techniques/configuration).

但是这个方案没有区分 `开发模式` 和 `生成模式`. 因此修改为以下方案

1. 安装依赖

```bash
yarn add cross-env
```

2. 在`package.json`中添加新的命令

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=dev nest start --watch"
  }
}
```

3. 创建配置文件
   `.env`, `.env.development`, `.env.production`.

4. 创建工具函数

```bash
touch configuration.ts
```

```ts
import { ConfigModule } from '@nestjs/config';

export default () => {
  const mode = process.env.NODE_ENV || 'prod';
  const envFilePath =
    mode === 'dev'
      ? ['.env.development.local', '.env.development', '.env']
      : ['.env.production.local', '.env.production', '.env'];

  return ConfigModule.forRoot({ envFilePath });
};
```
