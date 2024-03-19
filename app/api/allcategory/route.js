import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const data = {
      collection: 'category',
      database: 'roc8-test',
      dataSource: 'TicketFlicks',
    };

    const config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/find',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_KEY,
      },
      data: data,
    };

    const apiResponse = await axios(config);
    return NextResponse.json(apiResponse.data.documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
