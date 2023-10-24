const manageDB = `

Install DB23c on Oracle Linux 8
 
Adapted from https://www.oracle.com/database/free/download/
Setup Instructions: https://docs.oracle.com/en/database/oracle/oracle-database/23/xeinl/installing-oracle-database-free.html#GUID-728E4F0A-DBD1-43B1-9837-C6A460432733
Community Support: https://forums.oracle.com/ords/apexds/domain/dev-community/category/oracle-database-free
Documentation: https://docs.oracle.com/en/database/oracle/oracle-database/23/index.html
Download:
oracle-database-preinstall-23c-1.0-1.el8.x86_64.rpm - https://yum.oracle.com/repo/OracleLinux/OL8/developer/x86_64/getPackage/oracle-database-preinstall-23c-1.0-0.5.el8.x86_64.rpm
oracle-database-free-23c-1.0-1.el8.x86_64.rpm - https://download.oracle.com/otn-pub/otn_software/db-free/oracle-database-free-23c-1.0-1.el8.x86_64.rpm

Run:
sudo su -
cd /home/opc
yum -y localinstall oracle-database-preinstall*               # About 1 minute
yum -y localinstall oracle-database-free*                     # About 3 minutes
vi /etc/sysconfig/oracle-free-23c.conf
  Didn't change anything
/etc/init.d/oracle-free-23c configure                         # About 6 minutes
  password for SYS, SYSTEM and PDBADMIN accounts: DB23cPW
  Configuring Oracle Database FREE.
  Connect to Oracle Database using one of the connect strings:
     Pluggable database: phil-db23c/FREEPDB1
     Multitenant container database: phil-db23c
sudo systemctl stop firewalld
sudo systemctl status firewalld
 

sudo su - oracle
. oraenv       enter FREE
lsnrctl status
 
End Install
 
Stop here for now.
 
sudo su - oracle
/opt/oracle/product/23c/dbhomeFree/bin/lsnrctl status
. oraenv       enter FREE
sqlplus / as sysdba
      enter startup
      
      
      select * from v$encryption_wallet;
      
      select * from v$encryption_keys;
      /opt/oracle/admin/FREE/wallet
      
[opc@phil-react ~]$ sudo su - oracle
[oracle@phil-react ~]$ pwd
/home/oracle
 Trying to create a wallet - See https://docs.oracle.com/en/cloud/paas/data-safe/admds/create-wallet-or-certificates-tls-connection.html#GUID-87A6335A-E403-4007-9C2A-A07BA25AE064
 Part 1
 mkdir -p /opt/oracle/product/23c/dbhomeFree/myserverwallet
 orapki wallet create -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassw0rd -auto_login
 orapki wallet add -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassw0rd -dn \CN=CloudST2.debdev19.oraclecloud.internal\ -keysize 1024 -self_signed -validity 3650
 orapki wallet display -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassword
 orapki wallet export -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassw0rd -dn \CN=CloudST2.debdev19.oraclecloud.internal\ -cert /tmp/CloudST2-certificate.crt
 cat /tmp/CloudST2-certificate.crt
 Part 2
 mkdir -p /opt/oracle/product/23c/dbhomeFree/myclientwallet
 orapki wallet create -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd -auto_login
 orapki wallet add -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd -dn \CN=myhost.example.com\ -keysize 1024 -self_signed -validity 3650
 orapki wallet display -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd
 orapki wallet export -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd -dn \CN=myhost.example.com\ -cert /tmp/gbr30139-certificate.crt
 more /tmp/gbr30139-certificate.crt
 Part 3
 orapki wallet add -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd -trusted_cert -cert /tmp/CloudST2-certificate.crt
 orapki wallet display -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd
 orapki wallet add -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassw0rd -trusted_cert -cert  /tmp/gbr30139-certificate.crt
 orapki wallet display -wallet /opt/oracle/product/23c/dbhomeFree/myserverwallet -pwd mypassw0rd
 Part 4
 orapki wallet pkcs12_to_jks  -wallet /opt/oracle/product/23c/dbhomeFree/myclientwallet -pwd mypassw0rd -jksKeyStoreLoc /tmp/keystore.jks
\\n 
 vi $ORACLE_HOME/network/admin/sqlnet.ora
 vi $ORACLE_HOME/network/admin/listener.ora
 lsnrctl stop
 lsnrctl start
 cd /opt/oracle/product/23c/dbhomeFree/
 zip -r wallet.zip myclientwallet
 cp wallet.zip /tmp
`.replace(/[\r\n]+/g, "<br>")

export default manageDB;