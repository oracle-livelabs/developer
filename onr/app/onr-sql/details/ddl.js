  const ddl = "\
  DROP TABLE EMP;\n\
  DROP TABLE DEPT;\n\
  \n\
  CREATE TABLE DEPT\n\
    (DEPTNO NUMBER(2),\n\
    CONSTRAINT dept_pkey PRIMARY KEY (deptno),\n\
    DNAME VARCHAR2(14),\n\
    LOC VARCHAR2(13) );\n\
  CREATE TABLE EMP\n\
    (EMPNO NUMBER(7) NOT NULL,\n\
    CONSTRAINT emp_pkey PRIMARY KEY (empno),\n\
    ENAME VARCHAR2(10),\n\
    JOB VARCHAR2(9),\n\
    MGR NUMBER(4),\n\
    HIREDATE DATE,\n\
    SAL NUMBER(7, 2),\n\
    COMM NUMBER(7, 2),\n\
    DEPTNO NUMBER(2),\n\
    constraint fk_deptno foreign key (deptno) references dept (deptno)\n\
    );\n"
  .replace(/[\r\n]+/g, "<br>")

  export default ddl;