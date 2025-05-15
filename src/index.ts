import { NextApplication, NextFileResolverPlugin, NextKnexPlugin, NextOptions } from "fastapi-next";
import { getConfig } from "./config";


async function main() {
    const config = await getConfig();

    const options = new NextOptions();
    options.routerDirs.push(__dirname + "/routers");
    options.port = 5001;
    options.openApi.https = false;
    options.debug = true;
    const app = new NextApplication(options);


    // ? Health Check
    app.enableHealthCheck();


    const dbConfig = config.db;

    // ? Plugins
    app.registry.register(new NextFileResolverPlugin());
    app.registry.register(new NextKnexPlugin(dbConfig));


    // ? Session
    if (config.redis) {
        await app.registerRedisSession(config.redis, config.redis?.ttl);
    }
    else {
        await app.registerInMemorySession();
    }

    // ? Init
    await app.init();

    // ? Start
    await app.start();
}
main();