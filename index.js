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
import AuthService from './services/auth.service.js'

async function startApp() {
    await UserService.start();
    await EmailService.start();
    await AuthService.start();

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

        //Simulate Auth/Login

        const authResult = await AuthService.call('auth.login', { 
            'username': 'John',
            'password': 'password',
        });

        console.log('Auth Result', authResult)



    } catch (error) {
        console.log('Error', error)
    } finally {
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
    }
}

startApp();