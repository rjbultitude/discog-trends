# Discogs Trends

## Project Introduction

Gain insight into the commercial world of hard format records

## Installation

_Run (in this directory):_

`npm install`

This ensures the all the node packages are installed. Follow the [NPM guide](https://docs.npmjs.com/cli/install) to install new packages.

## Build

For dev mode run `npm run start`
For production mode run `npm run build`

### Tools

[disconnect](https://github.com/bartve/disconnect)

[express](https://expressjs.com/)

[React](https://reactjs.com)

#### Pending Functionality

- Show demand (_want_ vs _have_)
- Show rarity (Position in Range of _have_)
- Show change over time (if possible)

Add fields for `year` and `genre`

#### Approach

- Use node proxy to securly handle requests to discogs
- Use styled components for encapsulation

#### TODO

- Create watch task for middleware
- Crunch big data using Python
