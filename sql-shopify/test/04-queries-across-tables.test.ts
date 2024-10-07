import { Database } from "../src/database";
import { APPS, APPS_CATEGORIES, APPS_PRICING_PLANS, CATEGORIES, PRICING_PLANS } from "../src/shopify-table-names";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("03", "04");
    }, minutes(1));

    it("should select count of apps which have free pricing plan", async done => {
        const query = `
            SELECT 
                COUNT (*) AS count
            FROM ${APPS}, ${PRICING_PLANS}, ${APPS_PRICING_PLANS}
            INNER JOIN ${APPS} ON ${APPS}.id = ${PRICING_PLANS}.id
            INNER JOIN ${PRICING_PLANS} ON ${APPS}.id = ${APPS_PRICING_PLANS}.app_id
            WHERE ${PRICING_PLANS}.price = 'Free'
        `;
        const result = await db.selectSingleRow(query);
        expect(result).toEqual({
            count: 1112
        });
        done();
    }, minutes(1));

    it("should select top 3 most common categories", async done => {
        const query = `
            SELECT 
                COUNT (*) AS count,
                title AS category
            FROM ${APPS}, ${CATEGORIES}, ${APPS_CATEGORIES}
            INNER JOIN ${APPS} ON ${APPS}.id = ${CATEGORIES}.id
            INNER JOIN ${CATEGORIES} ON ${APPS}.id = ${APPS_CATEGORIES}.app_id
            ORDER BY count 
            DESC
            LIMIT 3
        `;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 1193, category: "Store design" },
            { count: 723, category: "Sales and conversion optimization" },
            { count: 629, category: "Marketing" }
        ]);
        done();
    }, minutes(1));

    it("should select top 3 prices by appearance in apps and in price range from $5 to $10 inclusive (not matters monthly or one time payment)", async done => {
        const query = `
            SELECT 
                COUNT (*) AS count,
                CAST(price AS decimal) AS casted_price
            FROM ${APPS}, ${PRICING_PLANS}, ${APPS_PRICING_PLANS}
            INNER JOIN ${APPS} ON ${APPS}.id = ${PRICING_PLANS}.id
            INNER JOIN ${PRICING_PLANS} ON ${APPS}.id = ${APPS_PRICING_PLANS}.app_id
            WHERE casted_price >=5 AND casted_price <=10
            LIMIT 3
        `;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 225, price: "$9.99/month", casted_price: 9.99 },
            { count: 135, price: "$5/month", casted_price: 5 },
            { count: 114, price: "$10/month", casted_price: 10 }
        ]);
        done();
    }, minutes(1));
});