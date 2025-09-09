#!/bin/bash

#
# This script prepares container environment with 2 23ai datanbases. One is the datawarehouse (dwh). The other one is target db (23ai)
# GoldenGate 23ai free is also installed.
# The dwh will be automatically populated with the Oracle Sample Schema data
#
# sqlc is installed
#
# Examples:
# Access dwh as user hr: sql hr/Welcome23ai@localhost:1522/freepdb1
# !!! Pay attention to the port: dwh runs on port 1522
# Access source db as user ora23ai (preinstalled): sql ora23ai/Welcome23ai@localhost:1521/freepdb1
# !!! Port is 1521
#
# When configuring source db in GG make sure to select port 1521 as you are connecting within the container network!!!!
#
#
# DEMO: Once source and target DB are configured in GG, you can create a new data pipeline and show how all sample schema data is replicated to the target DB.


#######
#######    S T A R T      S C R I P T    ######
#######   (this is for Oracle Linux 9)   ######


sudo dnf update -y

sudo iptables -F
sudo iptables-save

#expand boot volume (https://docs.oracle.com/en-us/iaas/oracle-linux/oci-utils/index.htm#oci-growfs)
sudo /usr/libexec/oci-growfs -y

#podman and utensils - https://docs.oracle.com/en/operating-systems/oracle-linux/podman/podman-InstallingPodmanandRelatedUtilities.html
sudo dnf install -y container-tools sqlcl jdk21

#DATA
mkdir -p db/data

cat <<EOF > db/data/01-user.sql
CONN system/Welcome23ai@freepdb1;

--create a new user
CREATE USER ora23ai IDENTIFIED BY Welcome23ai;

--grant the new role db_developer_role
GRANT db_developer_role TO ora23ai;

--and unlimited tablespace
GRANT unlimited tablespace TO ora23ai;
EOF

# Start building stuff
sudo podman network create the-net

sudo podman run -d --network the-net --name dwh -v ./db/data:/opt/oracle/scripts/startup:Z -e ORACLE_PWD=Welcome23ai -p 1522:1521 container-registry.oracle.com/database/free:latest

sudo podman run -d --network the-net --name 23ai -v ./db/data:/opt/oracle/scripts/startup:Z -e ORACLE_PWD=Welcome23ai -p 1521:1521 container-registry.oracle.com/database/free:latest

sudo podman run \
    -d \
    --name gg \
    --network the-net \
    -p 80:80 \
    -p 8080:8080 \
    -p 443:443 \
    -e OGG_ADMIN=ora23ai \
    -e OGG_ADMIN_PWD=Welcome23ai! \
    -e OGG_DEPLOYMENT=ora23ai \
    -e OGG_DOMAIN=ora23ai \
    container-registry.oracle.com/goldengate/goldengate-free:latest



wget https://github.com/oracle-samples/db-sample-schemas/archive/refs/tags/v23.3.zip 

mkdir -p scripts/tmp/

unzip -o v23.3.zip -d scripts/tmp/

cd ~/scripts/tmp/db-sample-schemas-23.3/human_resources && sed -i '/ACCEPT/d' hr_install.sql && sed -i 's/pass/1/g' hr_install.sql && sed -i 's/tbs/2/g' hr_install.sql && sed -i 's/overwrite_schema/3/g' hr_install.sql

cd ~/scripts/tmp/db-sample-schemas-23.3/sales_history && sed -i '/ACCEPT/d' sh_install.sql && sed -i 's/pass/1/g' sh_install.sql && sed -i 's/tbs/2/g' sh_install.sql && sed -i 's/overwrite_schema/3/g' sh_install.sql

cd ~/scripts/tmp/db-sample-schemas-23.3/customer_orders && sed -i '/ACCEPT/d' co_install.sql && sed -i 's/pass/1/g' co_install.sql && sed -i 's/tbs/2/g' co_install.sql && sed -i 's/overwrite_schema/3/g' co_install.sql

# Load data
cd ~/scripts/tmp/db-sample-schemas-23.3/human_resources/ && sql system/Welcome23ai@localhost:1522/freepdb1 @hr_install.sql Welcome23ai USERS YES

cd ~/scripts/tmp/db-sample-schemas-23.3/sales_history/  && sql system/Welcome23ai@localhost:1522/freepdb1 @sh_install.sql Welcome23ai USERS YES

cd ~/scripts/tmp/db-sample-schemas-23.3/customer_orders/  && sql system/Welcome23ai@localhost:1522/freepdb1 @co_install.sql Welcome23ai USERS YES

#cleanup
rm -rf ~/scripts/

rm ~/history.log

rm ~/v23.3.zip

#let's calm down for second before we go ahead with ORDS
sleep 5 

