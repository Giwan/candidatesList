// const host = "http://personio-fe-test.herokuapp.com";
// const host = "https://630a4b56801d6f1a8b8c861d--applicants-be.netlify.app/.netlify/functions/"
const host = "https://applicants-be.netlify.app/.netlify/functions/"
const version = "";

const api = (host: string, version: string) => ({
    candidates: () => `${host}/${version}/candidates`
})

export default api(host, version); 