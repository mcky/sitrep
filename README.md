# Sitrep

## About
Sitrep is a tool designed to help improve contact between foreign correspondents and their editors/news desks, particuarly in emergency sitatuions.  
The service allows reporters in danger to quickly report their status (green, amber or red), currently via SMS or speed-dial. The experience is designed to work from the most basic 'dumb' phones upwards, meaning the reporter won't have to carry any extra equipment.  
The web application allows editors to quickly get an overview of the status and locations of all their reporters and to integrate into their existing workflows and protocols. 

It was concieved and build at the [Build the News](buildthenews.wordpress.com) hackathon by the [London Student](lsnews.co.uk) team and MA Interactive Journalism students from City University.

## Tech
The project uses node.js for the server and the [Twilio](twilio.com) API for handling SMS/calls.

A webhook is setup with Twilio that's fired every time a SMS is sent, the server then parses this string into a status, location and optional message. This is then saved against the reporter who's phone number it belongs to. This can also be done manually via the web interface, for example by the editor during a check-in call.

## Writeups
- [About Sitrep](https://sitrepnews.wordpress.com/about/)
- [5 innovative ideas for digital journalism from Build The News](https://www.journalism.co.uk/news/5-digital-storytelling-ideas-from-build-the-news/s2/a564659/)
- [Student journalists and developers got together last weekend to build the news](http://bjacksonuk.com/2015/04/student-journalists-and-developers-got-together-last-weekend-to-build-the-news/)
