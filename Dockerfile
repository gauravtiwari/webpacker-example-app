FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /webpacker-example-app
WORKDIR /webpacker-example-app
ADD Gemfile /webpacker-example-app/Gemfile
ADD Gemfile.lock /webpacker-example-app/Gemfile.lock
RUN bundle install
ADD . /webpacker-example-app
