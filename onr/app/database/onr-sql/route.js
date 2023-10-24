import { NextResponse } from 'next/server';
import oracledb from "oracledb"

export async function POST(req) {
  let connection;

  let sql = [
    `drop table if exists emp`, 
    `drop table if exists dept`,
    `create table if not exists dept
      (DEPTNO NUMBER(2),
      CONSTRAINT dept_pkey PRIMARY KEY (deptno),
      DNAME VARCHAR2(14),
      LOC VARCHAR2(13)
      )`,
    `create table if not exists emp
      (EMPNO NUMBER(7) NOT NULL,
      CONSTRAINT emp_pkey PRIMARY KEY (empno),
      ENAME VARCHAR2(10),
      JOB VARCHAR2(9),
      MGR NUMBER(4),
      HIREDATE DATE,
      SAL NUMBER(7, 2),
      COMM NUMBER(7, 2),
      DEPTNO NUMBER(2),
      constraint fk_deptno foreign key (deptno) references dept (deptno)
      )`,
    `INSERT INTO DEPT (DEPTNO, DNAME, LOC) VALUES (10, 'ACCOUNTING', 'NEW YORK')`,
    `INSERT INTO DEPT (DEPTNO, DNAME, LOC) VALUES (20, 'RESEARCH', 'DALLAS')`,
    `INSERT INTO DEPT (DEPTNO, DNAME, LOC) VALUES (30, 'SALES', 'CHICAGO')`,
    `INSERT INTO DEPT (DEPTNO, DNAME, LOC) VALUES (40, 'OPERATIONS', 'BOSTON')`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7369, 'SMITHy', 'CLERK', 7902, TO_DATE('17-DEC-1980', 'DD-MON-YYYY'), 800, NULL, 20)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7499, 'ALLEN', 'SALESMAN', 7698, TO_DATE('20-FEB-1981', 'DD-MON-YYYY'), 1600, 300, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7521, 'WARD', 'SALESMAN', 7698, TO_DATE('22-FEB-1981', 'DD-MON-YYYY'), 1250, 500, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7566, 'JONES', 'MANAGER', 7839, TO_DATE('2-APR-1981', 'DD-MON-YYYY'), 2975, NULL, 20)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7654, 'MARTIN', 'SALESMAN', 7698, TO_DATE('28-SEP-1981', 'DD-MON-YYYY'), 1250, 1400, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7698, 'BLAKE', 'MANAGER', 7839, TO_DATE('1-MAY-1981', 'DD-MON-YYYY'), 2850, NULL, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7782, 'CLARK', 'MANAGER', 7839, TO_DATE('9-JUN-1981', 'DD-MON-YYYY'), 2450, NULL, 10)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7788, 'SCOTT', 'ANALYST', 7566, TO_DATE('09-DEC-1982', 'DD-MON-YYYY'), 3000, NULL, 20)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7839, 'KING', 'PRESIDENT', NULL, TO_DATE('17-NOV-1981', 'DD-MON-YYYY'), 5000, NULL, 10)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7844, 'TURNER', 'SALESMAN', 7698, TO_DATE('8-SEP-1981', 'DD-MON-YYYY'), 1500, NULL, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7876, 'ADAMS', 'CLERK', 7788, TO_DATE('12-JAN-1983', 'DD-MON-YYYY'), 1100, NULL, 20)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7900, 'JAMES', 'CLERK', 7698, TO_DATE('3-DEC-1981', 'DD-MON-YYYY'), 950, NULL, 30)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7902, 'FORD', 'ANALYST', 7566, TO_DATE('3-DEC-1981', 'DD-MON-YYYY'), 3000, NULL, 20)`,
    `INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES (7934, 'MILLER', 'CLERK', 7782, TO_DATE('23-JAN-1982', 'DD-MON-YYYY'), 1300, NULL, 10)`,
    `commit`,
    `CREATE OR REPLACE FORCE EDITIONABLE VIEW EMP_DEPT_UPSERT_VIEW AS 
    select e.comm,
          e.empno,
          e.ename,
          e.hiredate,
          e.job,
          e.mgr,
          e.sal,
          d.deptno,
          d.dname,
          d.loc
    from emp e
    full join dept d on e.deptno = d.deptno
    `,
    `CREATE OR REPLACE EDITIONABLE TRIGGER EMP_DEPT_UPSERT_VIEW_TRIGGER_INSERT
    INSTEAD OF INSERT ON EMP_DEPT_UPSERT_VIEW
    FOR EACH ROW
    BEGIN
        -- dept upsert
        IF :new.dname is not null then
            MERGE INTO dept a
            USING
                (select :new.deptno deptno from dual) b
            ON
                (a.deptno = b.deptno)
            WHEN MATCHED THEN
                update set dname = :new.dname, loc = :new.loc
                where deptno = :new.deptno
            WHEN NOT MATCHED THEN
                insert (deptno, dname, loc) values                    
                (:new.deptno, :new.dname, :new.loc);
        END IF;
        -- emp upsert
        IF :new.empno is not null then
            MERGE INTO emp a
            USING
                (select :new.empno empno from dual) b
            ON
                (a.empno = b.empno)
            WHEN MATCHED THEN
                update set comm = :new.comm, deptno = :new.deptno, ename = :new.ename, hiredate = :new.hiredate, job = :new.job, mgr = :new.mgr, sal = :new.sal
                where empno = :new.empno
            WHEN NOT MATCHED THEN
                insert (empno, ename, job, mgr, hiredate, sal, comm, deptno) values                    
                (:new.empno, :new.ename, :new.job, :new.mgr, :new.hiredate, :new.sal, :new.comm, :new.deptno);
        END IF;
    END;`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7369, 'SMITHy', 'CLERK', 7902,TO_DATE('17-DEC-1980', 'DD-MON-YYYY'), 800, NULL, 20, 'RESEARCH', 'DALLAS')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7499, 'ALLEN', 'SALESMAN', 7698,TO_DATE('20-FEB-1981', 'DD-MON-YYYY'), 1600, 300, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7521, 'WARD', 'SALESMAN', 7698,TO_DATE('22-FEB-1981', 'DD-MON-YYYY'), 1250, 500, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7566, 'JONES', 'MANAGER', 7839,TO_DATE('2-APR-1981', 'DD-MON-YYYY'), 2975, NULL, 20, 'RESEARCH', 'DALLAS')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7654, 'MARTIN', 'SALESMAN', 7698,TO_DATE('28-SEP-1981', 'DD-MON-YYYY'), 1250, 1400, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7698, 'BLAKE', 'MANAGER', 7839,TO_DATE('1-MAY-1981', 'DD-MON-YYYY'), 2850, NULL, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7782, 'CLARK', 'MANAGER', 7839,TO_DATE('9-JUN-1981', 'DD-MON-YYYY'), 2450, NULL, 10, 'ACCOUNTING', 'NEW YORK')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7788, 'SCOTT', 'ANALYST', 7566,TO_DATE('09-DEC-1982', 'DD-MON-YYYY'), 3000, NULL, 20, 'RESEARCH', 'DALLAS')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7839, 'KING', 'PRESIDENT', NULL,TO_DATE('17-NOV-1981', 'DD-MON-YYYY'), 5000, NULL, 10, 'ACCOUNTING', 'NEW YORK')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7844, 'TURNER', 'SALESMAN', 7698,TO_DATE('8-SEP-1981', 'DD-MON-YYYY'), 1500, NULL, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7876, 'ADAMS', 'CLERK', 7788,TO_DATE('12-JAN-1983', 'DD-MON-YYYY'), 1100, NULL, 20, 'RESEARCH', 'DALLAS')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7900, 'JAMES', 'CLERK', 7698,TO_DATE('3-DEC-1981', 'DD-MON-YYYY'), 950, NULL, 30, 'SALES', 'CHICAGO')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7902, 'FORD', 'ANALYST', 7566,TO_DATE('3-DEC-1981', 'DD-MON-YYYY'), 3000, NULL, 20, 'RESEARCH', 'DALLAS')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO, DNAME, LOC) VALUES (7934, 'MILLER', 'CLERK', 7782,TO_DATE('23-JAN-1982', 'DD-MON-YYYY'), 1300, NULL, 10, 'ACCOUNTING', 'NEW YORK')`,
  `INSERT INTO EMP_DEPT_UPSERT_VIEW (DEPTNO, DNAME, LOC) VALUES (40, 'ACCOUNTING', 'NEW YORK')`,
  `commit`,
]

   try {
     console.log('Trying connection for POST.');
     connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
     console.log('Connection was successful for POST!');

     sql.forEach(async (s) => await connection.execute(s));
   } catch (err) {
    
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch (err) {
         console.error(err);
       }
     }
   }
   console.log('POST Code Succeeded.');
  }

export async function GET(req) {

    let connection;
    
        try {
          console.log('Trying connection for GET.');
          //oracledb.initOracleClient();
          connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
          console.log('Connection was successful for GET!');
          var sql = "select json_object(\
                        'id' value rownum,\
                        'empno' value empno,\
                        'ename' value ename,\
                        'job' value job,\
                        'mgr' value mgr,\
                        'hiredate' value hiredate,\
                        'sal' value sal,\
                        'comm' value comm,\
                        'deptno' value deptno,\
                        'dname' value dname,\
                        'loc' value loc\
                     ) from emp_dept_upsert_view"
    
          const result = await connection.execute(sql);
          var str = '[' + result.rows + ']'
          console.log(str)
          //return str
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }

    console.log('GET emp_dept_upsert_view called');
    return NextResponse.json(str);
}

export async function PUT(req) {
  let connection;

  let sql = [
    `update emp set ename = 'SMITH' where empno = 7369`,
    `commit`
]

   try {
     console.log('Trying connection for PUT.');
     connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
     console.log('Connection was successful for PUT!');

     sql.forEach(async (s) => await connection.execute(s));
   } catch (err) {
    
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch (err) {
         console.error(err);
       }
     }
   }
   console.log('PUT Code Succeeded.');
  }

export async function DELETE(req) {
  let connection;

  let sql = [
    `truncate table emp`, 
    `truncate table dept`
]

   try {
     console.log('Trying connection for DELETE.');
     connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
     console.log('Connection was successful for DELETE!');

     sql.forEach(async (s) => await connection.execute(s));
   } catch (err) {
    
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch (err) {
         console.error(err);
       }
     }
   }
   console.log('DELETE Code Succeeded.');
  }