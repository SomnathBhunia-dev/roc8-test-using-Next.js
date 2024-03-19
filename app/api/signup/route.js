import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const entry = await request.json();

        // Check if user with the provided email already exists
        const query = {};
        if (entry.email) {
            query.email = entry.email;
        }

        const queryData = JSON.stringify({
            "collection": "users",
            "database": "roc8-test",
            "dataSource": "TicketFlicks",
            "filter": query
        });

        const queryConfig = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/find',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGO_KEY,
            },
            data: queryData
        };

        const queryResponse = await axios(queryConfig);

        if (queryResponse.data.documents?.length > 0) {
            // User already exists
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Insert new user
        const insertData = JSON.stringify({
            "collection": "users",
            "database": "roc8-test",
            "dataSource": "TicketFlicks",
            "document": entry
        });

        const insertConfig = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/insertOne',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGO_KEY,
            },
            data: insertData
        };

        const insertResponse = await axios(insertConfig);

        // User inserted successfully
        return NextResponse.json({ message: 'SignUp Successful' }, { status: 200 }, insertResponse.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
