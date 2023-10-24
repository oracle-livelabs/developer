const put = `
update emp set ename = 'SMITH' where empno = 7369;
commit
`.replace(/\n/g, "<br>")

  export default put;