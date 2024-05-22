// import { ServiceBroker } from "moleculer";

// const broker = new ServiceBroker();

// broker.createService({
//     name: 'greeter',
//     actions: {
//         sayHello(ctx) {
//             return `Hello ${ctx.params.name}`
//         }
//     }
// });

// async function startApp() {
//     await broker.start()
//     const res = await broker.call('greeter.sayHello', { name: 'John' })
//     console.log(res)
//     broker.stop()
// }

// startApp()

import UserService from './services/user.service.js'
import EmailService from './services/email.service.js'

async function startApp() {
    await UserService.start();
    await EmailService.start();

    // Simulate User creation

    try {
        const newUser = await UserService.call('user.createUser', {
            username: 'Abel',
            email: 'abel@gmail.com'
        });

        console.log('New User Created:', newUser)
        const users = await UserService.call('user.getUsers');
        console.log('All users:', users);

        // Simulate send Email

        const emailResult = await EmailService.call('email.sendEmail', {
            'recipient': newUser.email,
            'subject': 'Mock Test Mail From Moleculer',
            'content': 'Hello, Abel we are happy to have you here'
        });

        console.log(emailResult);



    } catch (error) {
        console.log('Error', error)
    } finally {
        await UserService.stop();
    }
}

startApp();