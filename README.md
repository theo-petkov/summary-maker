# Heat Pump Installation Quote Maker

## Setup

This was built using Node v22.17.0, so it's advisable to have that version of Node available.

- Clone the repository
- Run the terminal command, `npm i`, while in the root folder of the project

## Assumptions

- The heat loss and power heat loss calculations are estimates, so there is no need to worry about floating point precision, and they will be rounded to 2 decimal places.
- The numbers seem adjusted for dimensions, so I have not performed any explicit conversions of units, and followed the formulas as they are. For example, the
