# Heat Pump Installation Summary Maker

This application is able to make summaries that can be used when providing customers with quotes for heat pump installations.

This is done using information about a given property (provided by the customer), heat pump data, and data obtained from a third party location-based weather statistic API.

## Setup

This was built using Node v22.17.0, so it's advisable to have that version of Node available.

In order to work with this repository:

- Clone this repository
- Run the terminal command, `npm i`, while in the root folder of the project

If you wish to run the tests:

- Run the npm script, `npm run test`

If you wish to run the quality checks (Typescript, eslint, and prettier):

Run the npm script, `npm run quality-checks`

## Generating the Summaries

To actually generate and output the summaries, the main use of this application, then:

- Run the npm script, `npm run make-summaries`

## Repository Layout

All functional application code is in the [src](./src) folder.

Each functions has some documentation above it, as well as unit testing, which should clarify what each function is doing.

### Utility Functions

Functions that can potentially be used in more than one place, and are a bit more general, are put in the [utils](src/utils) folder.

### Core Functions

Functions that have a more specific purpose. These are less general, and usually directly facilitate the behaviour of the application. These are in the [core](src/core) folder

### Types

Application related Typescript types all in one place, [here](src/types).

### Mocks

Mock payloads used for testing, [here](src/_mocks).

### Data

This is where I'm keeping the houses.json and heat-pumps.json files, in place of them being in a database. [This](src/data) would not normally exist.

### Execution

This is a folder containing the executable code that will generate the summaries as per the task. [This](src/execution) would not normally exist.

## Explanations

- The API_ENDPOINT and VAT_PERCENTAGE would be in Parameter Store, and API_KEY would in Secrets Manager (if using AWS). They are just environment variables here for simplicity, and must be committed to version control out of necessity, albeit this is clearly bad practice.

## Assumptions

- The heat loss and power heat loss calculations are estimates, so there is no need to worry about floating point precision, and they will be rounded to 2 decimal places. The costs will be calculated with this in mind, as working with monetary values should be handled carefully.
- The numbers seem dimensionally adjusted, so I have not performed any explicit conversions of units, and followed the formulas as they are. For example, the degreeDays returned by the API appears to be in hours, presumably the number of hours that meet the heat degree threshold. This matches what is needed to divide the heat loss by in order to get power heat loss (kW), as heat loss appears to be in kWh.
- I assume that the recommended heat pump should be the least costly to the customer, that still has output above the power heat loss. Since the cost correlates with output capacity, I will use the lowest viable output capacity, rather than comparing all valid heat pumps for price.

## Future Possibilities

- More observability can be implemented here, tracing, span attributes etc., especially to have statistics on the flaky third party API. Having that information would be key to knowing if the third party meets any SLA they may have made with us, and get them to try and remediate whatever is causing the issue.
- This seems like a good candidate for an event driven architecture. As house data comes in (presumably one by one, as customers fille out the forms), this should trigger the processing on an individual basis, and populate a summary, ready to be surfaced when needed. This should improve speed, as the calculations and API calls (to a potentially slow API due to flakiness) would already be done by the time the summary is needed.
- I usually also have husky and lint-staged as part of a repository. This makes it so that git hooks can be used to run tests, quality checks, as well as other functionality. This ensures that quality gates can run locally and shorten the developer feedback loop. For example, running all tests before committing.
