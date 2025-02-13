# Multiple ways to personalize data

For the code examples, see the [discovery subgraph](../subgraphs/discovery).

### Viewer and Recommended Fields

There are many ways to personalize data. The most common is the attachment of recommendations and/or data for a specific user. If you look at the schema currently written for the user, you will see that it has the following additions for personalization data:

schema:

```graphql
type User @key(fields: "id") {
  recommendedProducts: [Product]
}

type Product @key(fields: "id", resolvable: false) {
  id: ID!
}
```

Now on the surface, this is a small addition to the schema that doesn't look too exciting. But this allows for a lot. The fields under the user are meant to be related to that user. Combined with the viewer pattern (GraphQL version of a `/me` REST route) allows for personalized recommendations to users. The "secret sauce" is the interaction with the viewer model linking the data to a user.

The one thing that is not great about this is that we are locked into a single recommendation. With the following simple tweaks, we can use the same idea for multiple recommendations:

```graphql
enum RecommendationType {
  RECOMMENDED_FOR_YOU
  RECENTLY_VIEWED
  DEALS_FOR_YOU
}

type User @key(fields: "id") {
  recommendedProducts(recommendedType: RecommendationType): [Product]
}

type Product @key(fields: "id", resolvable: false) {
  id: ID!
}
```

The small addition of a parameter allows a client to select what type of recommendations it wants. This flexibility allows for multiple collections of personalized data to be exposed consistently. The change between getting products recommended for you and the deals for you is the changing of an enum passed to the operation but doesn't require a change in schema types or the UI components to display them.

### Other ways to personalize data

Any data can be personalized, but it's not recommended that this is documented, and the structure of the schema is not altered to accommodate personalized data. This means that if someone was to get a list of the top products, the schema doesn't change if you want to reuse that same schema for the top products for a user. The way to trigger these changes is normally something outside of the query; think of a thing like headers. The auth headers are the most used headers to change responses. In the case described, the resolver that resolves the data for top products can use the auth headers to change the response or forward them to the service doing that logic.

You can also deploy these schema additions to its own subgraph for discovery. This subgraph can be responsible for managing any machine learning model changes or A/B tests without schema updates. This would allow you to add suggestions not just to users, but to product detail pages or filter out products the user has already purchased.
