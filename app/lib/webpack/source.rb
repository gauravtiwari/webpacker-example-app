require_relative 'manifest'

class Webpack::Source
  attr_accessor :filename

  def initialize(filename)
    @filename = filename
  end

  def path
    return "#{config[:dev_server_host]}/#{filename}" if dev_server?
    pack_path
  end

  private

  def config
    Rails.configuration.x.webpacker
  end

  def dev_server?
    config[:dev_server_host].present?
  end

  def pack_path
    Webpack::Manifest.new(config.x.webpacker[:digests_path]).lookup(filename)
  end
end
