source setup.sh

for subgraph in "${SUBGRAPHS[@]}" ; do
    name=${subgraph%%:*}
    port=${subgraph#*:}
    rover subgraph introspect http://localhost:$port/graphl > sg/$name.graphql
done
