exports.handler = function (event, context, callback) {
    console.log(event.body)
    console.log(context)
    let data = JSON.parse(event.body)
    const body = {data}
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                status: "ok",
                fields: {
                    email: "Good request",
                    name: "Good request",
                    message: "Good request"
                }
            })
        });
}