const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

require('dotenv').config();

const authorisedUser = 'admin';
const authorisedPassword = 'somepassword';

const Login = async(user, password) => {
    let res = '';

    const body = {
        name: user,
        password: password,
    };

    await axios.post(`http://localhost:${process.env.PORT}/login`, body)
    .then(response => {
        res = response.data;
    }).catch(err => {
        //res = err.message
        res = err.response.status;
    });
    return res;
}

const FetchStatusCode = async(url) => {
    let res = '';
    await axios.get(url) 
    .then(response => {
        res = response.status;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

const FetchResponseStatus = async(url, withToken = true) => {
    let res = '';

    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login(authorisedUser, authorisedPassword)}` }
    } : {};

    await axios.get(url, config) 
    .then(response => {
        res = response.data.success;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

const FetchResponse = async(url, withToken = true) => {
    let res = '';

    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login(authorisedUser, authorisedPassword)}` }
    } : {};

    await axios.get(url, config) 
    .then(response => {
        //console.log('data', response.data.data)
        res = response.data.data;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

const PostRequest = async(url, body, withToken = true) => {
    let res = '';

    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login(authorisedUser, authorisedPassword)}` }
    } : {};

    await axios.post(url, body, config) 
    .then(response => {
        //console.log('response', response.data.data)
        res = response.data.data;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

it('Login with correct credentials', async() => {
    expect(await Login(authorisedUser, authorisedPassword)).toEqual(expect.not.stringContaining('Unauthorized'));
});

it('Login with wrong credentials', async() => {
    expect(await Login(authorisedUser, 'wrongpassword')).toEqual(401);
});

it('Get by attraction id A0002', async() => {
    expect(await FetchResponseStatus(`${process.env.SERVER}/attraction/getByAttractionId/A0002`)).toEqual(true);
});

it('Get by invalid attraction id A00021', async() => {
    expect(await FetchResponseStatus(`${process.env.SERVER}/attraction/getByAttractionId/A00021`)).toEqual(false);
});

it('Get by attraction id A0002 w/o token', async() => {
    expect(await FetchResponseStatus(`http://localhost:${process.env.PORT}/attraction/getByAttractionId/A0002`, false)).toEqual(401);
});

it('Get by locations \'Palawan Beach\', \'Resorts World Station\'', async() => {
    const locations = ['Palawan Beach', 'Resorts World Station'];

    await FetchResponse(`${process.env.SERVER}/attraction/getByLocations/${JSON.stringify(locations)}`)
    .then(response => {
        expect(response.length).toEqual(3);
    });

    //expect(await FetchResponseStatus(`${process.env.SERVER}/attraction/getByLocations/${JSON.stringify(locations)}`)).toEqual(true);
});

it('Get by wrong locations \'an Beach\', \'tion\'', async() => {
    const locations = ['an Beach', 'tion'];

    await FetchResponse(`${process.env.SERVER}/attraction/getByLocations/${JSON.stringify(locations)}`)
    .then(response => {
        expect(response).toEqual(null);
    });
});

it('Get by price range between 23, 30', async() => {
    await FetchResponse(`${process.env.SERVER}/attraction/getByPriceRange/?min=23&max=30`)
    .then(response => {
        expect(response).not.toEqual(null);
    });
});

it('Get by ticket number', async() => {
    const ticket_number = '20210725-2a254a20ecfd11eb95168ba1e6d11779';

    await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${ticket_number}`)
    .then(response => {
        expect(response).not.toEqual(null);
    });
});

it('Get by wrong ticket number', async() => {
    const ticket_number = '20210725-';

    await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${ticket_number}`)
    .then(response => {
        expect(response).toEqual(null);
    });
});

it('Create purchase', async() => {
    const body = {
        payment_mode: 'Cash', 
        name: 'Johnny Cash',
        email: 'johnny.cash@emal.com',
        mobile: '92425233',
        promo_code: '',
        subtotal: 120.50,
        paid: 120.10,
        purchaseTickets: [{
            attraction_id: 'A0008',
            quantity: 4,
            ticket: { name: 'Adm Premium Seat', guestType: 'local', price: 19 }
        },
        {
            attraction_id: 'A0006',
            quantity: 2,
            ticket: { name: 'Adm Adult', guestType: 'adult', price: 20 }
        }],
    };

    await PostRequest(`${process.env.SERVER}/purchase/createPurchase/`, body)
    .then(async(response) => {
        expect(response).not.toEqual(null);

        await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${response.ticket_number}`)
        .then(response => {
            expect(response).not.toEqual(null);
        });
    });
});

/*
const FetchStatusCode = async(url, withToken = true) => {
    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login('admin', 'somepassword')}` }
    } : {};

    let res = '';
    await axios.get(url, config) 
    .then(response => {
        res = response.status;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

const FetchData = async(url, withToken = true) => {
    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login('admin', 'somepassword')}` }
    } : {};

    let res = '';
    await axios.get(url, config) 
    .then(response => {
        res = response.data;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

it('Login with correct credentials', async() => {
    expect(await Login('admin', 'somepassword')).toEqual(expect.not.stringContaining('Unauthorized'));
});

it('Login with wrong credentials', async() => {
    expect(await Login('admin', 'wrongpassword')).toEqual(401);
});

it('Fetch facilities with token', async() => {
    expect(await FetchStatusCode(`http://localhost:${process.env.PORT}/facilities/?page=1&sort=name&order=asc&filter={%22name%22:%20%22100%22,%20%22road_name%22:%20%22AN%22}`)).toEqual(200);
});

it('Fetch 100 facilities with token', async() => {
    const data = await FetchData(`http://localhost:${process.env.PORT}/facilities/?page=1&limit=100&sort=name&order=asc&filter={}`);
    expect(data.length).toEqual(100);
});

it('Fetch facilities w/o token', async() => {
    expect(await FetchStatusCode(`http://localhost:${process.env.PORT}/facilities/?page=1&limit=100`, false)).toEqual(401);
});

it('Fetch crowd levels with token', async() => {
    expect(await FetchStatusCode(`http://localhost:${process.env.PORT}/crowdLevels/?start=2020-11-03T00:00:00.000Z&end=2021-04-23T12:58:00.000Z`)).toEqual(200);
});

it('Fetch crowd levels w/o token', async() => {
    expect(await FetchStatusCode(`http://localhost:${process.env.PORT}/crowdLevels/`, false)).toEqual(401);
});
*/