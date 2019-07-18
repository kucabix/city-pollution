# city-pollution
A React web application, that allows user to check the most polluted cities in some of European countries. First, user is entering the country name and then API is downloading ten of the most polluted cities, based on pm2.5 parameter. After downloading you can click each of them and check the short description fetched from Wiki.

## Instalation

Clone the source repository from Github. On the command line enter:

```
git clone https://github.com/kucabix/city-pollution.git
```

Project setup:

```
npm install
```

Project run:

```
npm start
```

## Built With

* [React](https://reactjs.org/) - (React version 16.8.6) The JS library

## Api used

* [OpenAQ](https://docs.openaq.org/) - Open air quality data
* [WikiApi](https://www.mediawiki.org/wiki/API:Query) - Getting descriptions of cities
