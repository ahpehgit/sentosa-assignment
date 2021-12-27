const createServer = require('../createServer');

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

    await axios.post(`${process.env.SERVER}/login`, body)
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

jest.setTimeout(5000);

it('Login with correct credentials', async() => {
    //expect(await Login(authorisedUser, authorisedPassword)).toEqual(expect.not.stringContaining('Unauthorized'));
    let res = '';
    await new Promise((resolve) => setTimeout(async() => {res = await Login(authorisedUser, authorisedPassword); resolve();}, 500));
    expect(res).not.toEqual(401);
});

it('Login with wrong credentials', async() => {
    let res = '';
    await new Promise((resolve) => setTimeout(async() => {res = await Login(authorisedUser, 'wrongpassword'); resolve();}, 500));
    expect(res).toEqual(401);
});

it('Get by attraction id A0002', async() => {
    let res = '';
    await new Promise((resolve) => setTimeout(async() => {res = await FetchResponseStatus(`${process.env.SERVER}/attraction/getByAttractionId/A0002`); resolve();}, 500));
    expect(res).toEqual(true);
});

it('Get by invalid attraction id A00021', async() => {
    let res = '';
    await new Promise((resolve) => setTimeout(async() => {res = await FetchResponseStatus(`${process.env.SERVER}/attraction/getByAttractionId/A00021`); resolve();}, 500));
    expect(res).toEqual(false);    
});

it('Get by attraction id A0002 w/o token', async() => {
    let res = '';
    await new Promise((resolve) => setTimeout(async() => {res = await FetchResponseStatus(`${process.env.SERVER}/attraction/getByAttractionId/A0002`, false); resolve();}, 500));
    expect(res).toEqual(401);
});

it('Get by locations \'Palawan Beach\', \'Resorts World Station\'', async() => {
    const locations = ['Palawan Beach', 'Resorts World Station'];

    let res = 0;
    await new Promise((resolve) => 
        setTimeout(async() => {
            await FetchResponse(`${process.env.SERVER}/attraction/getByLocations/${JSON.stringify(locations)}`)
            .then(response => {
                res = response.length;
            }); 
            resolve();
        }, 
    500));
        
    expect(res).toEqual(3);
});

it('Get by wrong locations \'an Beach\', \'tion\'', async() => {
    const locations = ['an Beach', 'tion'];

    let res = '';

    await new Promise((resolve) => 
        setTimeout(async() => {
            await FetchResponse(`${process.env.SERVER}/attraction/getByLocations/${JSON.stringify(locations)}`)
            .then(response => {
                res = response;
            });
            resolve();
        }, 500));
        expect(res).toEqual(null);
});

it('Get by price range between 23, 30', async() => {
    let res = null;
    await new Promise((resolve) => {
        setTimeout(async() => {
            await FetchResponse(`${process.env.SERVER}/attraction/getByPriceRange/?min=23&max=30`)
            .then(response => {
                res = response;
            });
            resolve();
        }, 500);
    });

    expect(res).not.toEqual(null);
});

it('Get by ticket number', async() => {
    const ticket_number = '20210725-2a254a20ecfd11eb95168ba1e6d11779';

    let res = null;
    await new Promise((resolve) => {
        setTimeout(async() => {
            await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${ticket_number}`)
            .then(response => {
                res = response;
            });
            resolve();
        }, 500);
    });
    expect(res).not.toEqual(null);
});

it('Get by wrong ticket number', async() => {
    const ticket_number = '20210725-';

    let res = '';
    await new Promise((resolve) => {
        setTimeout(async() => {
            await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${ticket_number}`)
            .then(response => {
                res = response;
            });
            resolve();
        }, 500);
    });
    expect(res).toEqual(null);
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

    let res = null;
    let res2 = null;
    await new Promise((resolve) => {
        setTimeout(async() => {
            await PostRequest(`${process.env.SERVER}/purchase/createPurchase/`, body)
            .then(async(response) => {
                res = response;
                await FetchResponse(`${process.env.SERVER}/purchase/getByTickerNumber/${res.ticket_number}`)
                .then(response2 => {
                    res2 = response2;
                });
            });
            resolve();
        }, 500);
    });

    expect(res).not.toEqual(null);
    expect(res2).not.toEqual(null);
});