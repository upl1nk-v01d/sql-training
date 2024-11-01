import {
  APPS,
  APPS_CATEGORIES,
  CATEGORIES,
  REVIEWS,
} from "../shopify-table-names";

export const selectCount = (table: string): string => {
  return `SELECT COUNT (*) as c FROM ${table}`;
};

export const selectRowById = (id: number, table: string): string => {
  return `SELECT * FROM ${table} WHERE id = ${id}`;
};

export const selectCategoryByTitle = (title: string): string => {
  return `SELECT * FROM ${CATEGORIES} WHERE title = '${title}'`;
};

//{ app_title: "mmuze", category_id: 1, category_title: "Store design" },
export const selectAppCategoriesByAppId = (appId: number): string => {
  return `SELECT a.title as app_title, category_id, c.title as category_title FROM ${APPS_CATEGORIES} ac
  join ${APPS} a on a.id = ac.app_id
  join ${CATEGORIES} c on c.id = ac.category_id WHERE app_id = ${appId}`;
};

export const selectUnigueRowCount = (
  tableName: string,
  columnName: string
): string => {
  return `SELECT COUNT(DISTINCT(${columnName})) FROM ${tableName}`;
};

export const selectReviewByAppIdAuthor = (
  appId: number,
  author: string
): string => {
  return `SELECT * FROM ${REVIEWS} WHERE app_id = ${appId} AND author = ${author}`;
};

export const selectColumnFromTable = (
  columnName: string,
  tableName: string
): string => {
  return `SELECT (${columnName}) FROM ${tableName}`;
};
