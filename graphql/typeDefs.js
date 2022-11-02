const { gql } = require("apollo-server");

module.exports = gql`
  type Article {
    id: String
    title: String
    content: String
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: String
    articleId: String
    value: String
    createdAt: String
    updatedAt: String
  }

  type ArticleWithPagination {
    data: [Article]
    page: Int
    view: Int
    totalData: Int
    totalPage: Int
  }

  input ArticleInput {
    title: String!
    content: String!
  }

  input CommentInput {
    articleId: String!
    value: String!
  }

  type Query {
    articles(page: Int, view: Int): ArticleWithPagination
    comments(articleID: ID!): [Comment]
  }

  type Mutation {
    createArticle(data: ArticleInput): Article
    editArticle(ID: ID!, data: ArticleInput): Boolean
    deleteArticle(ID: ID!): Boolean
    createComment(data: CommentInput): Comment
    editComment(ID: ID!, data: CommentInput): Boolean
    deleteComment(ID: ID!): Boolean
  }
`;
