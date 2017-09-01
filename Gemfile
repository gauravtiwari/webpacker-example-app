ruby '2.4.1'
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.0'
gem 'pg'

gem 'coffee-rails'
gem 'puma', '~> 3.0'
gem 'sass-rails', github: 'rails/sass-rails'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', github: 'rails/webpacker'
gem 'turbolinks', '~> 5'
gem 'jbuilder'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'capybara'
  gem 'selenium-webdriver'
end

group :production do
  gem 'redis'
  # gem 'heroku-deflater', github: 'romanbsd/heroku-deflater'
  gem 'rack-cors'
end

group :development do
  gem 'foreman'
  gem 'web-console', github: 'rails/web-console'
  gem 'spring'
  gem 'listen', '>= 3.0.5', '< 3.2'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
