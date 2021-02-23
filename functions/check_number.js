exports.handler = function (event, context, callback) {
    console.log(event.body.length)
    const trackData = JSON.parse(event.body)
    const body = {trackData};
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                status: "error",
                fields: {
                    number: "Error number not found"
                }
            })
        });
    
}