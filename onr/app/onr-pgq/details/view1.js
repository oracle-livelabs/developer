const view = `
drop property graph empdept;

create property graph empdept
    vertex tables (
        emp key(empno) label emp properties (
            empno,
            ename,
            job,
            mgr,
            hiredate,
            sal,
            comm,
            deptno
        ),
        dept key(deptno) label dept properties (
            deptno,
            dname,
            loc
        )
    )
    EDGE TABLES (
        emp AS works_at 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (deptno) REFERENCES dept (deptno)
    , 
        emp AS manager 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (empno) REFERENCES emp (mgr)
    )
;

SELECT * FROM GRAPH_TABLE (empdept MATCH (e)-[works_at]->(d) COLUMNS (e.empno, e.ename, e.sal, e.deptno, d.dname, d.deptno as d)) order by 1;
SELECT * FROM GRAPH_TABLE (empdept MATCH (emp)<-[manager]-(m) COLUMNS (emp.ename, m.ename as manger));\n
`.replace(/\n/g, "<br>")

export default view;