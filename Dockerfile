FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN mkdir /webpacker-example-app
WORKDIR /webpacker-example-app
ADD Gemfile /webpacker-example-app/Gemfile
ADD package.json /webpacker-example-app/package.json
ADD yarn.lock /webpacker-example-app/yarn.lock
ADD Gemfile.lock /webpacker-example-app/Gemfile.lock
RUN bundle install
RUN yarn install
ADD . /webpacker-example-app
