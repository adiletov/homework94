const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Publication = require('./models/Publication');
const {nanoid} = require('nanoid');


const run = async () => {
    await mongoose.connect(config.database, config.options);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }


    const users = await User.create({
            fullName: 'John doe',
            username: 'john',
            password: 'john123',
            avatar: 'fixtures/john_doe.jpeg',
            token: nanoid(),
        }, {
            fullName: 'Jason Stathom',
            username: 'jason',
            password: 'jason123',
            token: nanoid(),
            avatar: 'fixtures/jason.jpeg'
        }, {
            fullName: 'Tom Hardy',
            username: 'hardy',
            password: 'hardy123',
            token: nanoid(),
            avatar: 'fixtures/hardy.jpeg'
        }, {
            fullName: 'Usain Bolt',
            username: 'usain',
            password: 'usain123',
            token: nanoid(),
            avatar: 'fixtures/usain.jpeg'
        }
    );


    await Publication.create({
            title: 'Any suggestions?',
            description: '',
            userId: users[0]._id,
            tags: ['Serj Tankian', 'Daron Malakian', 'John Dolmayan', 'Shavo Odadjian and me'],
            image: 'fixtures/jondPubl.jpeg',
            datetime: '4/09/2020, 19:09:45 PM'
        }, {
            title: 'Hello this is very good day!',
            description: '',
            userId: users[0]._id,
            tags: ['good', 'live', 'like'],
            image: 'fixtures/goodday.jpg',
            datetime: '3/11/2020, 3:09:45 PM'
        }, {
            title: 'Back at it with @guyritchie Bring your chess clock and your wallet. @danielsmithphotography!',
            description: '',
            userId: users[1]._id,
            tags: ['cheese'],
            image: 'fixtures/cheese.jpg',
            datetime: '3/10/2020, 6:09:45 PM'
        }, {
            title: 'Thermal race track. @charlietadman @markgillespie @mclarenauto',
            description: '',
            userId: users[1]._id,
            tags: ['race', 'car', 'formula'],
            image: 'fixtures/race.jpg',
            datetime: '4/12/2020, 6:09:45 PM'
        },
        {
            title: 'Parker and Marcel',
            description: '',
            userId: users[2]._id,
            tags: ['box', 'friends'],
            image: 'fixtures/tom.jpg',
            datetime: '4/13/2020, 5:09:45 PM'
        },
        {
            title: 'Headed Downtown',
            description: 'Подтвержденный Well Done Vikki and Dutch ',
            userId: users[2]._id,
            tags: ['@bikeshedmc'],
            image: 'fixtures/tom2.jpeg',
            datetime: '4/12/2020, 3:09:45 PM'
        },
        {
            title: 'Social Distancing',
            description: ' ',
            userId: users[3]._id,
            tags: ['HappyEaster'],
            image: 'fixtures/usain2.jpg',
            datetime: '4/13/2020, 7:09:45 PM'
        },
        {
            title: 'If 2+A = 2A what does C+L+E+A+N=?',
            description: ' ',
            userId: users[3]._id,
            tags: ['ateamlifestyle', 'briscobal', '_jayenigma'],
            image: 'fixtures/usain3.jpg',
            datetime: '4/13/2020, 2:09:45 PM'
        },
    );

    await connection.close();
};


run().catch(error => {
    console.error('Something went wrong');
});