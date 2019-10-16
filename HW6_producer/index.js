var AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});


const publishNotification = () => {

  const randomNumber = String(Math.floor((Math.random() * 100) + 1));
  // Create publish parameters
  var params = {
    Message: randomNumber,
    TopicArn: 'arn:aws:sns:us-east-2:729673819913:homework6'
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS().publish(params).promise();
  // Handle promise's fulfilled/rejected states
  publishTextPromise.then(
    function(data) {
      console.log(`Random Number Generated: ${params.Message} sent to the topic ${params.TopicArn}`);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
}

//run first time w/out delay
publishNotification();

// run for loop
for (let i = 0, p = Promise.resolve(); i < 999; i++) {
    p = p.then(_ => new Promise(resolve =>
        setTimeout(() => {
          publishNotification()
          resolve();
        }, 5000)
    ));
}
