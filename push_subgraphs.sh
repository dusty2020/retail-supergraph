source setup.sh

for subgraph in "${SUBGRAPHS[@]}" ; do
    name=${subgraph%%:*}
    port=${subgraph#*:}
    hive schema:check --service $name sg/$name.graphql
    hive schema:publish --service $name sg/$name.graphql --author dbenac --commit 1 --url http://localhost:$port/graphql
done