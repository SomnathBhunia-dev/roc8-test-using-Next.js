import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const entry = await request.json();
        const query = {};
        if (entry.email) {
            query.email = entry.email;
        }

        const queryData = JSON.stringify({
            "collection": "users",
            "database": "roc8-test",
            "dataSource": "TicketFlicks",
            "filter": query,
            "update": {
                "$set": {
                    "Interest": entry.Category
                }
            }
        });

        const queryConfig = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/updateOne',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGO_KEY,
            },
            data: queryData
        };

        const queryResponse = await axios(queryConfig);
        console.log(queryResponse.data)
        // User inserted successfully
        return NextResponse.json({ message: 'Update Successfull'}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
