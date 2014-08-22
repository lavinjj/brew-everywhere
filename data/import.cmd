<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c adjuncts -u <user> -p <password> --file adjunctseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c equipment -u <user> -p <password> --file equipment.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c fermentables -u <user> -p <password> --file fermentableseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c hops -u <user> -p <password> --file hopseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c styles -u <user> -p <password> --file styleseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c waterProfiles -u <user> -p <password> --file waterprofileseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c yeast -u <user> -p <password> --file yeastseed.json
<mongodb_path>\bin\mongoimport -h <server>:<port> -d breweverywhere -c mashProfiles -u <user> -p <password> --file mashseed.json