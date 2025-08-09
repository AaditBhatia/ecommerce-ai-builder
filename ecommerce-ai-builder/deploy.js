const freestyle = new FreestyleSandboxes();

const { repoId } = await freestyle.createGitRepository({
    name: "Test Repository",

    // This will make it easy for us to clone the repo during testing.
    // The repo won't be listed on any public registry, but anybody
    // with the uuid can clone it. You should disable this in production.
    public: true,

    source: {
        url: "https://github.com/freestyle-sh/freestyle-next",
        type: "git",
    },
});


const devServer = await freestyle.requestDevServer({ repoId });

console.log(Dev Server URL: ${devServer.ephemeralUrl});