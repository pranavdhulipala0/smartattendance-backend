// Import necessary modules
const Student = require('../models/Student'); // Assuming you have a Mongoose model for 'Student'

// Define the controller function 'details' for handling POST requests
async function details(req, res) {
    try {
        const { college, batch, startDate, endDate } = req.body;
    
        // Define the match condition for the aggregation pipeline
        const matchCondition = {
          'college': college,
          'class': batch,
        };
    
        if (startDate) {
          matchCondition['Date'] = { '$gte': startDate };
        } else if (endDate) {
          matchCondition['Date'] = { '$lte': endDate };
        }
    
        // Define the aggregation pipeline stages
        const agg = [
          {
            '$match': matchCondition
          }, {
            '$group': {
              '_id': '$Date',
              'presentees': {
                '$sum': 1
              },
              'usernames': {
                '$addToSet': {
                  'username': '$user_name',
                  'totalTime': '$total_time'
                }
              }
            }
          }
        ];
    
        // Execute the aggregation pipeline using Mongoose model
        const result = await Student.aggregate(agg);
    
        // Return the aggregated data as JSON response
        res.json(result);
      } catch (error) {
        console.error(error);
    
        // Return an error response in case of any issues
        res.status(500).send('Error processing request');
      }
}

// Define the controller function 'advDetails' for handling POST requests
async function advDetails(req, res) {
  try {
    const { college, startDate, endDate } = req.body;

    // Define the match condition for the aggregation pipeline
    const matchCondition = {
      'college': college,
    };

    // Check if startDate or endDate is provided and update the match condition accordingly
    if (startDate) {
      matchCondition['Date'] = { '$gte': new Date(startDate) };
    } else if (endDate) {
      matchCondition['Date'] = { '$lte': new Date(endDate) };
    }

    // Define the aggregation pipeline stages
    const agg = [
      {
        '$match': matchCondition
      }, {
        '$group': {
          '_id': '$Date',
          'EliteCount': {
            '$sum': {
              '$cond': [
                { '$eq': ['$class', 'Elite'] },
                1,
                0
              ]
            }
          },
          'FSACount': {
            '$sum': {
              '$cond': [
                { '$eq': ['$class', 'FSA'] },
                1,
                0
              ]
            }
          }
        }
      }, {
        '$project': {
          '_id': 0,
          'Date': '$_id',
          'EliteCount': 1,
          'FSACount': 1
        }
      }
    ];

    // Execute the aggregation pipeline using Mongoose model
    const result = await Student.aggregate(agg).exec();
    console.log(result);

    // Return the aggregated data as JSON response
    res.json(result);
  } catch (error) {
    console.error(error);

    // Return an error response in case of any issues
    res.status(500).send('Error processing request');
  }
}

// Export the controller functions for use in your application
module.exports = { details, advDetails };
