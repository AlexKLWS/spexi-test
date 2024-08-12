import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { db } from './lib/db';
import { sql } from 'kysely';
import { objectToCamel } from 'ts-case-convert';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log('EVENT: \n' + JSON.stringify(event, null, 2));

        const username = event?.headers?.['username'];
        console.log('🚀 ~ file: getPostings.ts ~ line 22 ~ lambdaHandler ~ username', username);

        let query = db.selectFrom('areas').selectAll();

        if (username) {
            query = query.select([
                sql<string>`CASE WHEN EXISTS (SELECT 1 FROM bookmarks WHERE bookmarks.area_id = postings.id AND bookmarks.username = ${username}) THEN TRUE ELSE FALSE END`.as(
                    'is_bookmarked',
                ),
            ]);
        }

        const postingsRaw = await query.limit(10).execute();

        let areas = objectToCamel(postingsRaw);

        areas = areas.map((p) => {
            p.isBookmarked = p.isBookmarked === 1;
            return p;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(areas),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
