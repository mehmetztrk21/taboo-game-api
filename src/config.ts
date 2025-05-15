import vault from 'node-vault';

let currentConfig = null;
export async function getConfig() {
    if (currentConfig) return currentConfig;

    const isDeveloper = process.env.VAULT_APP_USER === "developer";
    let url = new URL(process.env.VAULT_ADDR);

    const client = vault({
        endpoint: process.env.VAULT_ADDR,
        token: !isDeveloper && process.env.VAULT_APP_TOKEN,
        requestOptions: {
            strictSSL: false
        }
    });
    if (isDeveloper) {
        var loginResult = await client.userpassLogin({
            username: process.env.VAULT_APP_USER,
            password: process.env.VAULT_APP_TOKEN
        }).catch(err => {
            console.error(err.toString());
            console.error(err.response);
        });
        if (loginResult?.auth?.client_token) {
            client.token = loginResult.auth.client_token;
        }
    }
    const result = await client.read(process.env.VAULT_CONFIG_PATH).catch(err => {
        console.error(err.toString());
        console.error(err.response);
    });
    return currentConfig;
}
