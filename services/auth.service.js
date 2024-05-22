import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
    name: 'auth',
    actions: {
        async login(ctx) {
            const { username, password } = ctx.params;

            if (username === 'admin' && password === 'password') {
                return {
                    success: true,
                    message: 'Login was successful'
                };
                
            } else {
                return {
                    success: false,
                    message: 'Login Failed'
                }
            }

        },
    },
});

export default broker