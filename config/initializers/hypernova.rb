require 'hypernova'
require 'hypernova/plugins/development_mode_plugin'

Hypernova.add_plugin!(DevelopmentModePlugin.new)

Hypernova.configure do |config|
  config.host = 'localhost'
  config.port = 3030
end
