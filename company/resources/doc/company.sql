----------------------------------------------------------------
-- Export file for user COMPANY                               --
-- Created by Administrator on 2016/5/16 星期一, 下午 2:58:06 --
----------------------------------------------------------------

spool company.log

prompt
prompt Creating table NEWS
prompt ===================
prompt
create table COMPANY.NEWS
(
  ID          NUMBER not null,
  TITLE       VARCHAR2(500),
  CONTENT     VARCHAR2(1000),
  CREATE_DATE DATE,
  IMG_PATH    VARCHAR2(1000),
  USER_ID     VARCHAR2(1000),
  IS_INDEX    VARCHAR2(1000)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.NEWS.TITLE
  is '标题';
comment on column COMPANY.NEWS.CONTENT
  is '内容';
comment on column COMPANY.NEWS.CREATE_DATE
  is '创建时间';
comment on column COMPANY.NEWS.IMG_PATH
  is '当条记录中图片的地址';
comment on column COMPANY.NEWS.USER_ID
  is '创建文章的用户ID';
comment on column COMPANY.NEWS.IS_INDEX
  is '是否上首页滚动 1：上首页';
alter table COMPANY.NEWS
  add constraint PK_T_NEWS primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_COMMENT
prompt ========================
prompt
create table COMPANY.T_COMMENT
(
  ID          NUMBER not null,
  PARENT_ID   VARCHAR2(1000),
  NEWS_ID     VARCHAR2(1000),
  USER_ID     VARCHAR2(1000),
  CONTENT     VARCHAR2(1000),
  CREATE_DATE TIMESTAMP(6)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.T_COMMENT.PARENT_ID
  is '如果是顶节点就为-1';
comment on column COMPANY.T_COMMENT.NEWS_ID
  is '用于显示当前评论的帖子标题';
alter table COMPANY.T_COMMENT
  add constraint PK_COMMENT primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_FUNCTION
prompt =========================
prompt
create table COMPANY.T_FUNCTION
(
  ID            NUMBER not null,
  PARENT_ID     NUMBER,
  FUNCTION_NAME VARCHAR2(1000),
  FUNCTION_URL  VARCHAR2(500),
  REMARK        VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.T_FUNCTION.ID
  is '自增ID';
comment on column COMPANY.T_FUNCTION.PARENT_ID
  is '父节点ID';
comment on column COMPANY.T_FUNCTION.FUNCTION_NAME
  is '功能名称';
comment on column COMPANY.T_FUNCTION.FUNCTION_URL
  is '功能地址';
comment on column COMPANY.T_FUNCTION.REMARK
  is '备注';
alter table COMPANY.T_FUNCTION
  add constraint PK_T_FUNCTION primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_IMG
prompt ====================
prompt
create table COMPANY.T_IMG
(
  ID          NUMBER not null,
  NAME        VARCHAR2(100),
  PATH        VARCHAR2(100),
  IMG_SIZE    VARCHAR2(100),
  CREATE_DATE TIMESTAMP(6),
  REMARK      VARCHAR2(100),
  IS_INDEX    VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
alter table COMPANY.T_IMG
  add constraint PK_IMG primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_LOGS
prompt =====================
prompt
create table COMPANY.T_LOGS
(
  ID      NUMBER not null,
  USER_ID VARCHAR2(1000),
  ACTION  VARCHAR2(1000),
  TIME    DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.T_LOGS.ID
  is '自增长ID';
comment on column COMPANY.T_LOGS.USER_ID
  is '对应的用户ID';
comment on column COMPANY.T_LOGS.ACTION
  is '操作内容';
comment on column COMPANY.T_LOGS.TIME
  is '操作时间';
alter table COMPANY.T_LOGS
  add constraint T_PK_T_LOGS primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_PRAISE
prompt =======================
prompt
create table COMPANY.T_PRAISE
(
  ID          NUMBER not null,
  NEWS_ID     VARCHAR2(1000) not null,
  USER_ID     VARCHAR2(1000) not null,
  PRAISE_DATE TIMESTAMP(6)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
alter table COMPANY.T_PRAISE
  add constraint PK_PRAISE primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_ROLE
prompt =====================
prompt
create table COMPANY.T_ROLE
(
  ID          NUMBER not null,
  ROLE_NAME   VARCHAR2(1000) not null,
  REMARK      VARCHAR2(1000),
  FUNCTION_ID VARCHAR2(1000)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.T_ROLE.ID
  is '自增长ID';
comment on column COMPANY.T_ROLE.ROLE_NAME
  is '角色名称';
comment on column COMPANY.T_ROLE.REMARK
  is '备注';
alter table COMPANY.T_ROLE
  add constraint PK_T_ROLE primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_USER
prompt =====================
prompt
create table COMPANY.T_USER
(
  ID            NUMBER not null,
  USERNAME      VARCHAR2(50) not null,
  PASSWORD      VARCHAR2(50) not null,
  REALNAME      VARCHAR2(50),
  ROLE_ID       VARCHAR2(50),
  REMARK        VARCHAR2(1000),
  EMAIL         VARCHAR2(50),
  LAST_DATE     TIMESTAMP(6),
  SEX           VARCHAR2(1),
  IMG_ID        VARCHAR2(50),
  REGISTER_DATE TIMESTAMP(6),
  STAR_NEWS_ID  VARCHAR2(50)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on column COMPANY.T_USER.ID
  is '自增长ID';
comment on column COMPANY.T_USER.USERNAME
  is '用户名';
comment on column COMPANY.T_USER.PASSWORD
  is '密码';
comment on column COMPANY.T_USER.REALNAME
  is '真实姓名';
comment on column COMPANY.T_USER.ROLE_ID
  is '对应的角色ID';
comment on column COMPANY.T_USER.REMARK
  is '备注';
comment on column COMPANY.T_USER.EMAIL
  is '邮箱';
comment on column COMPANY.T_USER.LAST_DATE
  is '最后登录时间';
comment on column COMPANY.T_USER.SEX
  is '性别';
comment on column COMPANY.T_USER.IMG_ID
  is '对应的图片ID 用户的头像';
comment on column COMPANY.T_USER.REGISTER_DATE
  is '注册时间';
comment on column COMPANY.T_USER.STAR_NEWS_ID
  is '收藏的帖子ID';
alter table COMPANY.T_USER
  add constraint PK_T_USER primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating sequence SEQ_T_FUNCTION
prompt ================================
prompt
create sequence COMPANY.SEQ_T_FUNCTION
minvalue 1001
maxvalue 99999999999999999
start with 1021
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_T_IMG
prompt ===========================
prompt
create sequence COMPANY.SEQ_T_IMG
minvalue 1001
maxvalue 9999999999999999
start with 1001
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_T_LOGS
prompt ============================
prompt
create sequence COMPANY.SEQ_T_LOGS
minvalue 1001
maxvalue 999999999999999999
start with 1001
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_T_NEWS
prompt ============================
prompt
create sequence COMPANY.SEQ_T_NEWS
minvalue 1001
maxvalue 999999999999999999
start with 1021
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_T_ROLE
prompt ============================
prompt
create sequence COMPANY.SEQ_T_ROLE
minvalue 1001
maxvalue 9999999999999999
start with 1001
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_T_USER
prompt ============================
prompt
create sequence COMPANY.SEQ_T_USER
minvalue 1001
maxvalue 999999999999999
start with 1021
increment by 1
cache 20;


spool off
