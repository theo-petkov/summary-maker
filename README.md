# Heat Pump Installation Summary Maker

## Setup

This was built using Node v22.17.0, so it's advisable to have that version of Node available.

- Clone the repository
- Run the terminal command, `npm i`, while in the root folder of the project

## Explanations

- The API_ENDPOINT and VAT_PERCENTAGE would be in Parameter Store, and API_KEY would in Secrets Manager (if using AWS). They are just environment variables here for simplicity, and must be committed to version control out of necessity, albeit this is clearly bad practice.

## Assumptions

- The heat loss and power heat loss calculations are estimates, so there is no need to worry about floating point precision, and they will be rounded to 2 decimal places. The costs will be calculated with this in mind, as working with monetary values should be handled carefully.
- The numbers seem dimensionally adjusted, so I have not performed any explicit conversions of units, and followed the formulas as they are. For example, the degreeDays returned by the API appears to be in hours, presumably the number of hours that meet the heat degree threshold. This matches what is needed to divide the heat loss by in order to get power heat loss (kW), as heat loss appears to be in kWh.
- I assume that the recommended heat pump should be the least costly to the customer, that still has output above the power heat loss. Since the cost correlates with output capacity, I will use the lowest viable output capacity, rather than comparing all valid heat pumps for price.
