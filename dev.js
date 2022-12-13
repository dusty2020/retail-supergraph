import { start as discovery } from "@apollosolutions/retail-supergraph-discovery/server.js";
import { start as inventory } from "@apollosolutions/retail-supergraph-inventory/server.js";
import { start as orders } from "@apollosolutions/retail-supergraph-orders/server.js";
import { start as products } from "@apollosolutions/retail-supergraph-products/server.js";
import { start as shipping } from "@apollosolutions/retail-supergraph-shipping/server.js";
import { start as users } from "@apollosolutions/retail-supergraph-users/server.js";
import { start as gateway } from "@apollosolutions/retail-supergraph-gateway/server.js";

const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: "discovery",
    port: 4101,
    url: `http://localhost:4101/graphql`,
  },
  {
    name: "inventory",
    port: 4102,
    url: `http://localhost:4102/graphql`,
  },
  {
    name: "orders",
    port: 4103,
    url: `http://localhost:4103/graphql`,
  },
  {
    name: "products",
    port: 4104,
    url: `http://localhost:4104/graphql`,
  },
  {
    name: "shipping",
    port: 4105,
    url: `http://localhost:4105/graphql`,
  },
  {
    name: "users",
    port: 4106,
    url: `http://localhost:4106/graphql`,
  },
];

const getLocalPort = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName).port;

(async () => {
  // start all subgraphs
  await Promise.all([
    discovery(getLocalPort('discovery')),
    inventory(getLocalPort('inventory')),
    orders(getLocalPort('orders')),
    products(getLocalPort('products')),
    shipping(getLocalPort('shipping')),
    users(getLocalPort('users')),
  ]);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4010, LOCAL_SUBGRAPH_CONFIG);
})();
