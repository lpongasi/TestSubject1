import command from './command';



async function init() {
    try {
        await command('git fetch --all');
        const { stdout } = await command('git rev-parse --abbrev-ref HEAD');
        console.log('OUTPUT', stdout);
    } catch (error) {
        console.log('Error', error);
    }
}

init();