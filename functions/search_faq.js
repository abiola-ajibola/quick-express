exports.handler = function (event, context, callback) {
    console.log(event.body.length)
    const data = JSON.parse(event.body)
    const body = { data };
    {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                status: "ok",
                redirect: "http://microsoft.com",
                fields: {
                    number: "good request"
                }
            })
        });
    }
}