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

async function startApp() {
    await UserService.start();

    try {
        const newUser = await UserService.call('user.createUser', {
            username: 'Abel',
            email: 'abel@gmail.com'
        });

        console.log('New User Created:', newUser)
        const users = await UserService.call('user.getUsers');
        console.log('All users:', users);

    } catch (error) {
        console.log('Error', error)
    } finally {
        await UserService.stop();
    }
}

startApp();