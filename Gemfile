ruby '2.2.6'
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.0.beta'

group :development do
  gem 'sqlite3'
end

gem 'coffee-rails'
gem 'puma', '~> 3.0'
gem 'sass-rails', github: 'rails/sass-rails'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', github: 'rails/webpacker'
gem 'turbolinks', '~> 5'
gem 'jbuilder'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :production do
  gem 'pg'
  gem 'redis'
  gem 'heroku-deflater', github: 'romanbsd/heroku-deflater'
  gem 'rack-cors'
end

group :development do
  gem 'foreman'
  gem 'web-console', github: 'rails/web-console'
  gem 'listen', '>= 3.0.5', '< 3.2'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
