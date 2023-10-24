const view = "\
CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW EMP_DEPT AS\n\
SELECT JSON { 'empno'       : e.empno, \n\
              'ename'       : e.ename,\n\
              'job'         : e.job,\n\
              'mgr'         : e.mgr, \n\
              'hiredate'    : e.hiredate, \n\
              'sal'         : e.sal, \n\
              'comm'        : e.comm,  \n\
              'deptno'      : (SELECT JSON_ARRAYAGG(\n\
     JSON { 'deptno' : d.deptno,\n\
            'dname'  : d.dname,\n\
            'loc'    : d.loc)\n\
          }) \n\
    FROM dept d WITH INSERT, UPDATE , DELETE \n\
    WHERE e.deptno = d.deptno) \n\
}\n\
FROM emp e WITH INSERT, UPDATE, DELETE;\n"
.replace(/\n/g, "<br>")

export default view;