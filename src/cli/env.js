const parseEnv = () => {
    try {
        const rssVars = Object.entries(process.env).filter(([key]) => key.startsWith('RSS_'))

        if (rssVars.length === 0) {
            console.log('no RSS environment variables')
        }
        const output = rssVars.map(([key, value]) => `${key}=${value}`).join(';')
        console.log(output)

    } catch (error) {

    }
};

parseEnv();