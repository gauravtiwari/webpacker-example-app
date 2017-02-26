class Webpack::Manifest
  class ManifestError < StandardError; end

  class_attribute :instance

  class << self
    def load(path)
      self.instance = new(path)
    end

    def lookup(name)
      if instance
        instance.lookup(name).presence ||
          raise(ManifestError.new("Can't find #{name} in #{instance.inspect}"))
      else
        raise ManifestError.new("Webpack::Manifest.load(path) must be called first")
      end
    end
  end

  def initialize(path)
    @path    = path
    @manifest = load
  end

  def lookup(name)
    puts @manifest.inspect
    @manifest[name.to_s]
  end

  private

  def load
    if File.exist?(@path)
      JSON.parse(File.read(@path))
    else
      Rails.logger.info "Didn't find any manifest file at #{@path}. \
        You must first compile the packs via rails webpacker:compile"
      {}
    end
  end
end
