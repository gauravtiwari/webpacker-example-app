class Webpack::Source
  attr_accessor :filename

  def initialize(filename)
    @filename = filename
  end

  def path
    if config[:dev_server_host].present?
      "#{config[:dev_server_host]}/#{filename}"
    elsif config[:digesting]
      Webpacker::Digests.new(config[:digests_path]).lookup(filename)
    else
      File.join(config[:packs_dist_path], filename)
    end
  end

  private

  def config
    Rails.configuration.x.webpacker
  end
end
