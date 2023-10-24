const deletes = `
truncate table emp 
truncate table dept
`.replace(/\n/g, "<br>")

  export default deletes;