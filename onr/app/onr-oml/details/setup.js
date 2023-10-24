const setup = `
After Sherry's install:
 
Hi Phil, you'll find a variety of examples in the Oracle Machine Learning Github: https://github.com/oracle-samples/oracle-db-examples/tree/main/machine-learning
The folders are aggregated by product R/Python/SQL
 
Install OML4Py on-premises client:
https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/1/mlpug/install-oml4py-client-premises-database.html#GUID-F1FD49FC-040E-400B-942E-7261427EA6EA
 
Install OML4Py universal client (connect to ADB or ODB from same installation):
https://blogs.oracle.com/machinelearning/post/getting-started-with-the-oml4py-universal-client
 
select e.*, case when JOB = 'PRESIDENT' then 5
when JOB = 'ANALYST' then 4
when JOB = 'MANAGER' then 3
when JOB = 'SALESMAN' then 2
else 1 end as job2num
from emp e;
 
Hi Phil, the OML4Py and OML4R installations are completed.  When you log in you want to source the environment variables in /home/oracle/env.sh
$ source env.sh
 
To start R:
ORE
Load ORE libraries:
R> library(ORE)
Establish a database connection:
R> ore.connect("rquser", password="rquser", conn_string="FREEPDB1", all=TRUE)
 
To start Python:
$python3
Load OML4Py library:
>>> import oml
Establish a database connection
>>> oml.connect(user="pyquser", password="pyquser", host="phil-db23c.sub08201532330.philfnvcn.oraclevcn.com", port=1521, service_name="FREEPDB1")



Sherry:

Installing python 3
[oracle@phil-react python]$ cd $ORACLE_HOME
[oracle@phil-react dbhomeFree]$ pwd
/opt/oracle/product/23c/dbhomeFree
 
  334  wget https://www.python.org/ftp/python/3.10.8/Python-3.10.8.tgz
  335  ls
  336  tar -xvzf Python-3.10.8.tgz --strip-components=1 -C $ORACLE_HOME/python
  337  ls
  338  cd python
  339  ls
  340  make clean; make
  341  make clean
  342  ./configure --enable-shared --prefix=$ORACLE_HOME/python
  343  make clean; make
  344  make altinstall
  345  python3
  346  cat /etc/oracle-reelase
  347  cat /etc/oracle-release
 
3.3 Install the Required Supporting Packages for Linux for On-Premises Databases
See https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/1/mlpug/install-required-supporting-packages-linux-premises-databases.html#GUID-96A6AECD-4E55-4B84-8403-4B09ADCD4E79
[opc@phil-react onr]$ sudo su - oracle
 
3.4.2 Install OML4Py Server for Linux for On-Premises Oracle Database 21c
See https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/1/mlpug/install-oml4py-server-linux-premises-oracle-database-21c.html#GUID-D6F927CD-677B-46E0-B6F2-321BFB4A26DE
sudo yum install perl-Env

sudo su - oracle$ 
. oraenv
ORACLE_SID = [oracle] ? FREE

export PYTHONHOME=PREFIX
export PATH=$PYTHONHOME/bin:$ORACLE_HOME/bin:$PATH
export ORACLE_HOME=/opt/oracle/product/23c/dbhomeFree
export LD_LIBRARY_PATH=$PYTHONHOME/lib:$ORACLE_HOME/lib:$LD_LIBRARY_PATH
$ sqlplus / as sysdba
SQL> spool install.txt
SQL> alter session set container=PDB1;
SQL> ALTER PROFILE DEFAULT LIMIT PASSWORD_VERIFY_FUNCTION NULL;
SQL> @$ORACLE_HOME/oml4py/server/pyqcfg.sql

define permtbl_value = SYSAUX --> Specify a permanent tablespace for the PYQSYS schema
define temptbl_value = TEMP --> Specify a temporary tablespace
define orahome_value = /opt/oracle/product/23c/dbhomeFree --> Specify the ORACLE_HOME directory
define pythonhome = /opt/Python-3.9.5 --> Specify the PYTHON_HOME directory


  `.replace(/[\r\n]+/g, "<br>")

  export default setup;