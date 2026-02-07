import { Variables } from './Common_Configs';

const Promise_Timeout = (promise, timeout = Variables.Network_Promise_Timeout_Duration) => {
    return Promise.race([
        promise,
        new Promise((resolve) => setTimeout(() => resolve(false), timeout))
    ]);
};

export default Promise_Timeout;
