// 用户角色
export enum Roles {
  Admin = "admin", // 系统管理员
  Writer = "writer", // 作家/工作人员
}

// 后台定义的状态码
export enum ResponseStatus {
  Success = 2000,
  InvalidToken = 5000,
}
